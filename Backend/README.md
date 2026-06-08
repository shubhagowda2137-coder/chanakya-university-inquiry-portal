# Chanakya University Inquiry Management System

A production-ready Django REST Framework project to manage student and parent inquiries, courses, faculty, hostel, and transport facilities for Chanakya University.

---

## Quick Start

```bash
# 1. Install Python dependencies
pip install -r requirements.txt

# 2. Apply database migrations
python manage.py migrate

# 3. Load sample data
python manage.py loaddata fixtures/sample_data.json

# 4. Create admin superuser
python manage.py createsuperuser

# 5. Run the development server
python manage.py runserver 0.0.0.0:8000
```

Open http://localhost:8000/ in your browser.

---

## Default Admin Credentials

| Field    | Value                             |
|----------|-----------------------------------|
| URL      | http://localhost:8000/admin/      |
| Username | admin                             |
| Password | admin@123                         |

---

## Project Structure

```
chanakya_university/          Django project root
├── manage.py
├── requirements.txt
├── db.sqlite3                 SQLite database (auto-created)
├── fixtures/
│   └── sample_data.json       50 pre-loaded sample records
├── chanakya_university/       Project settings package
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── courses/                   Departments & Courses app
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
├── faculty/                   Faculty app
├── hostel/                    Hostel & Rooms app
├── transport/                 Routes & Buses app
├── inquiries/                 Inquiry Registration app
├── templates/                 HTML templates (Bootstrap 5)
│   ├── base.html
│   ├── index.html
│   ├── courses.html
│   ├── faculty.html
│   ├── hostel.html
│   └── transport.html
└── static/
    ├── css/custom.css
    └── js/app.js
```

---

## Database Models & ER Summary

```
Department  ──< Course ──< Faculty
                  │
                  └──< HostelRoom >── Hostel
                  └──< Inquiry

TransportRoute ──< Bus
```

### Department
| Field    | Type         |
|----------|--------------|
| id       | BigAutoField |
| name     | CharField    |
| hod_name | CharField    |

### Course
| Field         | Type        |
|---------------|-------------|
| department    | FK          |
| course_name   | CharField   |
| specialization| CharField   |
| course_type   | UG / PG     |
| duration      | CharField   |

### Faculty
| Field       | Type      |
|-------------|-----------|
| department  | FK        |
| course      | FK        |
| faculty_name| CharField |
| designation | CharField |
| email       | EmailField|
| phone       | CharField |

### Hostel
| Field        | Type      |
|--------------|-----------|
| hostel_name  | CharField |
| hostel_type  | Boys/Girls/Mixed |
| total_rooms  | Integer   |

### HostelRoom
| Field          | Type      |
|----------------|-----------|
| hostel         | FK        |
| room_type      | Single/Double/Triple/Dormitory |
| available_rooms| Integer   |
| course         | FK (opt)  |
| monthly_fee    | Decimal   |

### TransportRoute
| Field          | Type      |
|----------------|-----------|
| route_name     | CharField |
| starting_point | CharField |
| ending_point   | CharField |
| distance_km    | Decimal   |

### Bus
| Field          | Type      |
|----------------|-----------|
| route          | FK        |
| bus_number     | CharField |
| total_seats    | Integer   |
| available_seats| Integer   |

### Inquiry
| Field             | Type      |
|-------------------|-----------|
| student_name      | CharField |
| interested_course | FK        |
| email             | EmailField|
| phone             | CharField |
| consent           | Boolean   |
| inquiry_date      | DateTime  |

---

## API Reference

### Base URL
```
http://localhost:8000/api/
```

### Endpoints

| Method | Endpoint                           | Description                    |
|--------|------------------------------------|--------------------------------|
| POST   | /api/inquiries/register/           | Submit new inquiry             |
| GET    | /api/inquiries/                    | List all inquiries (admin)     |
| GET    | /api/departments/                  | List all departments           |
| GET    | /api/courses/                      | List all courses               |
| GET    | /api/courses/{id}/                 | Course details                 |
| GET    | /api/faculty/                      | List all faculty               |
| GET    | /api/faculty/course/{course_id}/   | Faculty by course              |
| GET    | /api/hostels/                      | List all hostels               |
| GET    | /api/hostels/{id}/                 | Hostel with room details       |
| GET    | /api/transport/routes/             | List all transport routes      |
| GET    | /api/transport/routes/{id}/        | Route details                  |
| GET    | /api/transport/routes/{id}/buses/  | Buses on a route               |
| POST   | /api/token/                        | Obtain JWT token               |
| POST   | /api/token/refresh/                | Refresh JWT token              |

### Query Parameters (all list endpoints)
| Param    | Description                        |
|----------|------------------------------------|
| search   | Full-text search                   |
| ordering | Field name (prefix - for desc)     |
| page     | Page number (default: 1)           |
| page_size| Items per page (default: 10)       |

### POST /api/inquiries/register/ — Example

**Request:**
```json
{
  "student_name": "Rahul Sharma",
  "interested_course": 1,
  "email": "rahul@example.com",
  "phone": "9876543210",
  "consent": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Thank you, Rahul Sharma! Your inquiry has been submitted successfully. Our team will contact you shortly.",
  "inquiry_id": 1,
  "student_name": "Rahul Sharma",
  "course_name": "B.Tech Computer Science"
}
```

### GET /api/courses/?course_type=UG — Example Response

```json
{
  "count": 6,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "department": 1,
      "department_name": "Computer Science & Engineering",
      "course_name": "B.Tech Computer Science",
      "specialization": "Artificial Intelligence & ML",
      "course_type": "UG",
      "course_type_display": "Under Graduate",
      "duration": "4 Years"
    }
  ]
}
```

---

## Authentication (JWT)

```bash
# Obtain token
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin@123"}'

# Use token
curl http://localhost:8000/api/inquiries/ \
  -H "Authorization: Bearer <access_token>"
```

---

## Swagger / ReDoc

| Tool    | URL                              |
|---------|----------------------------------|
| Swagger | http://localhost:8000/swagger/   |
| ReDoc   | http://localhost:8000/redoc/     |
| JSON    | http://localhost:8000/swagger.json |

---

## Admin Panel

Visit http://localhost:8000/admin/ and log in with admin / admin@123.

**Available admin sections:**
- Departments & Courses — add/edit/filter courses
- Faculty Members — manage faculty with inline tabular views
- Hostels & Rooms — inline room management
- Transport Routes & Buses — inline bus management
- Inquiries — track and mark inquiries as contacted

---

## Frontend Pages

| Page       | URL              |
|------------|------------------|
| Home       | /                |
| Courses    | /courses/        |
| Faculty    | /faculty/        |
| Hostel     | /hostel/         |
| Transport  | /transport/      |

All pages feature:
- Auto-popup inquiry registration modal on first visit
- Bootstrap 5 responsive design
- Live search & filtering powered by REST APIs
- Availability indicators (green/amber/red)
- Pagination

---

## Postman Examples

### Register Inquiry
```
POST http://localhost:8000/api/inquiries/register/
Content-Type: application/json

{
  "student_name": "Priya Patel",
  "interested_course": 3,
  "email": "priya.patel@gmail.com",
  "phone": "9123456789",
  "consent": true
}
```

### Get UG Courses
```
GET http://localhost:8000/api/courses/?course_type=UG&ordering=course_name
```

### Get Faculty by Course
```
GET http://localhost:8000/api/faculty/course/1/
```

### Get Boys Hostels
```
GET http://localhost:8000/api/hostels/?hostel_type=Boys
```

### Get Buses on Route 1
```
GET http://localhost:8000/api/transport/routes/1/buses/
```

---

## Technology Stack

| Layer      | Technology                         |
|------------|------------------------------------|
| Language   | Python 3.11                        |
| Framework  | Django 5.2                         |
| API        | Django REST Framework 3.17         |
| Auth       | JWT (djangorestframework-simplejwt)|
| Docs       | drf-yasg (Swagger / ReDoc)         |
| DB         | SQLite (dev) / PostgreSQL (prod)   |
| Filtering  | django-filter                      |
| CORS       | django-cors-headers                |
| Frontend   | Bootstrap 5.3, Bootstrap Icons     |

---

## System Architecture

```
Browser ──► Django URL Router
                │
                ├──► Templates (Bootstrap 5 HTML)
                │       └── JS fetch() calls ──► REST API
                │
                ├──► REST API Views
                │       ├── courses/
                │       ├── faculty/
                │       ├── hostel/
                │       ├── transport/
                │       └── inquiries/
                │
                ├──► Swagger UI / ReDoc
                └──► Django Admin
                        └── SQLite Database
```

---

## Environment Variables

| Variable       | Default                | Description                  |
|----------------|------------------------|------------------------------|
| SECRET_KEY     | (dev key)              | Django secret key            |
| DEBUG          | True                   | Debug mode (set False in prod)|
| DATABASE_URL   | SQLite                 | DB connection string (prod)  |

---

## Production Deployment Checklist

1. Set `DEBUG=False` in settings
2. Set a strong `SECRET_KEY`
3. Configure PostgreSQL `DATABASES`
4. Run `python manage.py collectstatic`
5. Use Gunicorn/uWSGI + Nginx
6. Set `ALLOWED_HOSTS` to your domain

---

## License

MIT © Chanakya University 2024
