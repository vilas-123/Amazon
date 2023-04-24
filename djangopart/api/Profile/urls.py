from django.urls import include,path
from .views import profileviewset
from rest_framework import routers
from . import views

router=routers.DefaultRouter()
router.register(r'',views.profileviewset)

urlpatterns = [
    path('',include(router.urls))
]
