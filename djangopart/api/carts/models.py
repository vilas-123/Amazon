from django.db import models

# Create your models here.

class carts(models.Model):
    userid=models.IntegerField(default=0)
    productid=models.IntegerField(default=0)
    quantity=models.IntegerField(default=0)

    