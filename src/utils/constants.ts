// Authentication
export const OTP_LENGTH = 6;
export const OTP_COUNTDOWN_SECONDS = 120;
export const PASSWORD_MIN_LENGTH = 8;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    VERIFY_OTP: '/auth/verify-otp',
    ME: '/auth/me',
    REQUEST_PASSWORD_RESET: '/auth/request-password-reset',
    VERIFY_PASSWORD_RESET_OTP: '/auth/verify-password-reset-otp',
    RESET_PASSWORD: '/auth/reset-password',
  },
} as const;

// Query Keys
export const QUERY_KEYS = {
  TABLE_DATA: 'tableData',
  CURRENT_USER: 'currentUser',
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Form Validation
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
