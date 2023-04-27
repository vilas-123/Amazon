
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
    path('carts/',include('api.carts.urls')),
    path('cartex/',include('api.cartex.urls')),
    path('cartitem/',include('api.cartitem.urls')),
    path('Profile/',include('api.Profile.urls')),
    path('subcategory/',include('api.subcategory.urls')),
]


