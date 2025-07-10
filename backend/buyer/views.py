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
        return Response(serializer.data)

    def put(self, request):
        profile, created = BuyerProfile.objects.get_or_create(user=request.user)
        serializer = BuyerProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

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
