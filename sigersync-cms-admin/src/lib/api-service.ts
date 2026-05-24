"use client";

import { API_BASE_URL, API_ENDPOINTS, DEFAULT_FETCH_OPTIONS } from './api';
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
   * CATEGORIES API
   */
  static async getCategories(): Promise<Category[]> {
    return this.request<Category[]>(API_ENDPOINTS.CATEGORIES);
  }

  static async createCategory(data: CreateCategoryForm): Promise<Category> {
    return this.request<Category>(API_ENDPOINTS.CATEGORIES, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateCategory(id: string, data: UpdateCategoryForm): Promise<Category> {
    return this.request<Category>(`${API_ENDPOINTS.CATEGORIES}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteCategory(id: string): Promise<void> {
    return this.request<void>(`${API_ENDPOINTS.CATEGORIES}/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * DESTINATIONS API
   */
  static async getDestinations(params?: Record<string, string | number | boolean>): Promise<Destination[]> {
    const queryString = params ? `?${new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)]))}` : '';
    return this.request<Destination[]>(`${API_ENDPOINTS.DESTINATIONS}${queryString}`);
  }

  static async createDestination(data: CreateDestinationForm): Promise<Destination> {
    return this.request<Destination>(API_ENDPOINTS.DESTINATIONS, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateDestination(id: string, data: UpdateDestinationForm): Promise<Destination> {
    return this.request<Destination>(`${API_ENDPOINTS.DESTINATIONS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteDestination(id: string): Promise<void> {
    return this.request<void>(`${API_ENDPOINTS.DESTINATIONS}/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * USERS API
   */
  static async getUsers(): Promise<User[]> {
    return this.request<User[]>(API_ENDPOINTS.USERS);
  }

  /**
   * REVIEWS API
   */
  static async getReviews(): Promise<Review[]> {
    return this.request<Review[]>(API_ENDPOINTS.REVIEWS);
  }
}