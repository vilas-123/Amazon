from django.db import models

# Create your models here.

class profile(models.Model):
    name=models.CharField(max_length=50)
    email=models.EmailField(max_length=254)
    phone=models.BigIntegerField()
    street=models.TextField(max_length=100)
    city=models.CharField(max_length=50)
    state=models.CharField(max_length=50)
    pincode=models.IntegerField(default=0)

    def __str__(self):
        return self.name
    
    @property
    def my_model_id(self):
        return self.id
    