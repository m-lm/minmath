# Generated by Django 4.2.6 on 2024-01-22 07:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('solve', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='minigame',
            name='date',
            field=models.DateField(auto_now=True),
        ),
    ]