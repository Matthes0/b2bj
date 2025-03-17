from django.contrib import admin
from .models import User, Game, Bets, Transaction, Bonus, Statistics

admin.site.register(User)
admin.site.register(Game)
admin.site.register(Bets)
admin.site.register(Transaction)
admin.site.register(Bonus)
admin.site.register(Statistics)