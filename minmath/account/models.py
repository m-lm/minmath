from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class PlayerUser(AbstractUser):
    email = models.EmailField(unique=True) # Enforce email uniqueness
    def __str__(self):
        return self.username