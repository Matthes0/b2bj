from django.contrib.auth.models import User
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def users_list(request):
    users = User.objects.all()
    return render(request, 'user_list.html', {'users': users})





def display_data(request):
    users = User.objects.all()

    context = {
        'users': users,
    }

    return render(request, 'display_data.html', context)

