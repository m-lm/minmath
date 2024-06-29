from django.urls import path

from . import views

app_name = "solve"

urlpatterns = [
    path("", views.index, name = "index"),
    path("game", views.game, name = "game"),
    path("about", views.about, name = "about"),
]