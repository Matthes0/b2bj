# b2bj/management/commands/populate_db.py

from django.core.management.base import BaseCommand
from b2bj.models import Uzytkownicy, Gry, Zaklady, Transakcje, Bonusy, Statystyki

class Command(BaseCommand):
    help = 'Populate the database with example data'

    def handle(self, *args, **kwargs):
        # Create example users
        user1 = Uzytkownicy.objects.create(name='John Doe', email='john3334@example.com')
        user2 = Uzytkownicy.objects.create(name='Jane Smith', email='jane3334@example.com')

        game1 = Gry.objects.create(title='Game One', genre='Action', release_date='2023-01-01')
        game2 = Gry.objects.create(title='Game Two', genre='Adventure', release_date='2023-02-01')

        Zaklady.objects.create(user=user1, game=game1, amount=50.00)
        Zaklady.objects.create(user=user2, game=game2, amount=75.00)

        Transakcje.objects.create(user=user1, amount=100.00)
        Transakcje.objects.create(user=user2, amount=150.00)

        Bonusy.objects.create(user=user1, description='Welcome Bonus')
        Bonusy.objects.create(user=user2, description='Referral Bonus')

        Statystyki.objects.create(user=user1, games_played=10, games_won=5, total_winnings=200.00)
        Statystyki.objects.create(user=user2, games_played=15, games_won=7, total_winnings=300.00)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with example data'))