from django.contrib import admin
from .models import Game, Bet, GameResult

admin.site.register(Game)
admin.site.register(Bet)
admin.site.register(GameResult)
