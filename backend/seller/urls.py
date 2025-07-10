from django.urls import path
from .views import SellerProfileView, SellerPropertiesView, SellerStatsView, SellerDashboardView

urlpatterns = [
    path('profile/', SellerProfileView.as_view(), name='seller-profile'),
    path('dashboard/seller/', SellerDashboardView.as_view(), name='seller-dashboard'),
]

urlpatterns += [
    path('properties/', SellerPropertiesView.as_view(), name='seller-properties'),
    path('stats/', SellerStatsView.as_view(), name='seller-stats'),
]
