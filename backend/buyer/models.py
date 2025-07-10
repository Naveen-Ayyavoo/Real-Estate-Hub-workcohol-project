from django.db import models
from common.models import CustomUser

class BuyerProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='buyer_profile')
    preferences = models.TextField(blank=True, null=True)
    # Add more buyer-specific fields as needed

    def __str__(self):
        return f"BuyerProfile for {self.user.email}"
