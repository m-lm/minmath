from django.db import models
from account.models import PlayerUser

# Create your models here.
# Models being akin to database tables

class Minigame(models.Model):
    # Model for each minigame session with end score and time
    # Used for leaderboards, tied to user
    # Leaderboards: username, gamemode, score, time, total num of problems, date
    user = models.ForeignKey(PlayerUser, on_delete = models.CASCADE) # on deletion of obj, delete those references that depend on it
    gamemode = models.CharField(max_length = 20)
    score = models.IntegerField()
    time_spent = models.FloatField()
    total_problems = models.IntegerField()
    date = models.DateField(); # for activity records
