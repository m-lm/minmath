from django.urls import path
from . import views

app_name = "account"

urlpatterns = [
    path("", views.profile, name = "profile"),
    path("register/", views.register, name = "register"),
    path("profile/", views.profile, name = "profile"),
    path("logout/", views.logout_view, name = "logout"),
]