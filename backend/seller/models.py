from django.db import models
from common.models import CustomUser

class SellerProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='seller_profile')
    agency_name = models.CharField(max_length=255, blank=True, null=True)
    license_number = models.CharField(max_length=100, blank=True, null=True)
    # Add more seller-specific fields as needed

    def __str__(self):
        return f"SellerProfile for {self.user.email}"
