from django.shortcuts import render
from rest_framework import viewsets
from .models import subcategory
from .serializers import subcategoryserializer
# Create your views here.

class subcategoryviewset(viewsets.ModelViewSet):
    queryset=subcategory.objects.all()
    serializer_class=subcategoryserializer