from django.db import models

# Create your models here.
class cartitem(models.Model):
    # cartItemId=models.AutoField(default=1)
    
    products=models.ForeignKey("Product.products", on_delete=models.CASCADE)
    quantity=models.IntegerField(default=0)

    def __str__(self):
        return self.name
    
    @property
    def my_model_id(self):
        return self.id