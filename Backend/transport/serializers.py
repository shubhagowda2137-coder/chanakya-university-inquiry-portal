from rest_framework import serializers
from .models import (
    TransportRoute,
    Bus
)


class BusSerializer(
    serializers.ModelSerializer
):

    route_name = (
        serializers.CharField(
            source='route.route_name',
            read_only=True
        )
    )

    seats_filled = (
        serializers.SerializerMethodField()
    )

    class Meta:

        model = Bus

        fields = [
            'id',
            'bus_number',
            'total_seats',
            'available_seats',
            'seats_filled',
            'driver_name',
            'driver_phone',
            'route',
            'route_name',
            'created_at'
        ]

    def get_seats_filled(
        self,
        obj
    ):
        return (
            obj.total_seats -
            obj.available_seats
        )


class TransportRouteSerializer(
    serializers.ModelSerializer
):

    buses = (
        BusSerializer(
            many=True,
            read_only=True
        )
    )

    total_available_seats = (
        serializers.ReadOnlyField()
    )

    total_seats = (
        serializers.ReadOnlyField()
    )

    occupied_seats = (
        serializers.ReadOnlyField()
    )

    occupancy_percentage = (
        serializers.ReadOnlyField()
    )

    bus_count = (
        serializers.SerializerMethodField()
    )

    class Meta:

        model = TransportRoute

        fields = [
            'id',
            'route_name',
            'starting_point',
            'ending_point',
            'distance_km',

            'bus_count',

            'total_seats',

            'total_available_seats',

            'occupied_seats',

            'occupancy_percentage',

            'buses',

            'created_at'
        ]

    def get_bus_count(
        self,
        obj
    ):
        return (
            obj.buses.count()
        )


class TransportRouteListSerializer(
    serializers.ModelSerializer
):

    total_available_seats = (
        serializers.ReadOnlyField()
    )

    total_seats = (
        serializers.ReadOnlyField()
    )

    occupied_seats = (
        serializers.ReadOnlyField()
    )

    occupancy_percentage = (
        serializers.ReadOnlyField()
    )

    bus_count = (
        serializers.SerializerMethodField()
    )

    class Meta:

        model = TransportRoute

        fields = [
            'id',
            'route_name',
            'starting_point',
            'ending_point',
            'distance_km',

            'bus_count',

            'total_seats',

            'total_available_seats',

            'occupied_seats',

            'occupancy_percentage',

            'created_at'
        ]

    def get_bus_count(
        self,
        obj
    ):
        return (
            obj.buses.count()
        )