'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { tokenManager, isTokenExpired } from './token-manager';
import { ApiService } from './api-service';
import type { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    tokenManager.clear();
    setUser(null);
    setAccessToken(null);
  }, []);

  const refreshAccessToken = useCallback(async () => {
    try {
      const refreshToken = tokenManager.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await ApiService.refresh(refreshToken);
      const storedUser = tokenManager.getUser();
      
      tokenManager.save(response.accessToken, refreshToken, storedUser);
      setAccessToken(response.accessToken);
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      throw error;
    }
  }, [logout]);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      if (typeof window !== 'undefined') {
        const storedUser = tokenManager.getUser();
        const storedAccessToken = tokenManager.getAccessToken();
        
        if (storedUser && storedAccessToken && !isTokenExpired(storedAccessToken)) {
          setUser(storedUser);
          setAccessToken(storedAccessToken);
        } else if (storedAccessToken && isTokenExpired(storedAccessToken)) {
          // Token expired, try to refresh
          try {
            await refreshAccessToken();
          } catch {
            logout();
          }
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [refreshAccessToken, logout]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await ApiService.login({ email, password });
      
      tokenManager.save(response.accessToken, response.refreshToken, response.user);
      setUser(response.user);
      setAccessToken(response.accessToken);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        isAuthenticated: !!accessToken,
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
