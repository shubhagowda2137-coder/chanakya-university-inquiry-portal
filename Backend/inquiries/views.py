from rest_framework import viewsets, status, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Inquiry
from .serializers import InquirySerializer, InquiryCreateResponseSerializer


class InquiryRegisterView(APIView):
    """
    POST /api/inquiries/register/
    Submit a new student or parent inquiry.
    """

    @swagger_auto_schema(
        operation_summary='Register a new inquiry',
        operation_description=(
            'Submit a new student or parent inquiry. '
            'Returns the inquiry ID and confirmation message.'
        ),
        request_body=InquirySerializer,
        responses={
            201: InquiryCreateResponseSerializer,
            400: 'Validation error'
        },
        tags=['Inquiries']
    )
    def post(self, request):
        serializer = InquirySerializer(data=request.data)
        if serializer.is_valid():
            inquiry = serializer.save()
            return Response(
                {
                    'success': True,
                    'message': (
                        f'Thank you, {inquiry.student_name}! '
                        'Your inquiry has been submitted successfully. '
                        'Our team will contact you shortly.'
                    ),
                    'inquiry_id': inquiry.id,
                    'student_name': inquiry.student_name,
                    'course_name': inquiry.interested_course.course_name if inquiry.interested_course else '',
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            {'success': False, 'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class InquiryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Admin-only viewset to list/retrieve inquiries.
    """
    queryset = Inquiry.objects.select_related('interested_course').all()
    serializer_class = InquirySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['interested_course', 'is_contacted', 'consent']
    search_fields = ['student_name', 'email', 'phone']
    ordering_fields = ['inquiry_date', 'student_name']
    ordering = ['-inquiry_date']
