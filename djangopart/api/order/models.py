
from django.db import models

# Create your models here.

class order(models.Model):
    userid=models.IntegerField(default=0)
    quantity=models.IntegerField(default=0)
    productid=models.IntegerField(default=0)
    status=models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True, null=True)