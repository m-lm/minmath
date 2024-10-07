from django import forms
from .models import Minigame

class MinigameForm(forms.ModelForm):
    class Meta:
        model = Minigame
        fields = ["user", "score", "time_duration"]