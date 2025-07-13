from django.urls import path
from .views import BuyerProfileView
from .views import BuyerDashboardView

urlpatterns = [
    path('buyer/profile/', BuyerProfileView.as_view(), name='buyer-profile'),
    path('dashboard/buyer/', BuyerDashboardView.as_view(), name='buyer-dashboard'),
]
