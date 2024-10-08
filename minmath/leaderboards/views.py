from django.shortcuts import render
from django.http import HttpResponse
from solve.models import Minigame
from django.db.models import F, FloatField
from django.db.models.functions import Cast

def leaderboards(request):
    highest = []
    fastest = []
    highest_games = Minigame.objects.order_by("-score")
    fastest_games = Minigame.objects.annotate(speed=Cast(F("score"), FloatField()) / Cast(F("time_duration"), FloatField())).order_by("-speed")
    for g in highest_games:
        if len(highest) <= 10: # Only 10 games passed in
            highest.append(g)
    for g in fastest_games:
        if len(fastest) <= 10:
            fastest.append(g)
    data = {"highest_games": highest, 
            "fastest_games": fastest,}
    return render(request, "leaderboards/leaderboards.html", data)
