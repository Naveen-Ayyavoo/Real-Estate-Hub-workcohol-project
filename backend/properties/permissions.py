from rest_framework import permissions

class IsSellerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow sellers to edit properties.
    """
    def has_permission(self, request, view):
        # Allow read-only for anyone
        if request.method in permissions.SAFE_METHODS:
            return True
        # Allow write only if seller
        return request.user.is_authenticated and getattr(request.user, 'user_type', None) == 'seller'

    def has_object_permission(self, request, view, obj):
        # Sellers can modify only their own properties
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user
