# Generated by Django 4.2.20 on 2025-03-17 22:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('b2bj', '0003_rename_transaction_payments'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bonus',
            name='user',
        ),
        migrations.RemoveField(
            model_name='payments',
            name='user',
        ),
        migrations.RemoveField(
            model_name='statistics',
            name='user',
        ),
        migrations.DeleteModel(
            name='Bets',
        ),
        migrations.DeleteModel(
            name='Bonus',
        ),
        migrations.DeleteModel(
            name='Game',
        ),
        migrations.DeleteModel(
            name='Payments',
        ),
        migrations.DeleteModel(
            name='Statistics',
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
