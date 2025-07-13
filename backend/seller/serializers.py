from rest_framework import serializers
from .models import SellerProfile
from common.serializers import CustomUserSerializer

class SellerProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = SellerProfile
        fields = ['id', 'user', 'first_name', 'last_name', 'phone', 'address', 'image', 'alternative_number', 'date_of_birth', 'gender']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        # Update SellerProfile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update related user fields
        user = instance.user
        for attr, value in user_data.items():
            setattr(user, attr, value)
        user.save()
        return instance

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        user_fields = rep.pop('user', {})
        rep.update(user_fields)  # Flatten user fields
        return rep
