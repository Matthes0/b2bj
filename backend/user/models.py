from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField
class PlayerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.FloatField(default=0)

    #to check if user can create account
    date_of_birth = models.DateField()
    country = CountryField()
    #stats
    games_played = models.IntegerField(default=0)
    games_won = models.IntegerField(default=0)
    total_winnings = models.DecimalField(default=0, max_digits=10, decimal_places=2)
