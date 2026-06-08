from django.db import models
from courses.models import Department, Course


class Faculty(models.Model):
    DESIGNATION_CHOICES = [
        ('Professor', 'Professor'),
        ('Associate Professor', 'Associate Professor'),
        ('Assistant Professor', 'Assistant Professor'),
        ('Lecturer', 'Lecturer'),
        ('Guest Faculty', 'Guest Faculty'),
    ]

    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='faculty')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='faculty_set')
    faculty_name = models.CharField(max_length=200)
    designation = models.CharField(max_length=100, choices=DESIGNATION_CHOICES)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['faculty_name']
        verbose_name = 'Faculty'
        verbose_name_plural = 'Faculty Members'

    def __str__(self):
        return f"{self.faculty_name} - {self.designation}"
