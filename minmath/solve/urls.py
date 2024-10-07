from django.urls import path

from . import views

app_name = "solve"

urlpatterns = [
    path("", views.landing, name = "landing"),
    path("game", views.game, name = "game"),
    path("info", views.info, name = "info"),
    path("submit_score", views.submit_score, name = "submit_score"),
    path("results", views.results, name = "results"),
]