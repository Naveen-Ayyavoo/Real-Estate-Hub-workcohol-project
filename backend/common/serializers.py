from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=False)
    avatar = serializers.SerializerMethodField(read_only=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'full_name', 'email', 'user_type', 'phone', 'avatar', 'profile_image', 'is_verified', 'created_at', 'updated_at', 'password', 'confirm_password']
        extra_kwargs = {
            'profile_image': {'write_only': True, 'required': False},
        }

    def get_avatar(self, obj):
        if obj.profile_image:
            request = self.context.get('request')
            url = obj.profile_image.url
            if request is not None:
                return request.build_absolute_uri(url)
            return url
        return None

    def validate(self, data):
        if self.context.get('request') and self.context['request'].method == 'POST':
            password = data.get('password')
            confirm_password = data.get('confirm_password')
            if password != confirm_password:
                raise serializers.ValidationError({'confirm_password': 'Passwords do not match.'})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user 