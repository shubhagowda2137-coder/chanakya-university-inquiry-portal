from django.contrib import admin
from .models import TransportRoute, Bus


class BusInline(admin.TabularInline):
    model = Bus
    extra = 1
    fields = ['bus_number', 'total_seats', 'available_seats', 'driver_name', 'driver_phone']


@admin.register(TransportRoute)
class TransportRouteAdmin(admin.ModelAdmin):
    list_display = ['route_name', 'starting_point', 'ending_point', 'distance_km', 'total_available_seats']
    search_fields = ['route_name', 'starting_point', 'ending_point']
    inlines = [BusInline]


@admin.register(Bus)
class BusAdmin(admin.ModelAdmin):
    list_display = ['bus_number', 'route', 'total_seats', 'available_seats', 'driver_name']
    list_filter = ['route']
    search_fields = ['bus_number', 'driver_name']
