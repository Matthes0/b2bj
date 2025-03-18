from django.db import models
from user.models import User
class Game(models.Model):
    title = models.CharField(max_length=100)
    genre = models.CharField(max_length=50)
    release_date = models.DateField()

    def __str__(self):
        return self.title


class Bet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} bet on {self.game.title}"
