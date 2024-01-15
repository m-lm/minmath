from django.db import models

# Create your models here.
# Models being akin to database tables

class Minigame(models.Model):
    # Model for each minigame session with end score and time
    # Used for leaderboards, tied to user
    score = models.IntegerField()
    time = models.FloatField()
