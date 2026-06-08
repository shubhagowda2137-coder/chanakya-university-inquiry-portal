from django.contrib import admin
from .models import Faculty


@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ['faculty_name', 'designation', 'department', 'course', 'email', 'phone']
    list_filter = ['designation', 'department', 'course']
    search_fields = ['faculty_name', 'email', 'phone']
    ordering = ['faculty_name']
