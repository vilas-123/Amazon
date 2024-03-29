
from django import views
from django.conf import settings
from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static

from rest_framework.authtoken import views 


from .views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/',views.obtain_auth_token),
    path('api/',include('api.urls'))
]


urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)