# b2bj/urls.py
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    # path('games/', include('games.urls', namespace='games')),
    path('games/', include('games.urls', namespace='games')),  # stare HTML widoki
    path('api/', include('games.api_urls')),  # nowe REST API
    path('users/', include('user.urls', namespace='user')),
    path('bonuses/', include('bonuses.urls', namespace='bonuses')),
    path('payments/', include('payments.urls', namespace='payments')),
]
