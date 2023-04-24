from rest_framework import serializers

from .models import signup


class signupserializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=signup
        fields='__all__'