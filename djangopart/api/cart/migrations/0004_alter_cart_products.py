# Generated by Django 3.2.12 on 2023-04-26 09:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Product', '0004_alter_products_id'),
        ('cart', '0003_cart_userid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='products',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Product.products'),
        ),
    ]
