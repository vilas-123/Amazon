from .models import category
from rest_framework import serializers
class categorySerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model=category
        fields="__all__"
