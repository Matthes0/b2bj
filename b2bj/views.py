from django.shortcuts import render
from .models import User, Game, Bets, Transaction, Bonus, Statistics

def index(request):
    return render(request, 'index.html')

def users_list(request):
    users = User.objects.all()
    return render(request, 'user_list.html', {'users': users})

def game_list(request):
    games = Game.objects.all()
    return render(request, 'games_list.html', {'games': games})

def bet_list(request):
    bets = Bets.objects.all()
    return render(request, 'bets_list.html', {'bets': bets})

def transaction_list(request):
    transactions = Transaction.objects.all()
    return render(request, 'transaction_list.html', {'transactions': transactions})

def bonuses_list(request):
    bonuses = Bonus.objects.all()
    return render(request, 'bonuses_list.html', {'bonuses': bonuses})

def display_data(request):
    users = User.objects.all()
    games = Game.objects.all()
    bets = Bets.objects.all()
    transactions = Transaction.objects.all()
    bonuses = Bonus.objects.all()
    statistics = Statistics.objects.all()

    context = {
        'users': users,
        'games': games,
        'bets': bets,
        'transactions': transactions,
        'bonuses': bonuses,
        'statistics': statistics,
    }

    return render(request, 'display_data.html', context)

def statistics_list(request):
    statistics = Statistics.objects.all()
    return render(request, 'statistics_list.html', {'statistics': statistics})