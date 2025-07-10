# Real Estate Platform

A full-stack real estate platform built with Django (backend) and Next.js (frontend).

## Features

- User authentication (login/register)
- Property search and filtering
- Property details with images
- User profiles
- Responsive design

## Setup Instructions

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Create a virtual environment:**

   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**

   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables:**

   - Copy `env_template.txt` to `.env`
   - Update the values in `.env` with your database credentials

6. **Set up the database:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. **Create a superuser (optional):**

   ```bash
   python manage.py createsuperuser
   ```

8. **Run the backend server:**
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/register/` - User registration
- `POST /api/token/` - User login (JWT)
- `POST /api/token/refresh/` - Refresh JWT token

### Properties

- `GET /api/properties/` - List all properties
- `GET /api/properties/{id}/` - Get property details
- `POST /api/properties/` - Create new property (authenticated)
- `PUT /api/properties/{id}/` - Update property (authenticated)
- `DELETE /api/properties/{id}/` - Delete property (authenticated)

### User Profile

- `GET /api/profile/` - Get user profile (authenticated)
- `PUT /api/profile/` - Update user profile (authenticated)

### Favorites

- `GET /api/favorites/` - List user favorites (authenticated)
- `POST /api/favorites/` - Add to favorites (authenticated)
- `DELETE /api/favorites/{id}/` - Remove from favorites (authenticated)

## Pages

- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/profile` - User profile (authenticated)
- `/search` - Property search
- `/property/[id]` - Property details

## Troubleshooting

### Common Issues

1. **Backend won't start:**

   - Make sure you have a `.env` file with proper database credentials
   - Ensure MySQL is running and accessible
   - Check that all dependencies are installed

2. **Frontend shows errors:**

   - Ensure the backend is running on port 8000
   - Check browser console for CORS errors
   - Verify API endpoints are working

3. **Database connection issues:**

   - Update database credentials in `.env`
   - Ensure MySQL server is running
   - Check database exists and is accessible

4. **Authentication issues:**
   - Clear browser localStorage
   - Check JWT token expiration
   - Verify login credentials

### Development Tips

- Use browser developer tools to debug frontend issues
- Check Django logs for backend errors
- Use Django admin (`http://localhost:8000/admin/`) to manage data
- Test API endpoints with tools like Postman or curl

## Technologies Used

### Backend

- Django 5.2.4
- Django REST Framework
- Django CORS Headers
- Simple JWT
- MySQL
- Python Decouple

### Frontend

- Next.js 15.3.5
- React 19.0.0
- CSS3 with Grid and Flexbox

## License

This project is for educational purposes.
