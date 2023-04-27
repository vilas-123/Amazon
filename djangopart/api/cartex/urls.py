from django.urls import path
from .views import CartView

urlpatterns = [
    path('carts/<int:userid>/', CartView.as_view()),
]
