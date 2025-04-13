from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm

from user.forms import PlayerCreateForm
from user.models import User


# Create your views here.
def register_view(request):
    if request.method == "POST":
        form = PlayerCreateForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("user:user_list")
    else:
        form = PlayerCreateForm()
    return render(request, "user/register.html", {"form": form})


def users_list(request):
    users = User.objects.all()
    return render(request, 'user/user_list.html', {'users': users})
