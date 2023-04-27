from django.shortcuts import render
from rest_framework import viewsets
from.serializers import cartitemserializer
from .models import cartitem
# Create your views here.

class cartitemviewset(viewsets.ModelViewSet):
    serializer_class=cartitemserializer
    queryset=cartitem.objects.all()