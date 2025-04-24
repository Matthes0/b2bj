from django.urls import path
from .views import GameListAPI, BetListAPI, GameResultAPI
from django.urls import path
from .api_views import (
    GameListAPI,
    BetListCreateAPI, BetDetailAPI,
    GameResultListCreateAPI, GameResultDetailAPI,
)

urlpatterns = [
    path('games/', GameListAPI.as_view()),
    path('bets/', BetListAPI.as_view()),
    path('results/', GameResultAPI.as_view()),
    path('api/games/', GameListAPI.as_view(), name='api-games-list'),
    path('api/bets/', BetListCreateAPI.as_view(), name='api-bets-list-create'),
    path('api/bets/<int:pk>/', BetDetailAPI.as_view(), name='api-bets-detail'),
    path('api/results/', GameResultListCreateAPI.as_view(), name='api-results-list-create'),
    path('api/results/<int:pk>/', GameResultDetailAPI.as_view(), name='api-results-detail'),
]
