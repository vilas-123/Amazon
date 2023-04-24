from .models import login
from rest_framework import serializers


class loginserializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=login
        fields='__all__'