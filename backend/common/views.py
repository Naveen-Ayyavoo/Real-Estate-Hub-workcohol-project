from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.db import models

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        data = request.data.copy()
        if 'email' in data:
            data['username'] = data['email']
        serializer = CustomUserSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            return Response({"status": "success", "data": CustomUserSerializer(user, context={'request': request}).data, "message": "Registration successful", "errors": None, "pagination": None}, status=status.HTTP_201_CREATED)
        return Response({"status": "error", "data": None, "message": "Registration failed", "errors": serializer.errors, "pagination": None}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "status": "success",
                "data": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user": CustomUserSerializer(user, context={'request': request}).data
                },
                "message": "Login successful",
                "errors": None,
                "pagination": None
            })
        return Response({"status": "error", "data": None, "message": "Invalid credentials", "errors": {"detail": "Invalid credentials"}, "pagination": None}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"success": True, "data": None, "message": "Logout successful", "errors": None, "pagination": None})
        except Exception as e:
            return Response({"success": False, "data": None, "message": "Logout failed", "errors": {"detail": str(e)}, "pagination": None}, status=status.HTTP_400_BAD_REQUEST)

class TokenRefreshView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        from rest_framework_simplejwt.views import TokenRefreshView as SimpleJWTTokenRefreshView
        return SimpleJWTTokenRefreshView.as_view()(request._request)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = CustomUserSerializer(request.user, context={'request': request})
        return Response({"status": "success", "data": serializer.data, "message": "User profile", "errors": None, "pagination": None})
    def put(self, request):
        serializer = CustomUserSerializer(request.user, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data, "message": "Profile updated", "errors": None, "pagination": None})
        return Response({"status": "error", "data": None, "message": "Update failed", "errors": serializer.errors, "pagination": None}, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        if not check_password(old_password, user.password):
            return Response({"success": False, "data": None, "message": "Old password is incorrect", "errors": {"old_password": "Incorrect password"}, "pagination": None}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(new_password)
        user.save()
        return Response({"success": True, "data": None, "message": "Password changed successfully", "errors": None, "pagination": None})

class EmailVerificationToken(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def is_expired(self):
        return (timezone.now() - self.created_at).total_seconds() > 3600  # 1 hour

class RequestEmailVerificationView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        user = request.user
        if user.is_verified:
            return Response({"success": False, "data": None, "message": "Email already verified", "errors": None, "pagination": None}, status=400)
        token = get_random_string(48)
        EmailVerificationToken.objects.create(user=user, token=token)
        verify_url = f"http://localhost:8000/api/auth/verify-email/?token={token}"
        send_mail(
            'Verify your email',
            f'Click the link to verify your email: {verify_url}',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
        )
        return Response({"success": True, "data": None, "message": "Verification email sent", "errors": None, "pagination": None})

class VerifyEmailView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        token = request.query_params.get('token')
        try:
            token_obj = EmailVerificationToken.objects.get(token=token, is_used=False)
            if token_obj.is_expired():
                return Response({"success": False, "data": None, "message": "Token expired", "errors": None, "pagination": None}, status=400)
            user = token_obj.user
            user.is_verified = True
            user.save()
            token_obj.is_used = True
            token_obj.save()
            return Response({"success": True, "data": None, "message": "Email verified", "errors": None, "pagination": None})
        except EmailVerificationToken.DoesNotExist:
            return Response({"success": False, "data": None, "message": "Invalid or used token", "errors": None, "pagination": None}, status=400)

class PasswordResetToken(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def is_expired(self):
        return (timezone.now() - self.created_at).total_seconds() > 3600  # 1 hour

class PasswordResetRequestView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        email = request.data.get('email')
        try:
            user = CustomUser.objects.get(email=email)
            token = get_random_string(48)
            PasswordResetToken.objects.create(user=user, token=token)
            reset_url = f"http://localhost:8000/api/auth/reset-password-confirm/?token={token}"
            send_mail(
                'Reset your password',
                f'Click the link to reset your password: {reset_url}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
            )
            return Response({"success": True, "data": None, "message": "Password reset email sent", "errors": None, "pagination": None})
        except CustomUser.DoesNotExist:
            return Response({"success": False, "data": None, "message": "User with this email does not exist", "errors": None, "pagination": None}, status=400)

class PasswordResetConfirmView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        try:
            token_obj = PasswordResetToken.objects.get(token=token, is_used=False)
            if token_obj.is_expired():
                return Response({"success": False, "data": None, "message": "Token expired", "errors": None, "pagination": None}, status=400)
            user = token_obj.user
            user.set_password(new_password)
            user.save()
            token_obj.is_used = True
            token_obj.save()
            return Response({"success": True, "data": None, "message": "Password reset successful", "errors": None, "pagination": None})
        except PasswordResetToken.DoesNotExist:
            return Response({"success": False, "data": None, "message": "Invalid or used token", "errors": None, "pagination": None}, status=400) 