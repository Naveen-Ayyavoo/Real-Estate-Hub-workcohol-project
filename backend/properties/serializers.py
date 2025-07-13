from rest_framework import serializers
from .models import Property, PropertyImage, SavedProperty
from common.serializers import CustomUserSerializer
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'is_primary', 'created_at']

    def validate_image(self, value):
        # Validate file size (max 5MB)
        max_size = 5 * 1024 * 1024
        if value.size > max_size:
            raise serializers.ValidationError('Image size should not exceed 5MB.')
        # Validate file type
        valid_types = ['image/jpeg', 'image/png']
        if value.content_type not in valid_types:
            raise serializers.ValidationError('Only JPEG and PNG images are allowed.')
        return value

    def create(self, validated_data):
        image = validated_data.get('image')
        # Resize image if needed (max width/height 1200px)
        img = Image.open(image)
        max_dim = 1200
        if img.height > max_dim or img.width > max_dim:
            img.thumbnail((max_dim, max_dim))
            buffer = BytesIO()
            img_format = 'JPEG' if img.format == 'JPEG' else 'PNG'
            img.save(buffer, format=img_format)
            file_object = ContentFile(buffer.getvalue())
            image.name = image.name  # keep original name
            validated_data['image'] = file_object
        return super().create(validated_data)

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    created_by = CustomUserSerializer(source='seller', read_only=True)
    main_image = serializers.SerializerMethodField()
    location = serializers.CharField(source='address')
    beds = serializers.IntegerField(source='bedrooms')
    baths = serializers.DecimalField(source='bathrooms', max_digits=3, decimal_places=1)
    sqft = serializers.IntegerField(source='area')
    negotiable = serializers.BooleanField()
    features = serializers.JSONField()

    class Meta:
        model = Property
        fields = [
            'id', 'title', 'price', 'location', 'description', 'main_image', 'images',
            'created_by', 'property_type', 'beds', 'baths', 'sqft', 'city', 'state', 'zip_code',
            'latitude', 'longitude', 'status', 'featured', 'views_count', 'negotiable', 'features', 'created_at', 'updated_at'
        ]

    def get_main_image(self, obj):
        primary = obj.images.filter(is_primary=True).first()
        if not primary:
            primary = obj.images.first()
        if primary and primary.image:
            request = self.context.get('request')
            url = primary.image.url
            if request is not None:
                return request.build_absolute_uri(url)
            return url
        return None

class SavedPropertySerializer(serializers.ModelSerializer):
    property = PropertySerializer(read_only=True)

    class Meta:
        model = SavedProperty
        fields = ['id', 'user', 'property', 'created_at']
