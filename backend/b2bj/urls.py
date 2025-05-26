# b2bj/urls.py
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from django.urls import path, include
from django.views.generic import TemplateView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', login_required(TemplateView.as_view(template_name='home.html')), name='home'),
    # path('games/', include('games.urls', namespace='games')),
    path('games/', include('games.urls', namespace='games')),  # stare HTML widoki
    path('api/games/', include('games.api_urls')),
    path('users/', include('user.urls', namespace='user')),
    path('api/users/', include('user.api_urls')),

    path('bonuses/', include('bonuses.urls', namespace='bonuses')),
    path('payments/', include('payments.urls', namespace='payments')),
    path('api/payments/', include('payments.api_urls')),
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
]
