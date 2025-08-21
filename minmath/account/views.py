from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.urls import reverse_lazy
from .forms import Signup, Signin
from django.contrib.auth.decorators import login_required
from django.db.models import Sum, Count, Max, F, FloatField
from django.db.models.functions import Cast, ExtractMonth, ExtractYear
from django.utils import timezone
from solve.models import Minigame
import string
from datetime import datetime

# Create your views here.

def parse_errors(msg):
    # Parse Django form error messages from form.errors and return array of errors
    errors = []
    for v in msg.values():
        errors.append(v[0])
    return errors

@login_required(login_url='/accounts/login/')
def profile(request):
    # Return personal profile statistics
    minigames = Minigame.objects.filter(user=request.user)

    # Pre-aggregate stats
    aggregates = minigames.aggregate(
        total_problems=Sum("score"),
        highest_score=Max("score"),
        last_active=Max("date")
    )

    # Game totals
    total_games = minigames.count()
    total_problems = aggregates["total_problems"] or 0

    # Highest-scoring games
    highest_game = minigames.order_by("-score").first() 
    highest_score = aggregates["highest_score"] or 0
    time_of_highest_score = highest_game.time_duration if highest_game else 0

    # Fastest games by solve speed
    fastest_game = minigames.annotate(speed=Cast(F("score"), FloatField()) / Cast(F("time_duration"), FloatField())).order_by("-speed").first()
    fastest_score = fastest_game.score if fastest_game else 0
    time_of_fastest_score = fastest_game.time_duration if fastest_game else 0

    # Activity dates
    dt_day = minigames.values("date").annotate(game_count=Count("id")).order_by("-game_count").first()
    most_active_day = dt_day["date"].strftime("%a, %b %d, %Y") if dt_day else "N/A"
    dt_month = minigames.annotate(year=ExtractYear("date"), month=ExtractMonth("date")).values("year", "month").annotate(game_count=Count("id")).order_by("-game_count").first()
    most_active_month = datetime(year=dt_month["year"], month=dt_month["month"], day=1).strftime("%b %Y") if dt_month else "N/A"
    last_game = minigames.order_by("-date").first()
    last_active = last_game.date.strftime("%a, %b %-d, %Y") if last_game else "N/A"

    # Data context
    data = {"total_games": total_games,
            "total_problems": total_problems, 
            "highest_score": highest_score,
            "time_of_highest_score": time_of_highest_score,
            "fastest_score": fastest_score,
            "time_of_fastest_score": time_of_fastest_score,
            "most_active_day": most_active_day,
            "most_active_month": most_active_month,
            "last_active": last_active,}

    return render(request, "account/profile.html", data)

def logout_view(request):
    logout(request)
    return redirect("/")

def register(request):
    # Register a new user
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
    # Log in an existing user
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
    games = Minigame.objects.filter(user=request.user).order_by("-date")[:10:-1]
    data = {
        "labels": [g.date.strftime("%m/%d") for g in games],
        "scores": [g.score for g in games],
        "times": [g.time_duration for g in games],
    }
    return JsonResponse(data)