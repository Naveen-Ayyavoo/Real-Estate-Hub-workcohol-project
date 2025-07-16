from rest_framework import viewsets, status, generics, filters
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Property, PropertyImage, SavedProperty
from .serializers import PropertySerializer, PropertyImageSerializer, SavedPropertySerializer
from common.models import CustomUser
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from django.db import models

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('-created_at')
    serializer_class = PropertySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['city', 'state', 'zip_code', 'property_type', 'status', 'featured']
    search_fields = ['title', 'description', 'address', 'city', 'state']
    ordering_fields = ['price', 'created_at', 'views_count']
    pagination_class = PageNumberPagination

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy', 'upload_images']:
            return [IsAuthenticated()]
        return [AllowAny()]

    def perform_create(self, serializer):
        if self.request.user.user_type != 'seller':
            raise PermissionDenied('Only sellers can create properties.')
        serializer.save(seller=self.request.user)

    def perform_update(self, serializer):
        if self.request.user != self.get_object().seller:
            raise PermissionDenied('You do not own this property.')
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user != instance.seller:
            raise PermissionDenied('You do not own this property.')
        instance.delete()

    @action(detail=True, methods=['post'], parser_classes=[MultiPartParser, FormParser], permission_classes=[IsAuthenticated])
    def upload_images(self, request, pk=None):
        property_obj = self.get_object()
        if request.user != property_obj.seller:
            raise PermissionDenied('You do not own this property.')
        images = request.FILES.getlist('images')
        image_objs = []
        for img in images:
            image_obj = PropertyImage.objects.create(property=property_obj, image=img)
            image_objs.append(image_obj)
        serializer = PropertyImageSerializer(image_objs, many=True, context={'request': request})
        return Response({"success": True, "data": serializer.data, "message": "Images uploaded", "errors": None, "pagination": None}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def featured(self, request):
        featured_props = Property.objects.filter(featured=True, status='active')
        page = self.paginate_queryset(featured_props)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def save(self, request, pk=None):
        property_obj = self.get_object()
        if request.user.user_type != 'buyer':
            raise PermissionDenied('Only buyers can save properties.')
        saved, created = SavedProperty.objects.get_or_create(user=request.user, property=property_obj)
        if not created:
            saved.delete()
            return Response({"success": True, "data": None, "message": "Property unsaved", "errors": None, "pagination": None})
        return Response({"success": True, "data": None, "message": "Property saved", "errors": None, "pagination": None})

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def saved(self, request):
        saved_props = SavedProperty.objects.filter(user=request.user)
        serializer = SavedPropertySerializer(saved_props, many=True, context={'request': request})
        return Response({"success": True, "data": serializer.data, "message": "Saved properties", "errors": None, "pagination": None})

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def filters(self, request):
        # Return available filter options
        data = {
            "property_types": [x[0] for x in Property.PROPERTY_TYPES],
            "statuses": [x[0] for x in Property.STATUS_CHOICES],
            "cities": list(Property.objects.values_list('city', flat=True).distinct()),
            "states": list(Property.objects.values_list('state', flat=True).distinct()),
        }
        return Response({"success": True, "data": data, "message": "Filter options", "errors": None, "pagination": None})

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def search(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        # Advanced search: price, area, bedrooms, bathrooms, keyword
        price_min = request.query_params.get('price_min')
        price_max = request.query_params.get('price_max')
        area_min = request.query_params.get('area_min')
        area_max = request.query_params.get('area_max')
        bedrooms = request.query_params.get('bedrooms')
        bathrooms = request.query_params.get('bathrooms')
        keyword = request.query_params.get('keyword')
        if price_min:
            queryset = queryset.filter(price__gte=price_min)
        if price_max:
            queryset = queryset.filter(price__lte=price_max)
        if area_min:
            queryset = queryset.filter(area__gte=area_min)
        if area_max:
            queryset = queryset.filter(area__lte=area_max)
        if bedrooms:
            queryset = queryset.filter(bedrooms=bedrooms)
        if bathrooms:
            queryset = queryset.filter(bathrooms=bathrooms)
        if keyword:
            queryset = queryset.filter(
                models.Q(title__icontains=keyword) |
                models.Q(description__icontains=keyword)
            )
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

class PropertyImageViewSet(viewsets.ModelViewSet):
    queryset = PropertyImage.objects.all()
    serializer_class = PropertyImageSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Only allow sellers to upload images for their own properties
        property_obj = serializer.validated_data.get('property')
        if self.request.user != property_obj.seller:
            raise PermissionDenied('You do not own this property.')
        serializer.save()

class PropertyAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # Placeholder: Replace with real analytics data
        data = {
            "total_properties": 0,
            "total_views": 0,
            "top_properties": []
        }
        return Response({"success": True, "data": data, "message": "Property analytics data", "errors": None, "pagination": None})
