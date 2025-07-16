from rest_framework import serializers
from .models import SellerProfile
from common.serializers import CustomUserSerializer

class SellerProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = SellerProfile
        fields = ['id', 'user', 'first_name', 'last_name', 'phone', 'address', 'image', 'profile_image', 'alternative_number', 'date_of_birth', 'gender']

    def get_profile_image(self, obj):
        request = self.context.get('request', None)
        if obj.image:
            url = obj.image.url
            if request is not None:
                return request.build_absolute_uri(url)
            return url
        return None

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
