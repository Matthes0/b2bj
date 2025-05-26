import os
import traceback
from django.test.client import RequestFactory
from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
import json

from b2bj.payu import get_access_token, create_order

from user.models import PlayerProfile


@method_decorator(csrf_exempt, name='dispatch')
class ApiTopUpView(View):
    def post(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"authenticated": False}, status=401)
        try:
            data = json.loads(request.body)
            print(data)
            amount = int(data.get("amount", 0))
            if amount <= 0:
                return JsonResponse({"error": "Amount must be greater than 0"}, status=400)
        except (json.JSONDecodeError, TypeError, ValueError) as e:
            return JsonResponse({"error": "Invalid data", "details": str(e)}, status=400)

        try:
            access_token = get_access_token()
        except Exception as e:
            return JsonResponse({
                "error": "PayU authorization error",
                "details": str(e)
            }, status=500)
        print(f"access token: {access_token}")
        order_data = {
            "notifyUrl": "http://localhost:8000/api/payments/notify",
            "continueUrl": "http://localhost:5173/",
            "customerIp": "127.0.0.1",
            "merchantPosId": os.getenv("PAYU_POS_ID"),
            "description": "Account top-up",
            "currencyCode": "PLN",
            "totalAmount": str(amount),  # Kwota w groszach
            "buyer": {
                "email": request.user.email,
                "firstName": request.user.first_name,
                "lastName": request.user.last_name,
                "language": "pl",
                "birthDate": "2006-12-03T00:00:00.000+01:00"
            },
            "products": [
                {
                    "name": "jedno doładowanie",
                    "unitPrice": str(amount),
                    "quantity": "1"
            }
        ]
            # "payMethods": {
            #     "payMethod": {
            #         "type": "PBL",
            #         "value": "blik"
            #     }
            # }
        }

        try:
            # print(order_data)
            redirect_url = create_order(access_token, order_data)
            print(redirect_url)

            #tutaj fake wstawka zamiast oficjalnej od payu

            fake_notify_data = {
                "order": {
                    "status": "COMPLETED",
                    "buyer": {
                        "email": request.user.email
                    },
                    "totalAmount": str(amount)
                }
            }

            rf = RequestFactory()
            fake_request = rf.post(
                "/api/payments/notify",
                data=json.dumps(fake_notify_data),
                content_type="application/json"
            )
            notify_view = ApiNotifyView.as_view()
            response = notify_view(fake_request)
            print(f"Fake notify response status: {response.status_code}")
            return JsonResponse({"redirect_url": redirect_url}, status=201)
        except Exception as e:
            print(traceback.format_exc())
            return JsonResponse({
                "error": "Failed to create PayU order",
                "details": str(e)
            }, status=500)


@method_decorator(csrf_exempt, name='dispatch')
class ApiNotifyView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            print("Odebrano powiadomienie od PayU:", data)

            order = data.get("order", {})
            status = order.get("status")
            email = order.get("buyer", {}).get("email")
            total_amount = order.get("totalAmount")  # w groszach jako string

            if not email or not total_amount:
                return HttpResponse("Missing email or amount", status=400)

            if status == "COMPLETED":
                try:
                    user = User.objects.get(email=email)
                    profile = PlayerProfile.objects.get(user=user)
                    amount_in_pln = float(total_amount) / 100  # przeliczenie z groszy
                    profile.balance += amount_in_pln
                    profile.save()
                    print(f"Doładowano {amount_in_pln} PLN dla użytkownika {email}")
                except User.DoesNotExist:
                    return HttpResponse(f"User with email {email} not found", status=404)
                except PlayerProfile.DoesNotExist:
                    return HttpResponse(f"Profile for user {email} not found", status=404)
            return HttpResponse(status=200)
        except json.JSONDecodeError:
            return HttpResponse("Invalid JSON", status=400)
        except Exception as e:
            print(traceback.format_exc())
            return HttpResponse(f"Internal error: {str(e)}", status=500)