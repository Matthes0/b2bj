from django.shortcuts import render
from .models import Uzytkownicy, Gry, Zaklady, Transakcje, Bonusy, Statystyki

def index(request):
    return render(request, 'index.html')

def uzytkownicy_list(request):
    uzytkownicy = Uzytkownicy.objects.all()
    return render(request, 'uzytkownicy_list.html', {'uzytkownicy': uzytkownicy})

def gry_list(request):
    gry = Gry.objects.all()
    return render(request, 'gry_list.html', {'gry': gry})

def zaklady_list(request):
    zaklady = Zaklady.objects.all()
    return render(request, 'zaklady_list.html', {'zaklady': zaklady})

def transakcje_list(request):
    transakcje = Transakcje.objects.all()
    return render(request, 'transakcje_list.html', {'transakcje': transakcje})

def bonusy_list(request):
    bonusy = Bonusy.objects.all()
    return render(request, 'bonusy_list.html', {'bonusy': bonusy})

def display_data(request):
    users = Uzytkownicy.objects.all()
    games = Gry.objects.all()
    bets = Zaklady.objects.all()
    transactions = Transakcje.objects.all()
    bonuses = Bonusy.objects.all()
    statistics = Statystyki.objects.all()

    context = {
        'users': users,
        'games': games,
        'bets': bets,
        'transactions': transactions,
        'bonuses': bonuses,
        'statistics': statistics,
    }

    return render(request, 'display_data.html', context)

def statystyki_list(request):
    statistics = Statystyki.objects.all()
    return render(request, 'statystyki_list.html', {'statistics': statistics})