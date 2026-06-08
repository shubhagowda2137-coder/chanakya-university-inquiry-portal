from rest_framework import serializers
from .models import Inquiry


class InquirySerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='interested_course.course_name', read_only=True)
    course_type = serializers.CharField(source='interested_course.course_type', read_only=True)

    class Meta:
        model = Inquiry
        fields = [
            'id', 'student_name', 'interested_course', 'course_name',
            'course_type', 'email', 'phone', 'consent', 'inquiry_date',
            'is_contacted'
        ]
        read_only_fields = ['id', 'inquiry_date', 'is_contacted']

    def validate_consent(self, value):
        if not value:
            raise serializers.ValidationError(
                'You must provide consent to be contacted by Chanakya University.'
            )
        return value

    def validate_phone(self, value):
        digits = ''.join(filter(str.isdigit, value))
        if len(digits) < 10:
            raise serializers.ValidationError('Please provide a valid 10-digit phone number.')
        return value

    def validate_student_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError('Please provide a valid full name.')
        return value.strip()


class InquiryCreateResponseSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    message = serializers.CharField()
    inquiry_id = serializers.IntegerField()
    student_name = serializers.CharField()
    course_name = serializers.CharField()
