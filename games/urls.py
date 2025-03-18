"""
URL configuration for b2bj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

app_name = 'games'

urlpatterns = [
    path('', views.games_list, name='games_list'),
    path('blackjack/', views.blackjack_game, name='blackjack'),
    path('blackjack/hit/', views.hit, name='blackjack_hit'),
    path('blackjack/stand/', views.stand, name='blackjack_stand'),
    path('blackjack/reset/', views.reset_game, name='blackjack_reset'),
]
