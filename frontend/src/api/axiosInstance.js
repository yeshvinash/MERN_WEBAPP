import axios from "axios";
import { getToken } from "../utils/storage";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend API
  timeout: 5000,
});

// Request Interceptor - Auto attach token
api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle Unauthorized
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Example: redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
