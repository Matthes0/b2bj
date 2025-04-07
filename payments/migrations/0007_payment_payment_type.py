# Generated by Django 5.1.3 on 2025-04-06 21:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("payments", "0006_rename_transaction_fee_paymenttype_transaction_fee_percent"),
    ]

    operations = [
        migrations.AddField(
            model_name="payment",
            name="payment_type",
            field=models.ForeignKey(
                default=2,
                on_delete=django.db.models.deletion.CASCADE,
                to="payments.paymenttype",
            ),
            preserve_default=False,
        ),
    ]
