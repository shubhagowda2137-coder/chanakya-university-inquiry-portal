from rest_framework import serializers
from .models import Hostel, HostelRoom


class HostelRoomSerializer(serializers.ModelSerializer):
    room_type_display = serializers.CharField(source='get_room_type_display', read_only=True)
    course_name = serializers.CharField(source='course.course_name', read_only=True, allow_null=True)

    class Meta:
        model = HostelRoom
        fields = [
            'id', 'room_type', 'room_type_display', 'available_rooms',
            'monthly_fee', 'course', 'course_name', 'created_at'
        ]


class HostelSerializer(serializers.ModelSerializer):
    hostel_type_display = serializers.CharField(source='get_hostel_type_display', read_only=True)
    rooms = HostelRoomSerializer(many=True, read_only=True)
    total_available_rooms = serializers.ReadOnlyField()

    class Meta:
        model = Hostel
        fields = [
            'id', 'hostel_name', 'hostel_type', 'hostel_type_display',
            'total_rooms', 'total_available_rooms', 'address',
            'contact_number', 'rooms', 'created_at'
        ]


class HostelListSerializer(serializers.ModelSerializer):
    hostel_type_display = serializers.CharField(source='get_hostel_type_display', read_only=True)
    total_available_rooms = serializers.ReadOnlyField()
    room_count = serializers.SerializerMethodField()

    class Meta:
        model = Hostel
        fields = [
            'id', 'hostel_name', 'hostel_type', 'hostel_type_display',
            'total_rooms', 'total_available_rooms', 'room_count',
            'address', 'contact_number', 'created_at'
        ]

    def get_room_count(self, obj):
        return obj.rooms.count()
