from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import action
from django.contrib.auth.hashers import make_password, check_password
from django.core.exceptions import ValidationError

from .models import signup
from .serializers import signupserializer
from rest_framework.views import APIView

# Create your views here.

# class SignupViewSet(viewsets.ModelViewSet):
#     queryset = signup.objects.all()
#     serializer_class = signupserializer


class signupviewset(APIView):
    # queryset = signup.objects.all()
    # serializer_class = signupserializer

    def get(self,request):
            sign = signup.objects.all()
            serializer = signupserializer(sign, many=True)
            return Response(serializer.data)

    def post(self, request):
        print(request.data.get('name'))
        if request.data.get('name'):
            # ,context={'request': request}
            # request.data.password=make_password(request.data.get('password'))

            mail=request.data.get('email')
            try:
                signup_obj=signup.objects.filter(email=mail)
                if signup_obj:
                    raise ValidationError('email id already exists')
                else:
                    serializer = signupserializer(data=request.data)
                    if serializer.is_valid():
                        # serializer.data.password=make_password(serializer.data.password)
                        serializer.save()
                        return Response(serializer.data)
                    return Response(serializer.errors)
            except ValidationError as e:
                return Response({'success': False,'error':e})

            
        else :
            print("1")
            
            mail = request.data.get('email')
            passw = request.data.get('password')
            print("email:",mail,"pass: ",passw)
            signup_obj = signup.objects.filter(email=mail, password=passw).first()
            print(signup_obj)
            if signup_obj:
                data = {
                    'userid': signup_obj.id,
                    'superuser': signup_obj.superuser,
                }
                # print(data.userid)
                return Response(data)
            return Response("Not found")

    def patch(self, request):
        loggedid=request.data.get('id')
        log = signup.objects.filter(id=loggedid).first()
        print("log",log)
        serializer = signupserializer(log, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)