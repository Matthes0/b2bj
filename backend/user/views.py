from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm

from user.forms import PlayerCreateForm
from user.models import User
from django.contrib.auth.decorators import login_required

from django.contrib.auth.views import LoginView

class CustomLoginView(LoginView):
    template_name = 'user/login.html'

# Create your views here.
def register_view(request):
    if request.method == "POST":
        form = PlayerCreateForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("http://localhost:5173/login")
    else:
        form = PlayerCreateForm()
    return render(request, "user/register.html", {"form": form})

@login_required
def users_list(request):
    users = User.objects.all()
    return render(request, 'user/user_list.html', {'users': users})
