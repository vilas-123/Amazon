# Generated by Django 3.2.12 on 2023-04-27 04:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0008_auto_20230425_1232'),
    ]

    operations = [
        migrations.CreateModel(
            name='carts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userid', models.IntegerField(default=0)),
                ('productid', models.IntegerField(default=0)),
                ('quantity', models.IntegerField(default=0)),
            ],
        ),
    ]
