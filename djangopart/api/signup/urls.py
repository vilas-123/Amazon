from django.urls import path,include
from rest_framework import routers
from . import views

from .views import signupviewset
# from .views import SignupViewSet

# router=routers.DefaultRouter()
# router.register(r'',views.SignupViewSet)

urlpatterns = [
    # path('',include(router.urls))
    path('',signupviewset.as_view(), name='signup'),
    # path('signup',SignupViewSet.as_view(), name='Signupapi')
]
