from django.urls import path
from . import views, api_views

urlpatterns = [
    path('top-up/', api_views.ApiTopUpView.as_view(), name='api_top_up'),
    path('notify/', api_views.ApiNotifyView.as_view(), name='api_notify'),
]