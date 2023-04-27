from rest_framework import serializers
from .models import subcategory

class subcategoryserializer(serializers.HyperlinkedModelSerializer):
    id=serializers.ReadOnlyField()
    class Meta:
        model=subcategory
        fields='__all__'