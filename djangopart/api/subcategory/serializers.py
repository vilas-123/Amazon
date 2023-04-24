from rest_framework import serializers
from .models import subcategory

class subcategoryserializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=subcategory
        fields='__all__'