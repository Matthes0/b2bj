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

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('uzytkownicy/', views.uzytkownicy_list, name='uzytkownicy_list'),
    path('gry/', views.gry_list, name='gry_list'),
    path('zaklady/', views.zaklady_list, name='zaklady_list'),
    path('transakcje/', views.transakcje_list, name='transakcje_list'),
    path('bonusy/', views.bonusy_list, name='bonusy_list'),
    path('statystyki/', views.statystyki_list, name='statystyki_list'),
    path('display_data/', views.display_data, name='display_data'),
]
