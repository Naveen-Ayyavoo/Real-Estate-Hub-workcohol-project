from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Inquiry, Purchase, Favorite
from .serializers import InquirySerializer, PurchaseSerializer, FavoriteSerializer
from rest_framework.response import Response

class InquiryViewSet(viewsets.ModelViewSet):
    serializer_class = InquirySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Inquiry.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PurchaseViewSet(viewsets.ModelViewSet):
    serializer_class = PurchaseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Purchase.objects.filter(buyer=self.request.user)

    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user)

class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def list(self, request, *args, **kwargs):
        favorites = self.get_queryset()
        property_ids = favorites.values_list('property_id', flat=True)
        from properties.models import Property
        from properties.serializers import PropertySerializer
        properties = Property.objects.filter(id__in=property_ids)
        property_details = PropertySerializer(properties, many=True, context={'request': request}).data
        return Response({
            'property_ids': list(property_ids),
            'properties': property_details
        })
