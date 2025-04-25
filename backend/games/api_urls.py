from django.urls import path
from .views import GameListAPI, BetListAPI, GameResultAPI
from django.urls import path
from .api_views import (
    GameListAPI,
    BetListCreateAPI, BetDetailAPI,
    GameResultListCreateAPI, GameResultDetailAPI, BlackjackReshuffleAPI, BlackjackShuffleAPI
)

urlpatterns = [
    #path('', GameListAPI.as_view()),
    #path('bets/', BetListAPI.as_view()),
    #path('results/', GameResultAPI.as_view()),
    path('', GameListAPI.as_view(), name='api-games-list'),
    path('bets/', BetListCreateAPI.as_view(), name='api-bets-list-create'),
    path('bets/<int:pk>/', BetDetailAPI.as_view(), name='api-bets-detail'),
    path('results/', GameResultListCreateAPI.as_view(), name='api-results-list-create'),
    path('results/<int:pk>/', GameResultDetailAPI.as_view(), name='api-results-detail'),
    path('blackjack/reshuffle/', BlackjackReshuffleAPI.as_view(), name='api-bj-reshuffle'),
    path('blackjack/shuffle/', BlackjackShuffleAPI.as_view(), name='api-bj-shuffle'),

]
