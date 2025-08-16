"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { useAuthError } from "@/hooks/useAuthError";
import { useAuthPersistence } from "@/hooks/useAuthPersistence";
import { useAuthVerification } from "@/hooks/useAuthVerification";
import { checkBackendHealth, logHealthStatus } from "@/lib/health-check";
import { fetchWithAuth } from "@/lib/auth-interceptor";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  clubId?: string;
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    clubName: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshToken: () => Promise<void>;
  error: any;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const { setAuthError, clearError } = useAuthError();
  const {
    user: persistedUser,
    isLoading: persistenceLoading,
    isInitialized,
    saveAuthState,
    clearAuthState,
    updateUser,
    updateTokens,
  } = useAuthPersistence();

  const { verifyAuth } = useAuthVerification();

  const [user, setUser] = useState<User | null>(persistedUser);
  const [isLoading, setIsLoading] = useState(true);

  // Sincronizar el estado local con el persistido
  useEffect(() => {
    if (isInitialized) {
      setUser(persistedUser);
      setIsLoading(false);
    }
  }, [isInitialized, persistedUser]);

  // Función para refrescar el token
  const refreshAuthToken = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to refresh token");
      }

      const data = await response.json();

      if (!data.accessToken || !data.refreshToken) {
        throw new Error("Invalid refresh response");
      }

      // Actualizar tokens en localStorage
      updateTokens(data.accessToken, data.refreshToken);

      // Obtener datos del usuario actualizados
      const userResponse = await fetchWithAuth("/api/auth/me");
      if (userResponse.ok) {
        const userData = await userResponse.json();
        if (userData && userData.id && userData.email) {
          updateUser(userData);
          setUser(userData);
          return userData;
        } else {
          throw new Error("Invalid user data after refresh");
        }
      } else {
        throw new Error("Failed to get user data after refresh");
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw error;
    }
  }, [updateTokens, updateUser]);

  // Función para verificar la autenticación
  const checkAuth = useCallback(async (): Promise<boolean> => {
    if (!persistedUser) {
      return false;
    }

    try {
      const healthResult = await checkBackendHealth();
      logHealthStatus(healthResult);

      if (!healthResult.isHealthy) {
        setAuthError(
          `Backend no disponible: ${healthResult.error || "Error de conexión"}`,
          "BACKEND_UNREACHABLE"
        );
        return false;
      }

      // Verificar si el token actual es válido
      const response = await fetchWithAuth("/api/auth/me");

      if (response.ok) {
        const userData = await response.json();
        if (userData && userData.id && userData.email) {
          // Solo actualizar si los datos son diferentes
          if (JSON.stringify(userData) !== JSON.stringify(persistedUser)) {
            updateUser(userData);
            setUser(userData);
          }
          return true;
        } else {
          throw new Error("Datos de usuario inválidos");
        }
      } else if (response.status === 401) {
        // Token expirado, intentar refresh
        await refreshAuthToken();
        return true;
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error en verificación de autenticación:", error);
      if (error instanceof Error && error.message.includes("No auth token")) {
        // No hay token, limpiar estado
        clearAuthState();
        setUser(null);
      } else {
        setAuthError(
          "Error de verificación de autenticación",
          "AUTH_CHECK_FAILED"
        );
      }
      return false;
    }
  }, [
    persistedUser,
    refreshAuthToken,
    setAuthError,
    updateUser,
    clearAuthState,
  ]);

  // Solo verificar autenticación una vez al inicializar si hay usuario persistido
  useEffect(() => {
    if (isInitialized && persistedUser && !persistenceLoading) {
      // Usar el hook de verificación para evitar verificaciones simultáneas
      verifyAuth(checkAuth, undefined, (error) => {
        console.error("Initial auth verification failed:", error);
      });
    }
  }, [isInitialized, persistedUser, persistenceLoading, verifyAuth, checkAuth]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      clearError();

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        const errorMsg =
          data.message ||
          (response.status === 401
            ? "Credenciales inválidas"
            : `Error ${response.status}: ${response.statusText}`);
        throw new Error(errorMsg);
      }

      if (!data.accessToken || !data.user) {
        console.error("Datos faltantes en la respuesta:", data);
        throw new Error(
          "La respuesta del servidor no contiene los datos esperados"
        );
      }

      // Guardar estado en localStorage
      saveAuthState(data.user, data.accessToken, data.refreshToken);
      setUser(data.user);
      router.push("/home");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    clubName: string
  ) => {
    try {
      setIsLoading(true);
      clearError();

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, clubName }),
      });

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar usuario");
      }

      if (!data.accessToken || !data.refreshToken || !data.user) {
        console.error("Respuesta incompleta del servidor:", data);
        throw new Error("Respuesta del servidor incompleta");
      }

      // Guardar estado en localStorage
      saveAuthState(data.user, data.accessToken, data.refreshToken);
      setUser(data.user);
      router.push("/home");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    // Limpiar estado
    clearAuthState();
    setUser(null);
    clearError();

    // Redirect to login
    router.push("/login");
  }, [router, clearError, clearAuthState]);

  const value: AuthContextType = {
    user,
    isLoading: isLoading || persistenceLoading,
    isInitialized,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    refreshToken: refreshAuthToken,
    error: null,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
