from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import Signup, Signin
from .models import PlayerUser

# Register your models here.

class PlayerUserAdmin(UserAdmin):
    register_form = Signup
    login_form = Signin
    model = PlayerUser
    list_display = ["email", "username"]

admin.site.register(PlayerUser, PlayerUserAdmin)