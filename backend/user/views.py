from django.shortcuts import render

from user.models import User


# Create your views here.
def users_list(request):
    users = User.objects.all()
    return render(request, 'user/user_list.html', {'users': users})