from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from .forms import Signup, Signin
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required(login_url='/accounts/login/')
def profile(request):
    return render(request, "account/profile.html")

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
        form = Signin(request.POST) # user form inheritance
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("/")
    else:
        form = Signin()
    return render(request, "registration/login.html", {"form" : form})
 