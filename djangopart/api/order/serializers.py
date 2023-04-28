from rest_framework import serializers
from .models import order

class orderserializer(serializers.ModelSerializer):
    class Meta:
        model=order
        fields='__all__'