from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    USER_TYPES = [
        ('buyer', 'Buyer'),
        ('seller', 'Seller'),
        ('admin', 'Admin'),
    ]
    user_type = models.CharField(max_length=10, choices=USER_TYPES)
    phone = models.CharField(max_length=20)
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
