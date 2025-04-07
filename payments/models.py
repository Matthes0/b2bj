from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.db import models



class PaymentType(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    transaction_fee_percent = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} - {self.transaction_fee_percent}% fee"

class Payment(models.Model):
    payment_type = models.ForeignKey(PaymentType, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.date} | {self.payment_type} | {self.user.username} | {self.amount}"
