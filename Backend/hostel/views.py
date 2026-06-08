from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Hostel, HostelRoom
from .serializers import HostelSerializer, HostelListSerializer, HostelRoomSerializer


class HostelViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to view hostel facilities.
    """
    queryset = Hostel.objects.prefetch_related('rooms').all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['hostel_type']
    search_fields = ['hostel_name', 'address']
    ordering_fields = ['hostel_name', 'total_rooms', 'created_at']
    ordering = ['hostel_name']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return HostelSerializer
        return HostelListSerializer

    @swagger_auto_schema(
        operation_summary='List all hostels',
        operation_description='Returns a list of all hostel facilities with room availability summary.',
        manual_parameters=[
            openapi.Parameter('hostel_type', openapi.IN_QUERY,
                              description='Filter by Boys / Girls / Mixed', type=openapi.TYPE_STRING),
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Get hostel details with rooms',
        operation_description='Returns full hostel details including all room types and availability.'
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


class HostelRoomViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to view hostel rooms.
    """
    queryset = HostelRoom.objects.select_related('hostel', 'course').all()
    serializer_class = HostelRoomSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['hostel', 'room_type', 'course']
    search_fields = ['room_type', 'hostel__hostel_name']
