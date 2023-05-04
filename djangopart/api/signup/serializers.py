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
        extra_kwargs={
            'password':{'write_only':True}
        }
        
    # def create(self, validated_data):
    #     password=validated_data.pop('password',None)
    #     instance=self.Meta.model(**validated_data)
    #     if password is not None:
    #         instance.set_password(password)
    #         instance.save()
    #         return instance