from django.shortcuts import render
from rest_framework import viewsets

from .serializers import loginserializer

from .models import login
# Create your views here.

class loginviewset(viewsets.ModelViewSet):
    queryset=login.objects.all()
    serializer_class=loginserializer