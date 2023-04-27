from django.db import models

# Create your models here.
class cart(models.Model):
    products=models.IntegerField(default=0)
    userid=models.IntegerField(default=0)
    quantity = models.IntegerField(default=1)
    
    @property
    def my_model_id(self):
        return self.id