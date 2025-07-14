// API Service for handling all backend requests
const API_BASE_URL = "http://localhost:8000/api";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from localStorage
  getAuthToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  }

  // Set auth token
  setAuthToken(token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
  }

  // Remove auth token (logout)
  removeAuthToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }

  // Get default headers
  getHeaders(includeAuth = true) {
    const headers = {
      "Content-Type": "application/json",
    };

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Handle API response
  async handleResponse(response) {
    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      // If not JSON, it might be HTML (server error page)
      const text = await response.text();
      console.error("Non-JSON response:", text.substring(0, 200));

      if (response.status === 0) {
        throw new Error(
          "Network error: Unable to connect to server. Please check if the backend is running."
        );
      }

      if (response.status === 404) {
        throw new Error(
          "API endpoint not found. Please check the server configuration."
        );
      }

      throw new Error(
        "Server error: Received HTML instead of JSON. Please check if the Django server is running on http://localhost:8000"
      );
    }

    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error("JSON parse error:", error);
      throw new Error("Invalid JSON response from server");
    }

    if (!response.ok) {
      // Handle different error status codes
      switch (response.status) {
        case 401:
          // Unauthorized - clear tokens and redirect to login
          this.removeAuthToken();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          throw new Error(data.message || "Authentication failed");
        case 403:
          throw new Error(data.message || "Access denied");
        case 404:
          throw new Error(data.message || "Resource not found");
        case 422:
          throw new Error(data.message || "Validation error");
        case 500:
          throw new Error(data.message || "Server error");
        default:
          throw new Error(data.message || "An error occurred");
      }
    }

    return data;
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(options.includeAuth !== false),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Authentication methods
  async login(email, password) {
    const data = await this.request("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      includeAuth: false,
    });

    if (data.status === "success") {
      this.setAuthToken(data.data.access);
      if (typeof window !== "undefined") {
        localStorage.setItem("refresh_token", data.data.refresh);
      }
    }

    return data;
  }

  async register(userData) {
    return await this.request("/auth/register/", {
      method: "POST",
      body: JSON.stringify(userData),
      includeAuth: false,
    });
  }

  async logout() {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await this.request("/auth/logout/", {
          method: "POST",
          body: JSON.stringify({ refresh: refreshToken }),
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      this.removeAuthToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  }

  // User profile methods
  async getUserProfile() {
    return await this.request("/auth/profile/");
  }

  async updateUserProfile(profileData) {
    return await this.request("/auth/profile/", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  // Property methods
  async getProperties(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/properties/${queryString ? `?${queryString}` : ""}`;
    return await this.request(endpoint);
  }

  async getProperty(id) {
    return await this.request(`/properties/${id}/`);
  }

  // Buyer methods
  async getBuyerProfile() {
    return await this.request("/buyer/profile/");
  }

  async updateBuyerProfile(profileData) {
    return await this.request("/buyer/profile/", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  // Seller methods
  async getSellerProfile() {
    return await this.request("/seller/profile/");
  }

  async updateSellerProfile(profileData) {
    return await this.request("/seller/profile/", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getAuthToken();
  }

  // Get user type
  getUserType() {
    if (typeof window !== "undefined") {
      // You might want to store user type in localStorage or get it from profile
      return localStorage.getItem("user_type");
    }
    return null;
  }
}

// Create and export a single instance
const apiService = new ApiService();
export default apiService;
