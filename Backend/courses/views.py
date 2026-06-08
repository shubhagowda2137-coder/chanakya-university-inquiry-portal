from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Department, Course
from .serializers import DepartmentSerializer, CourseSerializer, CourseDetailSerializer


class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to view departments.
    """
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'hod_name']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']

    @swagger_auto_schema(
        operation_summary='List all departments',
        operation_description='Returns a paginated list of all university departments with HoD information.'
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to view courses.
    """
    queryset = Course.objects.select_related('department').all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['course_type', 'department']
    search_fields = ['course_name', 'specialization', 'department__name']
    ordering_fields = ['course_name', 'course_type', 'duration', 'created_at']
    ordering = ['course_name']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CourseDetailSerializer
        return CourseSerializer

    @swagger_auto_schema(
        operation_summary='List all courses',
        operation_description='Returns a paginated list of all UG/PG courses. Filter by course_type (UG/PG) or department.',
        manual_parameters=[
            openapi.Parameter('course_type', openapi.IN_QUERY, description='Filter by UG or PG', type=openapi.TYPE_STRING),
            openapi.Parameter('department', openapi.IN_QUERY, description='Filter by department ID', type=openapi.TYPE_INTEGER),
            openapi.Parameter('search', openapi.IN_QUERY, description='Search in course name or specialization', type=openapi.TYPE_STRING),
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Get course details',
        operation_description='Returns detailed information about a specific course including department and faculty count.'
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
