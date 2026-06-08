from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InquiryRegisterView, InquiryViewSet

router = DefaultRouter()
router.register(r'inquiries', InquiryViewSet, basename='inquiry')

urlpatterns = [
    path('register/', InquiryRegisterView.as_view(), name='inquiry-register'),
    path('', include(router.urls)),
]