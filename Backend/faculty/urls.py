from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FacultyViewSet

router = DefaultRouter()
router.register(r'faculty', FacultyViewSet, basename='faculty')

urlpatterns = [
    path('', include(router.urls)),
    path('faculty/course/<int:course_id>/', FacultyViewSet.as_view({'get': 'by_course'}), name='faculty-by-course'),
]
