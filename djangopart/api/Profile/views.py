from django.shortcuts import render
from rest_framework import viewsets
from .models import profile
from .serializers import profileserializer
# Create your views here.


class profileviewset(viewsets.ModelViewSet):
    queryset=profile.objects.all()
    serializer_class=profileserializer