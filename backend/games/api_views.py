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
