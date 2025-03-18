from django.shortcuts import render

from games.models import Bet
from games.models import Game


# Create your views here.
def games_list(request):
    games = Game.objects.all()
    return render(request, 'games/games_list.html', {'games': games})

def bet_list(request):
    bets = Bet.objects.all()
    return render(request, 'games/bets_list.html', {'bets': bets})