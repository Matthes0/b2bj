# Generated by Django 4.2.20 on 2025-03-17 21:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('b2bj', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Zaklady',
            new_name='Bets',
        ),
        migrations.RenameModel(
            old_name='Bonusy',
            new_name='Bonus',
        ),
        migrations.RenameModel(
            old_name='Gry',
            new_name='Game',
        ),
        migrations.RenameModel(
            old_name='Statystyki',
            new_name='Statistics',
        ),
        migrations.RenameModel(
            old_name='Transakcje',
            new_name='Transaction',
        ),
        migrations.RenameModel(
            old_name='Uzytkownicy',
            new_name='User',
        ),
    ]
