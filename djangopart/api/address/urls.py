from django.urls import path,include
from .views import addressview

urlpatterns = [
    path('<int:userid>/address/',addressview.as_view())
]
