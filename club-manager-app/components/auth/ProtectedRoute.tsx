"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("ProtectedRoute check:", {
      requireAuth,
      isAuthenticated,
      isLoading,
      timestamp: new Date().toISOString(),
    });

    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        console.log("Usuario no autenticado, redirigiendo a:", redirectTo);
        router.push(redirectTo);
      } else if (!requireAuth && isAuthenticated) {
        // If user is authenticated and trying to access auth pages, redirect to dashboard
        console.log("Usuario autenticado, redirigiendo a /home");
        router.push("/home");
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // If authentication check is complete and conditions are met, render children
  if (requireAuth && isAuthenticated) {
    console.log("ProtectedRoute: Usuario autenticado, renderizando contenido");
    return <>{children}</>;
  }

  if (!requireAuth && !isAuthenticated) {
    console.log(
      "ProtectedRoute: Usuario no autenticado, renderizando contenido público"
    );
    return <>{children}</>;
  }

  // Don't render anything while redirecting
  console.log("ProtectedRoute: Redirigiendo, no renderizando contenido");
  return null;
}
