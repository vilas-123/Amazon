from django.shortcuts import render
from rest_framework import viewsets
from .models import products as item
from .serializers import productserializer
from rest_framework.decorators import api_view
# Create your views here.
from rest_framework.response import Response


class productviewset(viewsets.ModelViewSet):
    queryset=item.objects.all()
    serializer_class=productserializer
    



# def Products(request):
#     # if request.method=='POST':
#     postdata=request.POST
#     name=postdata.get("name")
#     price=postdata.get("price")
#     details=postdata.get("details")
#     category=postdata.get("category")
#     subcategory=postdata.get("subcategory")

#     product=item(
#         name=name,
#         price=price,
#         details=details,
#         category=category,
#         subcategory=subcategory
#     )
#     print(product)
#     product.save()
#     return Response({'status':'success'})

        # product.register()
        # return render(request,'http://localhost:3001/AddProduct')

    # if request.method=='GET':
        # return render(request,'http://localhost:3001/AddProduct')

        