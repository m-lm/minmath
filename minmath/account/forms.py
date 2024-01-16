from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.db import models
from django import forms
from django.contrib.auth.models import User

class Signup(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ["email", "username", "password1", "password2"]
