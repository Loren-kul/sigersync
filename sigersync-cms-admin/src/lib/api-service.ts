import { API_ENDPOINTS, DEFAULT_FETCH_OPTIONS } from './api';

/**
 * ApiService untuk handle semua HTTP requests
 * Menggunakan Fetch API (built-in browser API)
 */
export class ApiService {
  /**
   * Generic method untuk semua request types
   * @param endpoint - URL endpoint
   * @param options - Request options (method, headers, body, dll)
   * @returns Promise dengan response data
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
      
      // Check jika response tidak OK (status 4xx, 5xx)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse JSON response
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * CATEGORIES API
   */
  
  static async getCategories() {
    return this.request(API_ENDPOINTS.CATEGORIES);
  }

  static async createCategory(data: any) {
    return this.request(API_ENDPOINTS.CATEGORIES, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateCategory(id: string, data: any) {
    return this.request(`${API_ENDPOINTS.CATEGORIES}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteCategory(id: string) {
    return this.request(`${API_ENDPOINTS.CATEGORIES}/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * DESTINATIONS API
   */
  
  static async getDestinations(params?: any) {
    // Build query string dari params object
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`${API_ENDPOINTS.DESTINATIONS}${queryString}`);
  }

  static async createDestination(data: any) {
    return this.request(API_ENDPOINTS.DESTINATIONS, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateDestination(id: string, data: any) {
    return this.request(`${API_ENDPOINTS.DESTINATIONS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteDestination(id: string) {
    return this.request(`${API_ENDPOINTS.DESTINATIONS}/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * USERS API
   */
  
  static async getUsers() {
    return this.request(API_ENDPOINTS.USERS);
  }

  static async createUser(data: any) {
    return this.request(API_ENDPOINTS.USERS, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateUser(id: string, data: any) {
    return this.request(`${API_ENDPOINTS.USERS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteUser(id: string) {
    return this.request(`${API_ENDPOINTS.USERS}/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * REVIEWS API
   */
  
  static async getReviews(destinationId?: string) {
    const queryString = destinationId ? `?destinationId=${destinationId}` : '';
    return this.request(`${API_ENDPOINTS.REVIEWS}${queryString}`);
  }

  static async createReview(data: any) {
    return this.request(API_ENDPOINTS.REVIEWS, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateReview(id: string, data: any) {
    return this.request(`${API_ENDPOINTS.REVIEWS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteReview(id: string) {
    return this.request(`${API_ENDPOINTS.REVIEWS}/${id}`, {
      method: 'DELETE',
    });
  }
}
