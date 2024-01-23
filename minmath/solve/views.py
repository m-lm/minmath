from django.shortcuts import render
from django.http import HttpResponse
from .models import Minigame

# Create your views here.

def index(request):
    return render(request, "solve/index.html")

def about(request):
    return render(request, "solve/about.html")