from rest_framework import serializers

from .models import cartitem

class cartitemserializer(serializers.HyperlinkedModelSerializer):
    id=serializers.ReadOnlyField()
    class Meta:
        model=cartitem
        fields='__all__'