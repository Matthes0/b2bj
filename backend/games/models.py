from django.db import models
from user.models import User
class Game(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(default="Default Description")
    game_icon = models.ImageField(default="static/images/logo.png")
    def __str__(self):
        return self.title


class Bet(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    rate = models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self):
        return f"{self.user.username} bet on {self.game.title}"

class GameResult(models.Model):
    class Results(models.TextChoices):
        WIN = "WIN",
        LOSE = "LOSE",
        DRAW = "DRAW"
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bet = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    result = models.CharField(choices=Results.choices, max_length=5)
    payout= models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self):
        return f"{self.user.username} bet on {self.game.title}"
