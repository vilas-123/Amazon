from django.shortcuts import render
from rest_framework import viewsets

from .models import signup
from .serializers import signupserializer

# Create your views here.

class signupviewset(viewsets.ModelViewSet):
    queryset=signup.objects.all()
    serializer_class=signupserializer