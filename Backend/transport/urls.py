from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransportRouteViewSet, BusViewSet

router = DefaultRouter()
router.register(r'transport/routes', TransportRouteViewSet, basename='transport-route')
router.register(r'transport/buses', BusViewSet, basename='bus')

urlpatterns = [
    path('', include(router.urls)),
]
