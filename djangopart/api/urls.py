
from .Product import views
from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static



urlpatterns = [
    # path('http://localhost:3001/AddProduct', views.Products),

    path('category/',include('api.category.urls')),
    path('login/',include('api.login.urls')),
    path('signup/',include('api.signup.urls')),
    path('Product/',include('api.Product.urls')),
    # path('cart/',include('api.cart.urls')),
    path('Profile/',include('api.Profile.urls')),
    path('subcategory/',include('api.subcategory.urls')),
]


