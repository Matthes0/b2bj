# b2bj/management/commands/populate_db.py
from django.core.management import BaseCommand

from games.models import Game
from user.models import User
from bonuses.models import Bonus
from payments.models import Payment
from stats.models import Statistics

class Command(BaseCommand):
    help = 'Populate the database with example data'

    def handle(self, *args, **kwargs):
        # Create example users
        user1 = User.objects.create(name='John Doe', email='john3334@example.com')
        user2 = User.objects.create(name='Jane Smith', email='jane3334@example.com')

        game1 = Game.objects.create(title='Game One', genre='Action', release_date='2023-01-01')
        game2 = Game.objects.create(title='Game Two', genre='Adventure', release_date='2023-02-01')


        Payment.objects.create(user=user1, amount=100.00)
        Payment.objects.create(user=user2, amount=150.00)

        Bonus.objects.create(user=user1, description='Welcome Bonus')
        Bonus.objects.create(user=user2, description='Referral Bonus')

        Statistics.objects.create(user=user1, games_played=10, games_won=5, total_winnings=200.00)
        Statistics.objects.create(user=user2, games_played=15, games_won=7, total_winnings=300.00)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with example data'))
