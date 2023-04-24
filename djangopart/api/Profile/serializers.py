from .models import profile
from rest_framework import serializers

class profileserializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=profile
        fields='__all__'