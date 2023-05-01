from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', TokenObtainPairView.as_view()) ,
    path('api/refresh/', TokenRefreshView.as_view()) ,
    path('api/verify/', TokenVerifyView.as_view()) ,
    path('api/auth/', include('accounts.urls')) ,
]
