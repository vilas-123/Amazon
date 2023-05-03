from django.shortcuts import render
from rest_framework import viewsets
from .models import products as item
from .serializers import productserializer
from rest_framework.decorators import api_view
# Create your views here.
from rest_framework.response import Response


class productviewset(viewsets.ModelViewSet):
    queryset=item.objects.all()
    serializer_class=productserializer

    
    



