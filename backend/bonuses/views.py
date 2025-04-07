from django.shortcuts import render

from bonuses.models import Bonus


# Create your views here.
def bonuses_list(request):
    bonuses = Bonus.objects.all()
    return render(request, 'bonuses/bonuses_list.html', {'bonuses': bonuses})