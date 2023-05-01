from django.db import models


# Create your models here.

class profilemodel(models.Model):
    userid=models.IntegerField(default=0,unique=True)
    name=models.CharField(max_length=50)
    email=models.EmailField(max_length=254)
    phone=models.CharField(max_length=10)
    # address=models.ForeignKey("address.address", default="", on_delete=models.CASCADE)
    address=models.ForeignKey("address.address",  default="", on_delete=models.CASCADE)

    def __str__(self):
        return self.name