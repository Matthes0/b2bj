from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import PlayerProfile


class PlayerProfileInline(admin.StackedInline):
    model = PlayerProfile
    can_delete = False
    verbose_name_plural = 'Profile'


class UserAdmin(BaseUserAdmin):
    inlines = [PlayerProfileInline]


# Unregister and re-register User with the new admin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(PlayerProfile)