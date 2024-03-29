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

    def get(self, request):
        sign = signup.objects.all()
        serializer = signupserializer(sign, many=True)
        return Response(serializer.data)

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            # Check if the email already exists
            if signup.objects.filter(email=email).exists():
                raise ValidationError('Email already exists')

            serializer = signupserializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': True, 'message': 'User created successfully'})
            else:
                return Response({'success': False, 'error': serializer.errors})
        except Exception as e:
            return Response({'success': False, 'error': str(e)})

    def patch(self, request):
        loggedid = request.data.get('id')
        log = signup.objects.filter(id=loggedid).first()
        print("log", log)
        serializer = signupserializer(log, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
