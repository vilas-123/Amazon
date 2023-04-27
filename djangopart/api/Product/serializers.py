from rest_framework import serializers
from .models import products

class productserializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model=products
        fields='__all__'
