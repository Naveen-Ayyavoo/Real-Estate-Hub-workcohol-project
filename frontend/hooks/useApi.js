import { useState, useCallback } from 'react';
import apiService from '@/lib/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeApiCall = useCallback(async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    executeApiCall,
    clearError,
  };
};

// Specific hooks for common operations
export const useAuth = () => {
  const { loading, error, executeApiCall, clearError } = useApi();

  const login = useCallback(async (email, password) => {
    return await executeApiCall(apiService.login.bind(apiService), email, password);
  }, [executeApiCall]);

  const register = useCallback(async (userData) => {
    return await executeApiCall(apiService.register.bind(apiService), userData);
  }, [executeApiCall]);

  const logout = useCallback(async () => {
    return await executeApiCall(apiService.logout.bind(apiService));
  }, [executeApiCall]);

  return {
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };
};

export const useProfile = () => {
  const { loading, error, executeApiCall, clearError } = useApi();

  const getProfile = useCallback(async () => {
    return await executeApiCall(apiService.getUserProfile.bind(apiService));
  }, [executeApiCall]);

  const updateProfile = useCallback(async (profileData) => {
    return await executeApiCall(apiService.updateUserProfile.bind(apiService), profileData);
  }, [executeApiCall]);

  return {
    loading,
    error,
    getProfile,
    updateProfile,
    clearError,
  };
};

export const useProperties = () => {
  const { loading, error, executeApiCall, clearError } = useApi();

  const getProperties = useCallback(async (params = {}) => {
    return await executeApiCall(apiService.getProperties.bind(apiService), params);
  }, [executeApiCall]);

  const getProperty = useCallback(async (id) => {
    return await executeApiCall(apiService.getProperty.bind(apiService), id);
  }, [executeApiCall]);

  return {
    loading,
    error,
    getProperties,
    getProperty,
    clearError,
  };
}; 