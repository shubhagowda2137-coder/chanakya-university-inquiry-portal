from django.contrib import admin
from .models import Hostel, HostelRoom


class HostelRoomInline(admin.TabularInline):
    model = HostelRoom
    extra = 1
    fields = ['room_type', 'available_rooms', 'monthly_fee', 'course']


@admin.register(Hostel)
class HostelAdmin(admin.ModelAdmin):
    list_display = ['hostel_name', 'hostel_type', 'total_rooms', 'total_available_rooms', 'contact_number']
    list_filter = ['hostel_type']
    search_fields = ['hostel_name', 'address']
    inlines = [HostelRoomInline]


@admin.register(HostelRoom)
class HostelRoomAdmin(admin.ModelAdmin):
    list_display = ['hostel', 'room_type', 'available_rooms', 'monthly_fee', 'course']
    list_filter = ['room_type', 'hostel']
    search_fields = ['hostel__hostel_name', 'room_type']
