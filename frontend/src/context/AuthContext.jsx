import React, { useState, useEffect, useCallback } from "react";
import { getToken, setToken, removeToken } from "../utils/storage";
import { login as apiLogin } from "../api/authApi";

import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // you can store user object or just token/email
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // fetchUserData (auto fetch profile using token)
  const fetchUserData = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUserData(null);
      return { success: false, error: "No token present" };
    }

    try {
      setLoading(true);
      const { user: apiUser } = await import("../api/authApi");
      const response = await apiUser();
      const profile = response.data?.message || null;
      setUserData(profile);
      return { success: true, data: profile };
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUserData(null);
      setLoading(false);
      return {
        success: false,
        error: error.response?.data?.message || "User data fetch failed",
      };
    }
  }, []);

  // On initial load, check if token exists and fetch profile
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      if (token) {
        setUser({ token });
        await fetchUserData();
      }
      setLoading(false);
    };

    initializeAuth();
  }, [fetchUserData]);

  // Login handler
  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials);
      console.log(`response from login`, response.data);
      const profile = response.data?.user || response.data?.userExit || null;

      if (response.data?.token) {
        setToken(response.data?.token);
        setUser({ token: response.data.token, ...(profile || {}) });
        if (profile) {
          setUserData(profile);
        } else {
          await fetchUserData();
        }
        return { success: true };
      } else {
        return {
          success: false,
          error:
            response.data?.error || response.data?.message || "Login failed",
          extraDetails: response.data?.extraDetails || [],
        };
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Network/server error",
        extraDetails: error.response?.data?.extraDetails || [],
      };
    }
  };

  // Contact form Handler
  const contact = async (data) => {
    try {
      const { contact: apiContact } = await import("../api/authApi");
      const response = await apiContact(data);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const fallbackError =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Network/server error";
      return {
        success: false,
        error: fallbackError,
        extraDetails: error.response?.data?.extraDetails || [],
      };
    }
  };

  // Service Data  Handler

  const services = async () => {
    try {
      const { service: apiServices } = await import("../api/authApi");
      const response = await apiServices();

      return {
        success: true,
        data: response.data?.message || [],
      };
    } catch (error) {
      const fallbackError =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Network/server error";
      return {
        success: false,
        error: fallbackError,
      };
    }
  };

  // Logout handler
  const logout = () => {
    removeToken();
    setUser(null);
    setUserData(null);
  };

  // Register handler for convenience
  const register = async (data) => {
    try {
      const { register: apiRegister } = await import("../api/authApi");
      const response = await apiRegister(data);

      if (response.data?.token) {
        setToken(response.data.token);
        setUser({ token: response.data.token, ...(response.data?.user || {}) });
        setUserData(response.data?.user || null);
        return { success: true };
      }
      return {
        success: false,
        error:
          response.data?.error ||
          response.data?.message ||
          "Registration failed",
        extraDetails: response.data?.extraDetails || [],
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Network/server error",
        extraDetails: error.response?.data?.extraDetails || [],
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        login,
        register,
        logout,
        loading,
        fetchUserData,
        contact,
        services,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
