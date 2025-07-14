// Utility to check if Django server is running
export const checkServerStatus = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/auth/login/", {
      method: "OPTIONS", // Use OPTIONS to avoid CORS issues
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Server check failed:", error);
    return false;
  }
};

export const showServerError = () => {
  const errorMessage = `
    🚨 Django Server Not Running!
    
    Please start the Django server by running:
    
    cd backend
    python manage.py runserver
    
    Then try again.
  `;

  console.error(errorMessage);
  alert("Django server is not running. Please start it and try again.");
};
