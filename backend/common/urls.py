from django.urls import path
from .views import RegisterView, LoginView, LogoutView, TokenRefreshView, UserProfileView, ChangePasswordView, RequestEmailVerificationView, VerifyEmailView, PasswordResetRequestView, PasswordResetConfirmView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserProfileView.as_view(), name='user_profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('request-email-verification/', RequestEmailVerificationView.as_view(), name='request_email_verification'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('reset-password/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('reset-password-confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]