# Generated by Django 3.2.12 on 2023-04-25 12:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cartitem', '0001_initial'),
        ('cart', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='products',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cartitem.cartitem'),
        ),
    ]
