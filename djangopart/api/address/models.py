from django.db import models

# Create your models here.
class address(models.Model):
    userid=models.IntegerField(default=0)
    street=models.CharField(max_length=50)
    city=models.CharField(max_length=50)
    state=models.CharField(max_length=50)
    pincode=models.BigIntegerField(default=845305)
