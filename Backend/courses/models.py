from django.db import models


class Department(models.Model):
    name = models.CharField(max_length=200, unique=True)
    hod_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']
        verbose_name = 'Department'
        verbose_name_plural = 'Departments'

    def __str__(self):
        return self.name


class Course(models.Model):
    COURSE_TYPE_CHOICES = [
        ('UG', 'Under Graduate'),
        ('PG', 'Post Graduate'),
    ]

    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='courses')
    course_name = models.CharField(max_length=300)
    specialization = models.CharField(max_length=300, blank=True, default='')
    course_type = models.CharField(max_length=2, choices=COURSE_TYPE_CHOICES)
    duration = models.CharField(max_length=50, help_text='e.g. 3 Years, 2 Years')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['course_name']
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'

    def __str__(self):
        return f"{self.course_name} ({self.course_type})"
