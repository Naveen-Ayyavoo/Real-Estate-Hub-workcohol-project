from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import BuyerProfile
from .serializers import BuyerProfileSerializer

class BuyerProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, created = BuyerProfile.objects.get_or_create(user=request.user)
        serializer = BuyerProfileSerializer(profile)
        return Response({"success": True, "data": serializer.data, "message": "Buyer profile fetched", "errors": None, "pagination": None})

    def put(self, request):
        profile, created = BuyerProfile.objects.get_or_create(user=request.user)
        data = request.data.copy()
        # Wrap user fields in 'user' key if not already present
        user_fields = ['first_name', 'last_name', 'phone', 'address', 'alternative_number', 'date_of_birth', 'gender']
        user_data = {k: data[k] for k in user_fields if k in data}
        if user_data:
            data['user'] = user_data
        serializer = BuyerProfileSerializer(profile, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "data": serializer.data, "message": "Buyer profile updated", "errors": None, "pagination": None})
        return Response({"success": False, "data": None, "message": "Validation error", "errors": serializer.errors, "pagination": None}, status=400)

class BuyerDashboardView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # Placeholder: Replace with real dashboard data
        data = {
            "saved_properties_count": 0,
            "recent_searches": [],
            "recommendations": []
        }
        return Response({"success": True, "data": data, "message": "Buyer dashboard data", "errors": None, "pagination": None})
