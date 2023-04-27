from rest_framework import serializers
from .models import carts

class cartsserializer(serializers.ModelSerializer):
    class Meta:
        model=carts
        fields=('userid', 'productid', 'quantity')