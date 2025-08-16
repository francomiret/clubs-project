import { useEffect, useState, useCallback } from 'react';

interface AuthState {
  user: any;
  isLoading: boolean;
  isInitialized: boolean;
}

export function useAuthPersistence() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isInitialized: false,
  });

  // Función para cargar el estado inicial desde localStorage
  const loadInitialState = useCallback(() => {
    try {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");
      
      if (token && userData) {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          isLoading: false,
          isInitialized: true,
        });
        return { user, token };
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isInitialized: true,
        });
        return { user: null, token: null };
      }
    } catch (error) {
      console.error("Error loading initial auth state:", error);
      // Limpiar datos corruptos
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");
      
      setAuthState({
        user: null,
        isLoading: false,
        isInitialized: true,
      });
      return { user: null, token: null };
    }
  }, []);

  // Función para guardar el estado en localStorage
  const saveAuthState = useCallback((user: any, token: string, refreshToken: string) => {
    try {
      localStorage.setItem("authToken", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userData", JSON.stringify(user));
      
      // Actualizar el estado local solo si es diferente
      setAuthState(prev => {
        if (JSON.stringify(prev.user) !== JSON.stringify(user)) {
          return { ...prev, user };
        }
        return prev;
      });
    } catch (error) {
      console.error("Error saving auth state:", error);
    }
  }, []);

  // Función para limpiar el estado
  const clearAuthState = useCallback(() => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");
      
      setAuthState(prev => ({
        ...prev,
        user: null,
      }));
    } catch (error) {
      console.error("Error clearing auth state:", error);
    }
  }, []);

  // Función para actualizar solo el usuario
  const updateUser = useCallback((user: any) => {
    try {
      localStorage.setItem("userData", JSON.stringify(user));
      
      // Solo actualizar si los datos son diferentes
      setAuthState(prev => {
        if (JSON.stringify(prev.user) !== JSON.stringify(user)) {
          return { ...prev, user };
        }
        return prev;
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  }, []);

  // Función para actualizar solo los tokens
  const updateTokens = useCallback((token: string, refreshToken: string) => {
    try {
      localStorage.setItem("authToken", token);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.error("Error updating tokens:", error);
    }
  }, []);

  // Cargar estado inicial al montar el hook
  useEffect(() => {
    loadInitialState();
  }, [loadInitialState]);

  return {
    ...authState,
    loadInitialState,
    saveAuthState,
    clearAuthState,
    updateUser,
    updateTokens,
  };
}
