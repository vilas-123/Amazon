from rest_framework import serializers
from .models import cart

class cartserializer(serializers.ModelSerializer):
    id=serializers.ReadOnlyField()
    class Meta:
        model=cart
        fields=['id','userid','products','quantity']

