from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

schema_view = get_schema_view(
    openapi.Info(
        title="Chanakya University Inquiry API",
        default_version='v1',
        description=(
            "Complete API for Chanakya University Inquiry Management System. "
            "Manage student/parent inquiries, courses, faculty, hostel and transport facilities."
        ),
        terms_of_service="https://www.chanakyauniversity.edu.in/terms/",
        contact=openapi.Contact(email="admin@chanakyauniversity.edu.in"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # Swagger / ReDoc
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),

    # JWT Auth
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # API routes
    path('api/', include('inquiries.urls')),
    path('api/', include('courses.urls')),
    path('api/', include('faculty.urls')),
    path('api/', include('hostel.urls')),
    path('api/', include('transport.urls')),

    # Frontend pages
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
