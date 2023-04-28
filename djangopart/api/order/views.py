from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import order
from .serializers import orderserializer
# Create your views here.

class orderview(APIView):
    def get(self,request,userid):
        print(userid)
        orders=order.objects.filter(userid=userid)
        serializer=orderserializer(orders,many=True)
        return Response(serializer.data)
    
    def post(self,request,userid):
        serializer=orderserializer(data=request.data)
        if serializer.is_valid():
            serializer.save(userid=userid)
            return Response(serializer.data)
        return Response(serializer.errors)
    
    
        