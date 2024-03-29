from rest_framework import routers
from django.urls import path, include
from . import views

router = routers.DefaultRouter()
router.register(r'', views.productviewset)

urlpatterns = [
    path('', include(router.urls)),
    path('api/Product/', views.productviewset.as_view({'get': 'list', 'post': 'create'}), name='product-list'),
    path('api/Product/<int:pk>/', views.productviewset.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='product-detail'),
]
