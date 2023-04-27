from rest_framework import routers
from django.urls import path,include
from . import views

router=routers.DefaultRouter()
router.register(r'',views.cartsviewset)

# urlpatterns = [
#     path('',include(router.urls)),
#     path('<int:userid>/carts/',views.cartsviewset)
# ]


router = routers.DefaultRouter()
router.register(r'carts', views.cartsviewset,basename="carts")

urlpatterns = [
    path('', include(router.urls)),
]