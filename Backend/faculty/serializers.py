from rest_framework import serializers
from .models import Faculty


class FacultySerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    course_name = serializers.CharField(source='course.course_name', read_only=True)

    class Meta:
        model = Faculty
        fields = [
            'id', 'faculty_name', 'designation', 'email', 'phone',
            'department', 'department_name', 'course', 'course_name',
            'created_at'
        ]


class FacultyDetailSerializer(serializers.ModelSerializer):
    from courses.serializers import DepartmentSerializer, CourseSerializer
    department_name = serializers.CharField(source='department.name', read_only=True)
    course_name = serializers.CharField(source='course.course_name', read_only=True)
    course_type = serializers.CharField(source='course.course_type', read_only=True)

    class Meta:
        model = Faculty
        fields = [
            'id', 'faculty_name', 'designation', 'email', 'phone',
            'department', 'department_name', 'course', 'course_name',
            'course_type', 'created_at'
        ]
