# from django.shortcuts import render
# from rest_framework import viewsets
# from rest_framework.response import Response
# from .models import cart
# from rest_framework.decorators import api_view

# from .serializers import cartserializer
# # Create your views here.

# class cartviewset(viewsets.ModelViewSet):
#     serializer_class=cartserializer
#     queryset=cart.objects.all()

# # @api_view(['POST','GET','PATCH'])
# # def exampleview(request,userid):
# #     queryset = cart.objects.filter(userid=userid)
# #     print(queryset)
# #     list = []
# #     for item in queryset:
# #         list.append({item.userid})
# #     return Response(list)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import cart
from .serializers import cartserializer

@api_view(['GET', 'POST', 'PATCH'])
def get_cart_items(request, userid):
    print(request.method)
    # Retrieve the cart items for the given user ID from the database
    cart_items = cart.objects.filter(userid=userid)

    # Serialize the cart items to JSON format
    serializer = cartserializer(cart_items, many=True)

    # Return the serialized data in JSON format
    return Response(serializer.data)

@api_view(['POST'])
def add_to_cart(request, userid):
    # Get the list of products from the request data
    products = request.data.get([])

    # Create a new cart object for the given user ID
    new_cart = cart.objects.create(userid=userid)

    # Add each product to the cart
    for product_id in products:
        new_cart.products.add(product_id)

    # Return a success response
    return Response({'status': 'success'})