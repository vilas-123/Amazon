from django.urls import include,path
from .views import profileappview

urlpatterns = [
    path('<int:userid>/profile',profileappview.as_view())
]

