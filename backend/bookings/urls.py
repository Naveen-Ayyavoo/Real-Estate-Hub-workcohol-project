from rest_framework.routers import DefaultRouter
from .views import InquiryViewSet, PurchaseViewSet, FavoriteViewSet

router = DefaultRouter()
router.register(r'inquiries', InquiryViewSet, basename='inquiry')
router.register(r'purchases', PurchaseViewSet, basename='purchase')
router.register(r'favorites', FavoriteViewSet, basename='favorite')

urlpatterns = router.urls
