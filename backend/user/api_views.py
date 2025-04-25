from django.views import View
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json

@method_decorator(csrf_exempt, name='dispatch')
class ApiLoginView(View):

    def get(self, request):
        return JsonResponse({"csrf": "ok"})

    def post(self, request):
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"success": True, "username": user.username})
            else:
                return JsonResponse({"success": False, "error": "Invalid credentials"}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({"success": False, "error": "Invalid JSON"}, status=400)

@method_decorator(csrf_exempt, name='dispatch')
class ApiLogoutView(View):
    def post(self, request):
        logout(request)
        return JsonResponse({"success": True})


class ApiUserView(View):
    def get(self, request):
        if request.user.is_authenticated:
            user = request.user
            profile = getattr(user, 'playerprofile', None)
            return JsonResponse({
                "username": user.username,
                "email": user.email,
                "profile": {
                    "balance": profile.balance if profile else None,
                    "date_of_birth": profile.date_of_birth if profile else None,
                    "country": str(profile.country.name) if profile else None,
                    "games_played": profile.games_played if profile else None,
                    "games_won": profile.games_won if profile else None,
                    "total_winnings": profile.total_winnings if profile else None,
                }})
        return JsonResponse({"authenticated": False}, status=401)



@method_decorator(csrf_exempt, name='dispatch')
class ApiUserBalanceView(View):
    def get(self, request):
        if request.user.is_authenticated:
            profile = getattr(request.user, 'playerprofile', None)
            if profile:
                return JsonResponse({"balance": profile.balance})
            return JsonResponse({"error": "Profile not found"}, status=404)
        return JsonResponse({"authenticated": False}, status=401)

    def post(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"authenticated": False}, status=401)

        try:
            data = json.loads(request.body)
            amount = data.get("amount")
            action = data.get("action")  # "add" or "subtract"

            profile = getattr(request.user, 'playerprofile', None)
            if not profile:
                return JsonResponse({"error": "Profile not found"}, status=404)

            if not isinstance(amount, (int, float)):
                return JsonResponse({"error": "Amount must be numeric"}, status=400)

            if action == "add":
                profile.balance += amount
            elif action == "subtract":
                if profile.balance < amount:
                    return JsonResponse({"error": "Insufficient balance"}, status=400)
                profile.balance -= amount
            else:
                return JsonResponse({"error": "Invalid action"}, status=400)

            profile.save()

            return JsonResponse({"success": True, "new_balance": profile.balance})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
