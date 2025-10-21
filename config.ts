export const API_BASE_URL = "http://localhost:5000";
export const API_LOGIN_URL = `${API_BASE_URL}/login`;

export const LOCAL_STORAGE_KEYS = {
  TOKEN: "token",
  USER_DATA: "user_data",
};

export const TOAST_MESSAGES = {
  LOGIN_FAILED: "Login failed. Please try again.",
  LOGOUT_SUCCESS: "Successfully logged out.",
  LOGIN_REQUIRED: "Please login to access app.",
};

export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
};

export const PROTECTED_APP_ROUTES = [APP_ROUTES.HOME];
