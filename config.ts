export const API_BASE_URL = "http://localhost:5000";
export const API_LOGIN_URL = `${API_BASE_URL}/login`;
export const API_TO_CHECK_TOKEN_VALIDITY = `${API_BASE_URL}/is-token-valid`;
export const API_CREATE_ROOM = `${API_BASE_URL}/create-room`;
export const API_TO_GET_ROOM_METADATA = `${API_BASE_URL}/room-metadata`;

export const LOCAL_STORAGE_KEYS = {
  TOKEN: "token",
  USER_DATA: "user_data",
};

export const TOAST_MESSAGES = {
  LOGIN_FAILED: "Login failed. Please try again.",
  LOGOUT_SUCCESS: "Successfully logged out.",
  LOGIN_REQUIRED: "Please login to access app.",
  INVALID_SESSION: "Invalid session. Please login again.",
  CREATE_ROOM_FAILED: "Failed to create room. Please try again.",
  JOIN_ROOM_FAILED: "Failed to join room. Please try again.",
  ROOM_DOES_NOT_EXIST: "Room does not exist.",
  PRIVATE_ROOMS_NOT_SUPPORTED: "Private rooms are not supported yet.",
};

export const APP_ROUTES = {
  LOGIN: "/login",
  HOME: "/",
  EDITOR: "/editor",
};

export const PROTECTED_APP_ROUTES = [APP_ROUTES.HOME, APP_ROUTES.EDITOR];
