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
        return Response({"success": True, "data": serializer.data, "message": "Seller profile fetched", "errors": None, "pagination": None})

    def put(self, request):
        profile, created = SellerProfile.objects.get_or_create(user=request.user)
        data = request.data.copy()
        # Wrap user fields in 'user' key if not already present
        user_fields = ['first_name', 'last_name', 'phone', 'address', 'alternative_number', 'date_of_birth', 'gender']
        user_data = {k: data[k] for k in user_fields if k in data}
        if user_data:
            data['user'] = user_data
        serializer = SellerProfileSerializer(profile, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "data": serializer.data, "message": "Seller profile updated", "errors": None, "pagination": None})
        return Response({"success": False, "data": None, "message": "Validation error", "errors": serializer.errors, "pagination": None}, status=400)

class SellerPropertiesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        if getattr(user, 'user_type', None) != 'seller':
            return Response({"success": False, "data": None, "message": "Only sellers can access this endpoint.", "errors": None, "pagination": None}, status=403)
        properties = Property.objects.filter(owner=user)
        data = PropertySerializer(properties, many=True, context={'request': request}).data
        return Response({"success": True, "data": data, "message": "Seller properties fetched", "errors": None, "pagination": None})

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
