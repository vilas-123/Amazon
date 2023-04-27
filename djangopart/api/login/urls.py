from . import views
from django.urls import include,path
from rest_framework import routers

from .views import loginviewset

router=routers.DefaultRouter()
router.register(r'',views.loginviewset)

urlpatterns = [
    path('',include(router.urls))
    
]
