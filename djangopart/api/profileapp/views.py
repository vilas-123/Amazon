
from rest_framework.views import APIView
from .models import profilemodel
from .serializers import profileappserializer
from rest_framework.response import Response
# Create your views here.


class profileappview(APIView):
    def get(self, request, userid):
        pf = profilemodel.objects.filter(userid=userid)
        serializer = profileappserializer(pf, many=True)
        return Response(serializer.data)

    def post(self, request, userid):
        serializer = profileappserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    # def patch(self, request, userid):
    #     pf = profilemodel.objects.filter(userid=userid)
    #     if not pf.exists():
    #         return Response("not found")
    #     serializer = profileappserializer(pf.first(), data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors)



    def patch(self, request, userid):
        pf = profilemodel.objects.filter(userid=userid)
        if not pf.exists():
            return Response("Profile not found", status=404)

        serializer = profileappserializer(
            pf.first(), data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    
