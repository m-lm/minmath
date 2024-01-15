from django.shortcuts import render, redirect
from django.http import HttpResponse

# Create your views here.

def register(request):
    return render(request, "account/register.html")