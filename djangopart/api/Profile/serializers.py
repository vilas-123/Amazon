from .models import profile
from rest_framework import serializers

class profileserializer(serializers.HyperlinkedModelSerializer):
    id=serializers.ReadOnlyField()
    class Meta:
        model=profile
        fields='__all__'