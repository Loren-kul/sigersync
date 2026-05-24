// API Base URL - bisa dari environment variable
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// API Endpoints - centralized untuk mudah di-maintain
export const API_ENDPOINTS = {
  CATEGORIES: `${API_BASE_URL}/api/categories`,
  DESTINATIONS: `${API_BASE_URL}/api/destinations`,
  USERS: `${API_BASE_URL}/api/users`,
  REVIEWS: `${API_BASE_URL}/api/reviews`,
};

// HTTP Methods constant
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

// Default fetch options untuk semua requests
export const DEFAULT_FETCH_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};
