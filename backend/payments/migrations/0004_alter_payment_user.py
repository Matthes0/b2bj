# Generated by Django 5.1.3 on 2025-04-05 22:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("b2bj", "0005_initial"),
        ("payments", "0003_alter_payment_user"),
    ]

    operations = [
        migrations.AlterField(
            model_name="payment",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="b2bj.user"
            ),
        ),
    ]
