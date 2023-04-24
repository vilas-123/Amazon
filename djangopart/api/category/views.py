from rest_framework import viewsets
from .serializers import categorySerializer
from .models import category    

class categoryviewset(viewsets.ModelViewSet):
    queryset = category.objects.all().order_by('name')
    serializer_class = categorySerializer