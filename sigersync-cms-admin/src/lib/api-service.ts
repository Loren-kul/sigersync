"use client";

import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, API_ENDPOINTS, DEFAULT_FETCH_OPTIONS } from './api';
import { tokenManager } from './token-manager';
// IMPORT SEMUA TIPE YANG DIBUTUHKAN
import { 
  Category, 
  Destination, 
  User, 
  Review, 
  CreateCategoryForm, 
  UpdateCategoryForm,
  CreateDestinationForm,
  UpdateDestinationForm 
} from '../types';
import type { LoginPayload, LoginResponse, RefreshResponse } from '@/types/auth';

// Create axios instance untuk auth (tanpa interceptor)
const authApiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create axios instance untuk general API (dengan interceptor)
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach JWT token ke headers
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = tokenManager.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokenManager.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await authApiClient.post<RefreshResponse>(
          '/auth/refresh',
          { refreshToken }
        );

        const { accessToken } = response.data;
        tokenManager.save(accessToken, refreshToken, tokenManager.getUser());

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        tokenManager.clear();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const config = {
      ...DEFAULT_FETCH_OPTIONS,
      ...options,
    };

    try {
      const response = await fetch(endpoint, config);
      
      if (!response.ok) {
        console.error(`API Error: ${response.status} ${response.statusText}`);
        console.error(`Endpoint: ${endpoint}`);
        console.error(`API Base URL: ${API_BASE_URL}`);
        
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // Jika response bukan JSON, gunakan status text
          errorMessage = response.statusText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * AUTH API
   */
  static async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await authApiClient.post<LoginResponse>('/auth/login', payload);
    return response.data;
  }

  static async refresh(refreshToken: string): Promise<RefreshResponse> {
    const response = await authApiClient.post<RefreshResponse>('/auth/refresh', {
      refreshToken,
    });
    return response.data;
  }

  /**
   * CATEGORIES API
   */
  static async getCategories(): Promise<Category[]> {
    const response = await apiClient.get<Category[]>(API_ENDPOINTS.CATEGORIES);
    return response.data;
  }

  static async createCategory(data: CreateCategoryForm): Promise<Category> {
    const response = await apiClient.post<Category>(API_ENDPOINTS.CATEGORIES, data);
    return response.data;
  }

  static async updateCategory(id: string, data: UpdateCategoryForm): Promise<Category> {
    const response = await apiClient.put<Category>(`${API_ENDPOINTS.CATEGORIES}/${id}`, data);
    return response.data;
  }

  static async deleteCategory(id: string): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.CATEGORIES}/${id}`);
  }

  /**
   * DESTINATIONS API
   */
  static async getDestinations(params?: Record<string, string | number | boolean>): Promise<Destination[]> {
    const response = await apiClient.get<Destination[]>(API_ENDPOINTS.DESTINATIONS, { params });
    return response.data;
  }

  static async createDestination(data: CreateDestinationForm): Promise<Destination> {
    const response = await apiClient.post<Destination>(API_ENDPOINTS.DESTINATIONS, data);
    return response.data;
  }

  static async updateDestination(id: string, data: UpdateDestinationForm): Promise<Destination> {
    const response = await apiClient.put<Destination>(`${API_ENDPOINTS.DESTINATIONS}/${id}`, data);
    return response.data;
  }

  static async deleteDestination(id: string): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.DESTINATIONS}/${id}`);
  }

  /**
   * USERS API
   */
  static async getUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>(API_ENDPOINTS.USERS);
    return response.data;
  }

  /**
   * REVIEWS API
   */
  static async getReviews(): Promise<Review[]> {
    const response = await apiClient.get<Review[]>(API_ENDPOINTS.REVIEWS);
    return response.data;
  }
}