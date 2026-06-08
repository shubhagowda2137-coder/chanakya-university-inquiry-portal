from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Faculty
from .serializers import FacultySerializer, FacultyDetailSerializer


class FacultyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to view faculty members.
    """
    queryset = Faculty.objects.select_related('department', 'course').all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['department', 'course', 'designation']
    search_fields = ['faculty_name', 'email', 'designation']
    ordering_fields = ['faculty_name', 'designation', 'created_at']
    ordering = ['faculty_name']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return FacultyDetailSerializer
        return FacultySerializer

    @swagger_auto_schema(
        operation_summary='List faculty members',
        operation_description='Returns paginated list of faculty. Filter by department, course, or designation.',
        manual_parameters=[
            openapi.Parameter('department', openapi.IN_QUERY, description='Filter by department ID', type=openapi.TYPE_INTEGER),
            openapi.Parameter('course', openapi.IN_QUERY, description='Filter by course ID', type=openapi.TYPE_INTEGER),
            openapi.Parameter('search', openapi.IN_QUERY, description='Search by name or email', type=openapi.TYPE_STRING),
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Get faculty by course',
        operation_description='Returns all faculty assigned to a specific course.'
    )
    @action(detail=False, methods=['get'], url_path='course/(?P<course_id>[^/.]+)')
    def by_course(self, request, course_id=None):
        faculty = Faculty.objects.filter(course_id=course_id).select_related('department', 'course')
        if not faculty.exists():
            return Response({'detail': 'No faculty found for this course.'}, status=404)
        serializer = FacultyDetailSerializer(faculty, many=True)
        return Response({'count': faculty.count(), 'results': serializer.data})
