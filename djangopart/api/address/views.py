from django.shortcuts import render
from rest_framework.views import APIView
from .models import address
from .serializers import addressserializer
from rest_framework.response import Response
# from django.utils.decorators import method_decorator
# from django.views.decorators.csrf import csrf_exempt

# Create your views here.
# @method_decorator(csrf_exempt, name='dispatch')


class addressview(APIView):
    def get(self, request, userid):
        adr = address.objects.filter(userid=userid)
        serializer = addressserializer(adr, many=True)
        return Response(serializer.data)

    def post(self, request, userid):
        serializer = addressserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    # def patch(self, request, userid, id):
    #     adr = address.objects.filter(userid=userid, id=id)
    #     if not adr.exists():
    #         return Response("not found")
    #     serializer = addressserializer(adr.first(), request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors)

    def patch(self, request, userid):
        try:
            adr = address.objects.filter(userid=userid, id=request.data.get('id'))
            print(adr)
            if not adr.exists():
                return Response("Address not found")
            serializer = addressserializer(adr.first(), data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors,)
        except Exception as e:
            return Response(str(e))