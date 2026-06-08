from django.db import models
from courses.models import Course


class Inquiry(models.Model):
    student_name = models.CharField(max_length=200)
    interested_course = models.ForeignKey(
        Course, on_delete=models.SET_NULL, null=True, related_name='inquiries'
    )
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    consent = models.BooleanField(
        default=False,
        help_text='I consent to being contacted by Chanakya University regarding my inquiry.'
    )
    inquiry_date = models.DateTimeField(auto_now_add=True)
    is_contacted = models.BooleanField(default=False)
    notes = models.TextField(blank=True, default='')

    class Meta:
        ordering = ['-inquiry_date']
        verbose_name = 'Inquiry'
        verbose_name_plural = 'Inquiries'

    def __str__(self):
        return f"{self.student_name} - {self.interested_course} ({self.inquiry_date.date()})"
