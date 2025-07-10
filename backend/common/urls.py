from django.urls import path
from .views import RegisterView, LoginView, LogoutView, TokenRefreshView, UserProfileView, ChangePasswordView, RequestEmailVerificationView, VerifyEmailView, PasswordResetRequestView, PasswordResetConfirmView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/user/', UserProfileView.as_view(), name='user_profile'),
    path('auth/change-password/', ChangePasswordView.as_view(), name='change_password'),
]

urlpatterns += [
    path('auth/request-email-verification/', RequestEmailVerificationView.as_view(), name='request_email_verification'),
    path('auth/verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('auth/reset-password/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('auth/reset-password-confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
] 