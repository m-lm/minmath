from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import UserCreationForm
from .forms import Signup

# Create your views here.

def register(request):
    if request.method == "POST":
        form = Signup(request.POST) # user form inheritance
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("/solve")
    else:
        form = Signup()
    return render(request, "accounts/register.html", {"form" : form})