from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HostelViewSet, HostelRoomViewSet

router = DefaultRouter()
router.register(r'hostels', HostelViewSet, basename='hostel')
router.register(r'hostel-rooms', HostelRoomViewSet, basename='hostel-room')

urlpatterns = [
    path('', include(router.urls)),
]
