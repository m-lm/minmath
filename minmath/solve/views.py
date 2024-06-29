from django.shortcuts import render
from django.http import HttpResponse
from .models import Minigame

# Create your views here.

def landing(request):
    return render(request, "solve/landing.html")

def game(request):
    return render(request, "solve/game.html")

def about(request):
    return render(request, "solve/about.html")