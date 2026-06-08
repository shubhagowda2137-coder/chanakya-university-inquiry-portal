from django.contrib import admin
from .models import Department, Course


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'hod_name', 'created_at']
    search_fields = ['name', 'hod_name']
    ordering = ['name']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['course_name', 'department', 'course_type', 'specialization', 'duration', 'created_at']
    list_filter = ['course_type', 'department']
    search_fields = ['course_name', 'specialization']
    ordering = ['course_name']
