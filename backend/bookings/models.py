from django.db import models
from common.models import CustomUser
from properties.models import Property

class Inquiry(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='inquiries')
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='inquiries')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry by {self.user} on {self.property}"

class Purchase(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    buyer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='purchases')
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='purchases')
    purchase_price = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    purchase_date = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Purchase of {self.property} by {self.buyer}"

    class Meta:
        unique_together = ('buyer', 'property')

class Favorite(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="favorites")
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="favorited_by")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "property")
        verbose_name = "Favorite"
        verbose_name_plural = "Favorites"

    def __str__(self):
        return f"{self.user.email} favorited {self.property.title}"
