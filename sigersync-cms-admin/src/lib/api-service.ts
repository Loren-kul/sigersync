"use client";

import { API_ENDPOINTS, DEFAULT_FETCH_OPTIONS } from './api';
import { 
  Category, 
  CreateCategoryForm, 
  UpdateCategoryForm 
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
      console.log(`🚀 Fetching to: ${endpoint}`); // Untuk debug di console browser
      const response = await fetch(endpoint, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ API request failed:', error);
      throw error;
    }
  }

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
}