from django.contrib import admin
from .models import Uzytkownicy, Gry, Zaklady, Transakcje, Bonusy, Statystyki

admin.site.register(Uzytkownicy)
admin.site.register(Gry)
admin.site.register(Zaklady)
admin.site.register(Transakcje)
admin.site.register(Bonusy)
admin.site.register(Statystyki)