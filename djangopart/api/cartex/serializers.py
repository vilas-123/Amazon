from rest_framework import serializers
from .models import cartex

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = cartex
        fields = '__all__'
