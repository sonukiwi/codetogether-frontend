"use client";

import axios from "axios";
import { API_BASE_URL, APP_ROUTES, LOCAL_STORAGE_KEYS } from "../../config";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Request Interceptor: attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response Interceptor: handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      location.href = `${APP_ROUTES.LOGIN}?unauthorized=true`;
    }
    return Promise.reject(error);
  }
);

export default api;
