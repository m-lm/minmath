from django.urls import path
from . import views
from .views import SignUpView

app_name = "account"

urlpatterns = [
    #path("", views.register, name = "register"),
    path("register/", SignUpView.as_view(), name = "register"),
    path("profile/", views.profile, name = "profile"),
]