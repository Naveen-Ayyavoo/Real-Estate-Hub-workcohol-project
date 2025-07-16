from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, PropertyAnalyticsView, PropertyImageViewSet

router = DefaultRouter()
router.register(r'', PropertyViewSet, basename='property')
router.register(r'propertyimages', PropertyImageViewSet, basename='propertyimage')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/analytics/', PropertyAnalyticsView.as_view(), name='property-analytics'),
    path('saved/', PropertyViewSet.as_view({'get': 'saved'}), name='saved-properties-alias'),
]
