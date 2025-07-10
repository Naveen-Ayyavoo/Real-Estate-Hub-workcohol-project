from rest_framework import serializers
from .models import BuyerProfile

class BuyerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyerProfile
        fields = ['id', 'user', 'preferences']
