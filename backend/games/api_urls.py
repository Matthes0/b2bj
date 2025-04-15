from django.urls import path
from .views import GameListAPI, BetListAPI, GameResultAPI

urlpatterns = [
    path('games/', GameListAPI.as_view()),
    path('bets/', BetListAPI.as_view()),
    path('results/', GameResultAPI.as_view()),
]
