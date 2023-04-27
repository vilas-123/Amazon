from django.shortcuts import render
from rest_framework import viewsets
from .serializers import cartsserializer
from .models import carts



# Create your views here.

class cartsviewset(viewsets.ModelViewSet):
    serializer_class=cartsserializer
    queryset=carts.objects.all()

   