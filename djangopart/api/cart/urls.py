# from rest_framework import routers
# from django.urls import path,include
# from . import views
# # from rest_framework.urlpatterns import format_suffix_patterns

# router=routers.DefaultRouter()
# router.register(r'<int:userid>/cart',views.cartviewset,basename="product-detail")
# # app_name='cart'
# urlpatterns = [
#     # path('<int:userid>/cart/',include(router.urls)),
#     path('', include(router.urls)),
#     path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
#     # path('<int:userid>/cart/', views.exampleview,name='exampleview')
#     #  path('<int:userid>/cart/', views.cartviewset,name='cartview')
# ]

# urlpatterns+=router.urls
# # urlpatterns=format_suffix_patterns(urlpatterns)


from django.urls import path
from .views import get_cart_items

urlpatterns = [
    path('<int:userid>/cart/', get_cart_items, name='get_cart_items'),
    path('<int:userid>/cart/add', get_cart_items, name='add_to_cart'),
]
