from rest_framework import serializers
from .models import Inquiry, Purchase, Favorite
from properties.models import Property

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = '__all__'

class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'

class FavoriteSerializer(serializers.ModelSerializer):
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Favorite
        fields = ['id', 'user', 'property', 'created_at']
