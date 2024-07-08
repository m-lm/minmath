from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.db import models
from django import forms
from django.contrib.auth.models import User
from .models import PlayerUser # override from default user model
from django.contrib.auth import get_user_model

PlayerUser = get_user_model()

class Signup(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = PlayerUser
        fields = ("email", "username")
