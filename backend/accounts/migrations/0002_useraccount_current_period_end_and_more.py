# Generated by Django 4.1.7 on 2023-05-01 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='current_period_end',
            field=models.DateTimeField(blank=True, null=True, verbose_name='有効期限'),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='customer_id',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='顧客ID'),
        ),
    ]
