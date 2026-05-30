/**
 * Type definitions untuk SigerSync CMS
 * Semua interfaces di-define di satu tempat untuk consistency
 */

// ============= AUTH TYPES =============

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RefreshPayload {
  refreshToken: string;
}

// ============= DOMAIN TYPES =============

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
  destinations?: Destination[];
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  categoryId: string;
  category: Category;
  latitude?: number;
  longitude?: number;
  address?: string;
  province: string;
  city?: string;
  ticketPrice?: number;
  operatingHours?: string;
  facilities?: string;
  imageUrl?: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  reviews?: Review[];
  images?: DestinationImage[];
}

export interface DestinationImage {
  id: string;
  destinationId: string;
  destination: Destination;
  imageUrl: string;
  description?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  user: User;
  destinationId: string;
  destination: Destination;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface Bookmark {
  id: string;
  userId: string;
  user: User;
  destinationId: string;
  destination: Destination;
  createdAt: string;
}

export interface Itinerary {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  destinations: string[]; // Array of destination IDs
  createdAt: string;
  updatedAt: string;
}

// ============= FORM TYPES =============

export interface CreateCategoryForm {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface UpdateCategoryForm extends CreateCategoryForm {
  id: string;
}

export interface CreateDestinationForm {
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  categoryId: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  city?: string;
  ticketPrice?: number;
  operatingHours?: string;
  facilities?: string;
  imageUrl?: string;
}

export interface UpdateDestinationForm extends CreateDestinationForm {
  id: string;
}

// ============= API RESPONSE TYPES =============

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    pages: number;
  };
}
