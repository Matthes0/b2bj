from django.urls import path
from user.api_views import ApiLoginView, ApiLogoutView, ApiUserView, ApiUserBalanceView

urlpatterns = [
    path("login/", ApiLoginView.as_view(), name="api_login"),
    path("logout/", ApiLogoutView.as_view(), name="api_logout"),
    path("me/", ApiUserView.as_view(), name="api_user_info"),
    path('balance/', ApiUserBalanceView.as_view(), name='user-balance'),
]