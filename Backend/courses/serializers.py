from rest_framework import serializers
from .models import Department, Course


class DepartmentSerializer(serializers.ModelSerializer):
    total_courses = serializers.SerializerMethodField()

    class Meta:
        model = Department
        fields = ['id', 'name', 'hod_name', 'total_courses', 'created_at']

    def get_total_courses(self, obj):
        return obj.courses.count()


class CourseSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    course_type_display = serializers.CharField(source='get_course_type_display', read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'department', 'department_name', 'course_name',
            'specialization', 'course_type', 'course_type_display',
            'duration', 'created_at'
        ]


class CourseDetailSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    course_type_display = serializers.CharField(source='get_course_type_display', read_only=True)
    faculty_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'department', 'course_name', 'specialization',
            'course_type', 'course_type_display', 'duration',
            'faculty_count', 'created_at'
        ]

    def get_faculty_count(self, obj):
        return obj.faculty_set.count()
