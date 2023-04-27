from . import views
from rest_framework import routers
from django.urls import path,include

router=routers.DefaultRouter()
router.register(r'',views.cartitemviewset)

urlpatterns = [
    path('',include(router.urls)),
    path('<int:id>/api/cartitem/<int:cartItemId>',views.cartitem)
]
