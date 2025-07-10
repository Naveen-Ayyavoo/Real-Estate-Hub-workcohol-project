from django.db import models
from common.models import CustomUser
from bookings.models import Purchase

class Payment(models.Model):
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE, related_name='payments')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment of {self.amount} by {self.user.email} for purchase {self.purchase.id}"
