from rest_framework import serializers
from .models import SellerProfile

class SellerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerProfile
        fields = ['id', 'user', 'agency_name', 'license_number']
