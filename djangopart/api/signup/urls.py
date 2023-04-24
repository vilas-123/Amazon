from django.urls import path,include
from rest_framework import routers
from . import views

from .views import signupviewset

router=routers.DefaultRouter()
router.register(r'',views.signupviewset)

urlpatterns = [
    path('',include(router.urls))
]
