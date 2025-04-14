from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from payments.models import Payment


# Create your views here.
@login_required
def payments_list(request):
    payments = Payment.objects.all()
    return render(request, 'payment/payments_list.html', {'payment': payments})
