from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed
from .models import Minigame
from .forms import MinigameForm
from django.contrib.auth.decorators import login_required
from django.urls import reverse

# Create your views here.

def landing(request):
    return render(request, "solve/landing.html")

def game(request):
    return render(request, "solve/game.html")

def results(request):
    score = request.session.pop("score", None)
    return render(request, "solve/results.html", {"score": f"Score: {score}"})

def info(request):
    return render(request, "solve/info.html")

def submit_score(request):
    score = None
    if request.method == "POST":
        form = MinigameForm(request.POST)
        if form.is_valid():
            score = form.cleaned_data.get("score")
            if request.user.is_authenticated:
                game = form.save(commit=False)
                game.user = request.user
                game.save()
                print("SUCCESS:", game)
            request.session["score"] = score
        return redirect(reverse("solve:results"))
    return redirect(reverse("solve:results"))