from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

# Create your models here.

class products(models.Model):
    name=models.CharField(max_length=50)
    price=models.IntegerField(default=0)
    details=models.TextField(max_length=100)
    category=models.ForeignKey("category.category",on_delete=models.CASCADE)
    subcategory=models.ForeignKey("subcategory.subcategory",on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    

