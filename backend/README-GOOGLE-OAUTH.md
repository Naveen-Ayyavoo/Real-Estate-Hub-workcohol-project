# Google OAuth Setup for Django (dj-rest-auth + allauth)

This guide explains how to enable Google login for your Django backend using `dj-rest-auth` and `django-allauth`.

---

## 1. Google Cloud Console Setup

### a. Create a Google Cloud Project

- Go to [Google Cloud Console](https://console.cloud.google.com/).
- Create a new project or select an existing one.

### b. Enable Google People API

- Navigate to **APIs & Services > Library**.
- Search for **Google People API** and enable it.

### c. Configure OAuth Consent Screen

- Go to **APIs & Services > OAuth consent screen**.
- Choose "External" for user type (if needed).
- Fill in required fields (app name, support email, etc.).
- Add test users (for development, add your own email).

### d. Create OAuth 2.0 Credentials

- Go to **APIs & Services > Credentials**.
- Click **Create Credentials > OAuth client ID**.
- Choose **Web application**.
- Set a name (e.g., "Django Backend").
- **Authorized JavaScript origins:**
  - `http://localhost:3000` (for local frontend)
- **Authorized redirect URIs:**
  - `http://localhost:8000/api/auth/google/callback/` (or your backend endpoint)
- Click **Create**.

### e. Get Client ID and Secret

- Copy the **Client ID** and **Client Secret** shown after creation.

---

## 2. Django Backend Configuration

### a. Add Credentials to Django

- Add the following to your `.env` file or `settings.py`:
  ```
  SOCIAL_AUTH_GOOGLE_CLIENT_ID=your-client-id
  SOCIAL_AUTH_GOOGLE_SECRET=your-client-secret
  ```
- Or, for `django-allauth`, add to `settings.py`:
  ```python
  SOCIALACCOUNT_PROVIDERS = {
      'google': {
          'APP': {
              'client_id': 'your-client-id',
              'secret': 'your-client-secret',
              'key': ''
          }
      }
  }
  ```

### b. (Optional) Add Social Application in Django Admin

- Go to `/admin/` > Social Applications.
- Add a new Social Application for Google.
- Enter the client ID, secret, and select your site.

### c. Ensure URLs and Views are Set Up

- Make sure you have a view for Google login (e.g., `GoogleLogin` using `dj-rest-auth` and `allauth`).
- Add a URL pattern for `/api/auth/google/` pointing to this view.

---

## 3. Restart Your Backend

- After making changes, restart your Django server.

---

## 4. Test Google Login

- From your frontend, initiate Google login and ensure it redirects and authenticates correctly.

---

**Troubleshooting:**

- 404 on `/api/auth/google/`: Check your Django URLs and views.
- Invalid client: Double-check your client ID/secret and redirect URI.
- Consent screen issues: Ensure your test user is added and all required fields are filled.

---

For further help, see the official docs:

- [django-allauth social login](https://django-allauth.readthedocs.io/en/latest/providers.html)
- [dj-rest-auth social login](https://dj-rest-auth.readthedocs.io/en/latest/installation.html#social-authentication)
