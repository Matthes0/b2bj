# Generated by Django 5.1.3 on 2025-04-06 17:12

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("user", "0004_playerprofile_delete_player"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="playerprofile",
            name="name",
        ),
    ]
