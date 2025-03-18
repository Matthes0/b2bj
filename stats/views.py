from django.shortcuts import render

from stats.models import Statistics


# Create your views here.
def statistics_list(request):
    statistics = Statistics.objects.all()
    return render(request, 'stats/statistics_list.html', {'statistics': statistics})