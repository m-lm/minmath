from django.shortcuts import render
from django.http import HttpResponse
from solve.models import Minigame

def leaderboards(request):
    objs = []
    games = Minigame.objects.order_by("-score")
    for g in games:
        if len(objs) < 20: # Only 20 games passed in
            objs.append(g)
    data = {"games": objs}
    return render(request, "leaderboards/leaderboards.html", data)
