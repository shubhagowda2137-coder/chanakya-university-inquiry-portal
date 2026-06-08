from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from .models import TransportRoute, Bus
from .serializers import (
    TransportRouteSerializer,
    TransportRouteListSerializer,
    BusSerializer
)


class TransportRouteViewSet(
    viewsets.ReadOnlyModelViewSet
):
    """
    API endpoint to view transport
    routes and buses.
    """

    queryset = (
        TransportRoute.objects
        .prefetch_related('buses')
        .all()
    )

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter
    ]

    search_fields = [
        'route_name',
        'starting_point',
        'ending_point'
    ]

    ordering_fields = [
        'route_name',
        'created_at'
    ]

    ordering = ['route_name']

    def get_serializer_class(self):

        if self.action == 'retrieve':
            return (
                TransportRouteSerializer
            )

        return (
            TransportRouteListSerializer
        )

    @swagger_auto_schema(
        operation_summary=
        'List all transport routes'
    )
    def list(
        self,
        request,
        *args,
        **kwargs
    ):
        return super().list(
            request,
            *args,
            **kwargs
        )

    @swagger_auto_schema(
        operation_summary=
        'Get route details'
    )
    def retrieve(
        self,
        request,
        *args,
        **kwargs
    ):
        return super().retrieve(
            request,
            *args,
            **kwargs
        )

    @action(
        detail=True,
        methods=['get'],
        url_path='buses'
    )
    def buses(
        self,
        request,
        pk=None
    ):

        route = self.get_object()

        buses = (
            route.buses.all()
        )

        serializer = (
            BusSerializer(
                buses,
                many=True
            )
        )

        return Response({
            'route':
            route.route_name,

            'count':
            buses.count(),

            'results':
            serializer.data
        })

    # BOOK SEAT API
    @action(
        detail=True,
        methods=['post'],
        url_path='book-seat'
    )
    def book_seat(
        self,
        request,
        pk=None
    ):

        route = self.get_object()

        bus = (
            route.buses
            .filter(
                available_seats__gt=0
            )
            .first()
        )

        if not bus:
            return Response(
                {
                    "message":
                    "No seats available"
                },
                status=
                status.HTTP_400_BAD_REQUEST
            )

        bus.available_seats -= 1
        bus.save()

        return Response({
            "message":
            "Seat booked successfully",

            "bus":
            bus.bus_number,

            "remaining_seats":
            bus.available_seats
        })


class BusViewSet(
    viewsets.ReadOnlyModelViewSet
):
    """
    API endpoint to view buses.
    """

    queryset = (
        Bus.objects
        .select_related('route')
        .all()
    )

    serializer_class = (
        BusSerializer
    )

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter
    ]

    filterset_fields = [
        'route'
    ]

    search_fields = [
        'bus_number',
        'driver_name'
    ]