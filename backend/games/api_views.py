# games/api_views.py

from rest_framework.views import APIView
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .models import Game, Bet, GameResult
from .serializers import GameSerializer, BetSerializer, GameResultSerializer

# Listowanie gier (APIView)
@method_decorator(csrf_exempt, name='dispatch')
class GameListAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]  # lub AllowAny

    def get(self, request):
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data)
@method_decorator(csrf_exempt, name='dispatch')
class BlackjackStartAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # 1. Generujemy nową talię
        deck = utils.create_deck()

        # 2. Zapisujemy w sesji (opcjonalnie, jeśli chcesz stan na backendzie)
        request.session['bj_deck'] = deck

        # 3. Zwracamy talię (możesz też zwrócić tylko pierwsze karty itp.)
        return Response({
            "deck": deck,
            "deck_count": len(deck),
        }, status=status.HTTP_201_CREATED)
@method_decorator(csrf_exempt, name='dispatch')
class BetListCreateAPI(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Bet.objects.all()
    serializer_class = BetSerializer

@method_decorator(csrf_exempt, name='dispatch')
class BetDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Bet.objects.all()
    serializer_class = BetSerializer


@method_decorator(csrf_exempt, name='dispatch')
class GameResultListCreateAPI(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = GameResult.objects.all()
    serializer_class = GameResultSerializer

@method_decorator(csrf_exempt, name='dispatch')
class GameResultDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = GameResult.objects.all()
    serializer_class = GameResultSerializer
