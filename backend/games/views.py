<<<<<<< HEAD
from django.contrib.auth.decorators import login_required
=======
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import GameSerializer, BetSerializer, GameResultSerializer
from .models import Game, Bet, GameResult


class GameListAPI(APIView):
    def get(self, request):
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data)

# class BetListAPI(APIView):
#     def get(self, request):
#         bets = Bet.objects.all()
#         serializer = BetSerializer(bets, many=True)
#         return Response(serializer.data)

from rest_framework import generics  # upewnij się, że jest ten import

class BetListAPI(generics.ListCreateAPIView):
    queryset = Bet.objects.all()
    serializer_class = BetSerializer

# class GameResultAPI(APIView):
#     def get(self, request):
#         results = GameResult.objects.all()
#         serializer = GameResultSerializer(results, many=True)
#         return Response(serializer.data)

from rest_framework import generics
from .models import GameResult
from .serializers import GameResultSerializer

class GameResultAPI(generics.ListCreateAPIView):
    queryset = GameResult.objects.all()
    serializer_class = GameResultSerializer




>>>>>>> f45f28d (Moje lokalne zmiany przed rebase)
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import GameSerializer, BetSerializer, GameResultSerializer
from .models import Game, Bet, GameResult


class GameListAPI(APIView):
    def get(self, request):
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data)

# class BetListAPI(APIView):
#     def get(self, request):
#         bets = Bet.objects.all()
#         serializer = BetSerializer(bets, many=True)
#         return Response(serializer.data)

from rest_framework import generics  # upewnij się, że jest ten import

class BetListAPI(generics.ListCreateAPIView):
    queryset = Bet.objects.all()
    serializer_class = BetSerializer

# class GameResultAPI(APIView):
#     def get(self, request):
#         results = GameResult.objects.all()
#         serializer = GameResultSerializer(results, many=True)
#         return Response(serializer.data)

from rest_framework import generics
from .models import GameResult
from .serializers import GameResultSerializer

class GameResultAPI(generics.ListCreateAPIView):
    queryset = GameResult.objects.all()
    serializer_class = GameResultSerializer




from django.shortcuts import render

from games.models import Bet
from games.models import Game
from django.shortcuts import render, redirect
from . import utils

# Create your views here.
@login_required
def games_list(request):
    games = Game.objects.all()
    return render(request, 'games/games_list.html', {'games': games})

@login_required
def bet_list(request):
    bets = Bet.objects.all()
    return render(request, 'games/bets_list.html', {'bets': bets})


@login_required
def blackjack_game(request):
    if 'deck' not in request.session:
        # Start a new game
        deck = utils.create_deck()

        player_hand = [deck.pop(), deck.pop()]
        dealer_hand = [deck.pop(), deck.pop()]

        request.session['deck'] = deck
        request.session['player_hand'] = player_hand
        request.session['dealer_hand'] = dealer_hand
        request.session['game_over'] = False

    player_hand = request.session['player_hand']
    dealer_hand = request.session['dealer_hand']
    game_over = request.session.get('game_over', False)

    player_value = utils.calculate_hand_value(player_hand)
    dealer_value = utils.calculate_hand_value(dealer_hand)

    # Check for Blackjack / Bust
    if player_value == 21:
        message = "Blackjack! You win!"
        game_over = True
    elif player_value > 21:
        message = "You bust! Dealer wins!"
        game_over = True
    else:
        message = None
    if game_over:
        if dealer_value > 21:
            message = "Dealer busts! You win!"
        elif player_value > dealer_value and player_value <= 21:
            message = "You win!"
        elif player_value < dealer_value and dealer_value <= 21:
            message = "Dealer wins!"
        elif player_value == dealer_value:
            message = "It's a tie!"

    player_images = [f'{utils.card_image_filename(card)}' for card in player_hand]
    dealer_images = [f'{utils.card_image_filename(card)}' for card in dealer_hand]

    context = {
        'player_hand': player_hand,
        'dealer_hand': dealer_hand if game_over else [('?', '?')] + dealer_hand[1:],
        'player_images': player_images,
        'dealer_images': dealer_images if game_over else ['games/back_of_card.png'] + dealer_images[1:],
        'player_value': player_value,
        'dealer_value': dealer_value if game_over else '?',
        'message': message,
        'game_over': game_over,
    }

    return render(request, 'games/blackjack.html', context)

def hit(request):
    if 'deck' not in request.session:
        return redirect('games:blackjack')

    deck = request.session['deck']
    player_hand = request.session['player_hand']

    player_hand.append(deck.pop())
    request.session['player_hand'] = player_hand
    request.session['deck'] = deck

    return redirect('games:blackjack')

def stand(request):
    if 'deck' not in request.session:
        return redirect('games:blackjack')

    deck = request.session['deck']
    dealer_hand = request.session['dealer_hand']

    # Dealer hits until 17
    while utils.calculate_hand_value(dealer_hand) < 17:
        dealer_hand.append(deck.pop())

    request.session['dealer_hand'] = dealer_hand
    request.session['game_over'] = True

    return redirect('games:blackjack')

def reset_game(request):
    for key in ['deck', 'player_hand', 'dealer_hand', 'game_over']:
        if key in request.session:
            del request.session[key]
    return redirect('games:blackjack')
