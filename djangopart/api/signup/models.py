from django.db import models

# Create your models here.


class signup(models.Model):
    name=models.CharField(max_length=50)
    email=models.EmailField(default='SOME STRING',max_length=254)
    password=models.CharField(max_length=50)


    def __str__(self):
        return self.name