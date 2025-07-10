from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet
from .views import PropertyAnalyticsView

router = DefaultRouter()
router.register(r'', PropertyViewSet, basename='property')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/analytics/', PropertyAnalyticsView.as_view(), name='property-analytics'),
    path('saved/', PropertyViewSet.as_view({'get': 'saved'}), name='saved-properties-alias'),
]
