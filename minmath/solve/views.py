from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed
from .models import Minigame
from .forms import MinigameForm
from django.contrib.auth.decorators import login_required

# Create your views here.

def landing(request):
    return render(request, "solve/landing.html")

def game(request):
    return render(request, "solve/game.html")

def results(request):
    return render(request, "solve/results.html")

def info(request):
    return render(request, "solve/info.html")

def submit_score(request):
    if not request.user.is_authenticated:
        # Just redirect if user is not logged in
        return redirect("solve:results")
    if request.method == "POST":
        form = MinigameForm(request.POST)
        if form.is_valid():
            game = form.save(commit=False)
            game.user = request.user
            game.save()
            print("SUCCESS:", game)
            data = {"score": f"Score: {game.score}"}
            return render(request, "solve/results.html", data)
    else:
        form = MinigameForm()
    return redirect("solve:results")
