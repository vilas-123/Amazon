from rest_framework import serializers
from .models import address

class addressserializer(serializers.ModelSerializer):
    class Meta:
        model=address
        fields='__all__'