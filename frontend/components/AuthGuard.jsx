"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children, allowedUserType }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

    useEffect(() => {
    const checkAuth = () => {
      // Check if user is logged in
      const token = localStorage.getItem("access_token");
      const userType = localStorage.getItem("user_type");
      
      console.log("AuthGuard: Checking authentication", { token: !!token, userType, allowedUserType });
      
      if (!token) {
        // No token, redirect to login
        console.log("AuthGuard: No token found, redirecting to login");
        router.push("/login");
        return;
      }

      // Check if user type matches the required type for this page
      if (allowedUserType && userType !== allowedUserType) {
        // Wrong user type, redirect to appropriate dashboard
        console.log("AuthGuard: Wrong user type, redirecting to correct dashboard");
        if (userType === "seller") {
          router.push("/seller/dashboard");
        } else if (userType === "buyer") {
          router.push("/buyer/dashboard");
        } else {
          router.push("/login");
        }
        return;
      }

      // User is authenticated and has correct user type
      console.log("AuthGuard: User authenticated successfully");
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    // Add a small delay to ensure localStorage is available
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [router, allowedUserType]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return children;
};

export default AuthGuard;
