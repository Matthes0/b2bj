from django.db import models

class Uzytkownicy(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)

class Gry(models.Model):
    title = models.CharField(max_length=100)
    genre = models.CharField(max_length=50)
    release_date = models.DateField()

class Zaklady(models.Model):
    user = models.ForeignKey(Uzytkownicy, on_delete=models.CASCADE)
    game = models.ForeignKey(Gry, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

class Transakcje(models.Model):
    user = models.ForeignKey(Uzytkownicy, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

class Bonusy(models.Model):
    user = models.ForeignKey(Uzytkownicy, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    date_awarded = models.DateTimeField(auto_now_add=True)

class Statystyki(models.Model):
    user = models.ForeignKey(Uzytkownicy, on_delete=models.CASCADE)
    games_played = models.IntegerField()
    games_won = models.IntegerField()
    total_winnings = models.DecimalField(max_digits=10, decimal_places=2)