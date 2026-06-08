from django.db import models
from courses.models import Course


class Hostel(models.Model):
    HOSTEL_TYPE_CHOICES = [
        ('Boys', 'Boys'),
        ('Girls', 'Girls'),
        ('Mixed', 'Mixed'),
    ]

    hostel_name = models.CharField(max_length=200, unique=True)
    hostel_type = models.CharField(max_length=10, choices=HOSTEL_TYPE_CHOICES)
    total_rooms = models.PositiveIntegerField()
    address = models.TextField(blank=True, default='')
    contact_number = models.CharField(max_length=15, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['hostel_name']
        verbose_name = 'Hostel'
        verbose_name_plural = 'Hostels'

    def __str__(self):
        return f"{self.hostel_name} ({self.hostel_type})"

    @property
    def total_available_rooms(self):
        return sum(r.available_rooms for r in self.rooms.all())


class HostelRoom(models.Model):
    ROOM_TYPE_CHOICES = [
        ('Single', 'Single Occupancy'),
        ('Double', 'Double Occupancy'),
        ('Triple', 'Triple Occupancy'),
        ('Dormitory', 'Dormitory'),
    ]

    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE, related_name='rooms')
    room_type = models.CharField(max_length=20, choices=ROOM_TYPE_CHOICES)
    available_rooms = models.PositiveIntegerField(default=0)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True,
                               related_name='hostel_rooms',
                               help_text='Course for which this room type is allocated (optional)')
    monthly_fee = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['hostel', 'room_type']
        verbose_name = 'Hostel Room'
        verbose_name_plural = 'Hostel Rooms'

    def __str__(self):
        return f"{self.hostel.hostel_name} - {self.room_type} ({self.available_rooms} available)"
