from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import SellerProfile
from .serializers import SellerProfileSerializer
from properties.models import Property
from properties.serializers import PropertySerializer
from bookings.models import Favorite

class SellerProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, created = SellerProfile.objects.get_or_create(user=request.user)
        serializer = SellerProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        profile, created = SellerProfile.objects.get_or_create(user=request.user)
        serializer = SellerProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class SellerPropertiesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        if getattr(user, 'user_type', None) != 'seller':
            return Response({'detail': 'Only sellers can access this endpoint.'}, status=403)
        properties = Property.objects.filter(owner=user)
        data = PropertySerializer(properties, many=True, context={'request': request}).data
        return Response(data)

class SellerStatsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        if getattr(user, 'user_type', None) != 'seller':
            return Response({'detail': 'Only sellers can access this endpoint.'}, status=403)
        total_properties = Property.objects.filter(owner=user).count()
        total_saved = Favorite.objects.filter(property__owner=user).count()
        # Stub for views, can be replaced with real tracking later
        total_views = 42
        return Response({
            'total_properties': total_properties,
            'total_saved': total_saved,
            'total_views': total_views
        })

class SellerDashboardView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # Placeholder: Replace with real dashboard data
        data = {
            "properties_count": 0,
            "analytics": {},
            "recent_inquiries": []
        }
        return Response({"success": True, "data": data, "message": "Seller dashboard data", "errors": None, "pagination": None})
