from django.db import models

# Create your models here.

class login(models.Model):
    name=models.CharField(max_length=50)
    password=models.CharField(default="some string", max_length=50)

    def __str__(self):
        return self.name