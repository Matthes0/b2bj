from django.db import models
from user.models import User

class Statistics(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    games_played = models.IntegerField()
    games_won = models.IntegerField()
    total_winnings = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.user.name} - Stats"
