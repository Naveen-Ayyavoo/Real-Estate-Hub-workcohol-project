# Real Estate Platform Backend

## Setup & Installation

### 1. Clone the Repository

```bash
git clone <repo-url>
cd real_estate_platform/backend
```

### 2. Create and Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Example:

```
SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=real_estate_db
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=3306
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. MySQL Database Setup

- Ensure MySQL is running and a database is created matching `DB_NAME` in your `.env`.
- Example MySQL commands:

```sql
CREATE DATABASE real_estate_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON real_estate_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### 5. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 7. Run the Development Server

```bash
python manage.py runserver
```

### 8. Media & Static Files

- Media files (property images, profile images) are stored in `/media/`.
- In development, Django serves media files automatically.
- In production, configure your web server (e.g., Nginx) to serve `/media/` and `/static/`.

### 9. CORS Configuration

- CORS is enabled for `http://localhost:3000` (Next.js frontend) by default.
- Add your production frontend domain to `CORS_ALLOWED_ORIGINS` in `settings.py`.

### 10. API Documentation

- OpenAPI/Swagger docs: [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)
- Raw schema: [http://localhost:8000/api/schema/](http://localhost:8000/api/schema/)

### 11. Running Tests

```bash
python manage.py test
```

## Frontend Integration (Next.js)

- All API endpoints are prefixed with `/api/` (e.g., `/api/auth/login/`, `/api/properties/`).
- Use JWT tokens for authentication (store in HTTP-only cookies or local storage).
- For file uploads, use `multipart/form-data` and send images as `images[]`.
- See API docs for detailed request/response formats.

## Production Considerations

- Set `DEBUG=False` and configure allowed hosts.
- Use a secure secret key and strong DB password.
- Set up static/media file serving with your web server.
- Configure logging, security headers, and rate limiting as needed.

## API Endpoints Overview

- **Auth:** `/api/auth/register/`, `/api/auth/login/`, `/api/auth/logout/`, `/api/auth/refresh/`, `/api/auth/user/`, `/api/auth/change-password/`
- **Properties:** `/api/properties/`, `/api/properties/{id}/`, `/api/properties/{id}/images/`, `/api/properties/featured/`, `/api/properties/{id}/save/`, `/api/properties/saved/`, `/api/properties/search/`, `/api/properties/filters/`
- **Dashboards:** `/api/dashboard/buyer/`, `/api/dashboard/seller/`, `/api/dashboard/analytics/`

For more, see the API docs at `/api/docs/`.
