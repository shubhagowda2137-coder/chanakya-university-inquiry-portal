from django.contrib import admin
from .models import Inquiry


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ['student_name', 'interested_course', 'email', 'phone', 'consent', 'is_contacted', 'inquiry_date']
    list_filter = ['consent', 'is_contacted', 'interested_course__course_type', 'inquiry_date']
    search_fields = ['student_name', 'email', 'phone']
    ordering = ['-inquiry_date']
    date_hierarchy = 'inquiry_date'
    readonly_fields = ['inquiry_date']
    list_editable = ['is_contacted']

    fieldsets = (
        ('Student Information', {
            'fields': ('student_name', 'email', 'phone', 'interested_course')
        }),
        ('Consent & Status', {
            'fields': ('consent', 'is_contacted', 'notes')
        }),
        ('Timestamps', {
            'fields': ('inquiry_date',),
            'classes': ('collapse',)
        }),
    )
