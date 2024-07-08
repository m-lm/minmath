from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView

app_name = "account"

urlpatterns = [
    #path("", views.register, name = "register"),
    path("register/", views.register, name = "register"),
    path("profile/", views.profile, name = "profile"),
    path("logout/", views.logout_view, name = "logout"),
]