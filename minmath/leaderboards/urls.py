from django.urls import path
from . import views

app_name = "leaderboards"

urlpatterns = [
    path("", views.index, name = "index"),
]