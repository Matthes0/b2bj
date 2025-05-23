from rest_framework import serializers
from .models import Game, GameResult, Bet

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class BetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bet
        fields = '__all__'

class GameResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameResult
        fields = '__all__'
