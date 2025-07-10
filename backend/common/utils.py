from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        data = {
            "success": False,
            "data": None,
            "message": "",
            "errors": response.data,
            "pagination": None
        }
        if response.status_code == status.HTTP_400_BAD_REQUEST:
            data["message"] = "Validation error"
        elif response.status_code == status.HTTP_401_UNAUTHORIZED:
            data["message"] = "Authentication error"
        elif response.status_code == status.HTTP_403_FORBIDDEN:
            data["message"] = "Permission denied"
        elif response.status_code == status.HTTP_404_NOT_FOUND:
            data["message"] = "Resource not found"
        elif response.status_code >= 500:
            data["message"] = "Internal server error"
        else:
            data["message"] = "Error"
        response.data = data
    return response
