from django.urls import path
from .views import orderview

urlpatterns = [
    path('order/<int:userid>/', orderview.as_view()),
]
