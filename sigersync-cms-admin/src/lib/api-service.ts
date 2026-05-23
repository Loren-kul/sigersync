import { API_ENDPOINTS, DEFAULT_FETCH_OPTIONS } from './api';
// Import tipe data dari file types Anda
import { 
  Category, 
  Destination, 
  User, 
  Review, 
  CreateCategoryForm, 
  UpdateCategoryForm 
} from '../types';

export class ApiService {
  /**
   * Generic method untuk semua request types
   */
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = endpoint;
    const config = {
      ...DEFAULT_FETCH_OPTIONS,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
    // Kita beri tahu request bahwa kembaliannya adalah Category[]
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
  
  static async getDestinations(params?: any): Promise<Destination[]> {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request<Destination[]>(`${API_ENDPOINTS.DESTINATIONS}${queryString}`);
  }

  static async createDestination(data: any): Promise<Destination> {
    return this.request<Destination>(API_ENDPOINTS.DESTINATIONS, {
      method: 'POST',
      body: JSON.stringify(data),
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
  
  static async getReviews(destinationId?: string): Promise<Review[]> {
    const queryString = destinationId ? `?destinationId=${destinationId}` : '';
    return this.request<Review[]>(`${API_ENDPOINTS.REVIEWS}${queryString}`);
  }
}