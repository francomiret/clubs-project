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
        console.log("AuthContext - Checking auth, token exists:", !!token);

        if (token) {
          // Validate token with backend
          const response = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            console.log("AuthContext - Token valid, user data:", userData);
            setUser(userData);
          } else {
            console.log("AuthContext - Token invalid, trying refresh");
            // Token is invalid, try to refresh
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
              try {
                await refreshAuthToken();
              } catch (error) {
                console.log("AuthContext - Refresh failed, clearing tokens");
                // Refresh failed, remove tokens
                localStorage.removeItem("authToken");
                localStorage.removeItem("refreshToken");
              }
            } else {
              localStorage.removeItem("authToken");
            }
          }
        } else {
          console.log("AuthContext - No token found");
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

    console.log("AuthContext - Refreshing token");

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
    console.log("AuthContext - Token refreshed successfully ");

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
      console.log("AuthContext - User data after refresh:", userData);
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

      console.log("AuthContext - Login response data:", data);

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar usuario");
      }

      const data = await response.json();

      // Store tokens
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      // Set user data
      setUser(data.user);

      // Redirect to dashboard
      router.push("/home");
    } catch (error) {
      console.error("Registration failed:", error);
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

  // Debug logging
  console.log("AuthContext state:", {
    user,
    isLoading,
    isAuthenticated: !!user,
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
