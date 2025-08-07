"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for token in localStorage
        const token = localStorage.getItem("authToken");

        if (token) {
          // Validate token with backend
          const response = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Token is invalid, try to refresh
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
              try {
                await refreshAuthToken();
              } catch (error) {
                // Refresh failed, remove tokens
                localStorage.removeItem("authToken");
                localStorage.removeItem("refreshToken");
              }
            } else {
              localStorage.removeItem("authToken");
            }
          }
        } else {
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
      } finally {
        setIsLoading(false);
      }
    };

    // Only check auth if no user is already set
    if (!user) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const refreshAuthToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();

    localStorage.setItem("authToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    // After successful refresh, get user data
    const userResponse = await fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    if (userResponse.ok) {
      const userData = await userResponse.json();
      setUser(userData);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Verificar si la respuesta tiene cuerpo antes de hacer .json()
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        // Mejorar el mensaje de error
        const errorMsg =
          data.message ||
          (response.status === 401
            ? "Credenciales inválidas"
            : `Error ${response.status}: ${response.statusText}`);
        throw new Error(errorMsg);
      }

      if (!data.token || !data.user) {
        console.error("Datos faltantes en la respuesta:", data);
        throw new Error(
          "La respuesta del servidor no contiene los datos esperados"
        );
      }

      // Store tokens
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      setUser(data.user);
      router.push("/home");
    } catch (error) {
      console.error("Login failed:", error);
      // Limpiar tokens en caso de error
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
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

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, clubName }),
      });

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};

      console.log("Register response:", data); // Para depuración

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar usuario");
      }

      // Verificar que la respuesta tenga la estructura correcta
      if (!data.token || !data.refreshToken || !data.user) {
        console.error("Respuesta incompleta del servidor:", data);
        throw new Error("Respuesta del servidor incompleta");
      }

      // Store tokens
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      // Set user data
      setUser(data.user);

      // Redirect to dashboard
      router.push("/home");
    } catch (error) {
      console.error("Registration failed:", error);
      // Limpiar tokens en caso de error
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Remove tokens
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");

    // Clear user data
    setUser(null);

    // Redirect to login
    router.push("/login");
  };

  const refreshToken = async () => {
    await refreshAuthToken();
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    refreshToken,
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
