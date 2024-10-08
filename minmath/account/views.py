from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.urls import reverse_lazy
from .forms import Signup, Signin
from django.contrib.auth.decorators import login_required
from django.db.models import Sum
from solve.models import Minigame

# Create your views here.

@login_required(login_url='/accounts/login/')
def profile(request):
    total_games = Minigame.objects.count()
    total_problems = Minigame.objects.aggregate(total=Sum("score"))["total"]
    total_problems = 0 if None else total_problems
    highest_score = Minigame.objects.order_by("-score").first().score
    time_of_highest_score = Minigame.objects.order_by("-score").first().time_duration
    fastest_score = highest_score
    time_of_fastest_score = time_of_highest_score
    # Get fastest score by looking at score per time
    for obj in Minigame.objects.order_by("-score"):
        if int(obj.score) / int(obj.time_duration) > int(highest_score) / int(time_of_highest_score):
            fastest_score = obj.score
            time_of_fastest_score = obj.time_duration
    data = {"total_games": total_games,
            "total_problems": total_problems, 
            "highest_score": highest_score,
            "time_of_highest_score": time_of_highest_score,
            "fastest_score": fastest_score,
            "time_of_fastest_score": time_of_fastest_score,}
    return render(request, "account/profile.html", data)

def logout_view(request):
    logout(request)
    return redirect("/")

def register(request):
    if request.method == "POST":
        form = Signup(request.POST) # user form inheritance
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("/")
    else:
        form = Signup()
    return render(request, "registration/register.html", {"form" : form})

def signin(request):
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
        form = Signin()
    return render(request, "registration/login.html", {"form" : form})
 