from .models import profilemodel
from rest_framework import serializers

class profileappserializer(serializers.ModelSerializer):
    class Meta:
        model=profilemodel
        fields='__all__'