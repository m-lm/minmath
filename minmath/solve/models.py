from django.db import models
from account.models import PlayerUser

# Create your models here.
# Models being akin to database tables

class Minigame(models.Model):
    # Model for each minigame session with end score and time
    # Used for leaderboards, tied to user
    # Leaderboards: username, gamemode, score, time, total num of problems, date
    user = models.ForeignKey(PlayerUser, on_delete=models.CASCADE) # on deletion of obj, delete those references that depend on it; one-to-many foreignkey
    gamemode = models.CharField(max_length=20)
    score = models.IntegerField()
    time_spent = models.FloatField()
    total_problems = models.IntegerField()
    date = models.DateField(auto_now=True); # for activity records

    def __str__(self):
        return (f"{self.user}'s {self.gamemode} game on {self.date}")
