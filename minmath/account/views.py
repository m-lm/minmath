from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.urls import reverse_lazy
from .forms import Signup, Signin
from django.contrib.auth.decorators import login_required
from django.db.models import Sum, Count, F, FloatField
from django.db.models.functions import Cast, ExtractMonth, ExtractYear
from solve.models import Minigame
import string
import datetime

# Create your views here.

def parse_errors(msg):
    # Parse Django form error messages from form.errors and return array of errors
    errors = []
    for v in msg.values():
        errors.append(v[0])
    return errors

@login_required(login_url='/accounts/login/')
def profile(request):
    total_games = Minigame.objects.count()
    total_problems = Minigame.objects.aggregate(total=Sum("score"))["total"]
    total_problems = 0 if None else total_problems
    highest_game = Minigame.objects.order_by("-score").first() 
    highest_score = highest_game.score
    time_of_highest_score = highest_game.time_duration
    fastest_game = Minigame.objects.annotate(speed=Cast(F("score"), FloatField()) / Cast(F("time_duration"), FloatField())).order_by("-speed").first()
    fastest_score = fastest_game.score
    time_of_fastest_score = fastest_game.time_duration
    dt_day = Minigame.objects.values("date").annotate(game_count=Count("id")).order_by("-game_count").first()["date"]
    most_active_day = f"{dt_day.strftime('%A')[:3]}, {dt_day.strftime('%B')[:3]} {dt_day.strftime('%d')[1:]}, {dt_day.strftime('%Y')}"
    dt_month = Minigame.objects.annotate(year=ExtractYear("date")).annotate(month=ExtractMonth("date")).values("date").annotate(game_count=Count("id")).order_by("-game_count").first()["date"]
    most_active_month = f"{dt_month.strftime('%B')[:3]} {dt_month.strftime('%Y')}"
    data = {"total_games": total_games,
            "total_problems": total_problems, 
            "highest_score": highest_score,
            "time_of_highest_score": time_of_highest_score,
            "fastest_score": fastest_score,
            "time_of_fastest_score": time_of_fastest_score,
            "most_active_day": most_active_day,
            "most_active_month": most_active_month,}
    return render(request, "account/profile.html", data)

def logout_view(request):
    logout(request)
    return redirect("/")

def register(request):
    notes = ""
    if request.method == "POST":
        form = Signup(request.POST) # user form inheritance
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("/")
        else:
            notes = parse_errors(form.errors)
            notes = " ".join(notes)
    else:
        form = Signup()
    return render(request, "registration/register.html", {"form": form, "notes": notes})

def signin(request):
    notes = ""
    if request.method == "POST":
        form = Signin(request, request.POST) # user form inheritance
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect("/")
        else:
            notes = parse_errors(form.errors)
            notes = " ".join(notes)
    else:
        form = Signin()
    return render(request, "registration/login.html", {"form": form, "notes": notes})

def recent_games(request):
    games = Minigame.objects.order_by("-date")[:10:-1]
    data = {
        "labels": [g.date.strftime("%m/%d") for g in games],
        "scores": [g.score for g in games],
        "times": [g.time_duration for g in games],
    }
    print(data["scores"])
    return JsonResponse(data)