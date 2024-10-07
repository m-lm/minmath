from django.db import models
from django.contrib.postgres.fields import ArrayField
from account.models import PlayerUser

# Create your models here.
# Models being akin to database tables

class Minigame(models.Model):
    # Model for each minigame session with end score and time
    # Used for leaderboards, tied to user
    # Leaderboards: username, gamemode, score, time, total num of problems, date
    user = models.ForeignKey(PlayerUser, on_delete=models.CASCADE) # on deletion of obj, delete those references that depend on it; one-to-many foreignkey
    score = models.IntegerField()
    time_duration = models.IntegerField()
    date = models.DateField(auto_now=True); # for activity records

    def __str__(self):
        return (f"{self.user}'s {self.score}-score game on {self.date}")
