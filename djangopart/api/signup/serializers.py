from rest_framework import serializers

from .models import signup




class signupserializer(serializers.ModelSerializer):
    # url = serializers.HyperlinkedIdentityField(
    #     view_name='signup:detail',
    #     lookup_field='id'
    # )
    id = serializers.ReadOnlyField()
    class Meta:
        model=signup
        fields='__all__'