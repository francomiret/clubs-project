// Interceptor para manejar automáticamente el refresh de tokens
class AuthInterceptor {
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    this.failedQueue = [];
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to refresh token");
      }

      const data = await response.json();

      if (!data.accessToken || !data.refreshToken) {
        throw new Error("Invalid refresh response");
      }

      localStorage.setItem("authToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      return data.accessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Limpiar tokens fallidos
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      throw error;
    }
  }

  async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    let token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token available");
    }

    // Agregar el token a los headers
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(url, { ...options, headers });

      // Si el token expiró, intentar refresh
      if (response.status === 401 && !this.isRefreshing) {
        this.isRefreshing = true;

        try {
          const newToken = await this.refreshToken();
          this.processQueue(null, newToken);

          // Reintentar la petición original con el nuevo token
          const newHeaders = {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          };
          return fetch(url, { ...options, headers: newHeaders });
        } catch (error) {
          this.processQueue(error, null);
          throw error;
        } finally {
          this.isRefreshing = false;
        }
      } else if (response.status === 401 && this.isRefreshing) {
        // Si ya se está refrescando, agregar a la cola
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          const newHeaders = {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          };
          return fetch(url, { ...options, headers: newHeaders });
        });
      }

      return response;
    } catch (error) {
      throw error;
    }
  }
}

// Instancia global del interceptor
export const authInterceptor = new AuthInterceptor();

// Función helper para usar el interceptor
export const fetchWithAuth = (url: string, options: RequestInit = {}) => {
  return authInterceptor.fetchWithAuth(url, options);
};
