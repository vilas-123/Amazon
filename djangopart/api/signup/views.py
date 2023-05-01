from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from .models import signup
from .serializers import signupserializer

# Create your views here.


class signupviewset(viewsets.ModelViewSet):
    queryset = signup.objects.all()
    serializer_class = signupserializer

    def patch(self,request,loggedid):
        log=signup.objects.filter(id=loggedid)
        serializer=signupserializer(log.first(),request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

   