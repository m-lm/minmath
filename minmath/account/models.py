from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class PlayerUser(AbstractUser):
    personal_best = models.IntegerField(null=True, blank=True, default=None) # highest session score
    fastest_time = models.FloatField(null=True, blank=True, default=None) # fastest session time
    problem_count = models.IntegerField(null=True, blank=True, default=None) # number of problems solved
    games_played = models.IntegerField(null=True, blank=True, default=None) # number of games played to completion
    def __str__(self):
        return self.username