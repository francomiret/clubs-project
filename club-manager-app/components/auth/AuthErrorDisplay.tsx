"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X, AlertCircle, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthErrorDisplayProps {
  onRetry?: () => void;
  onDismiss?: () => void;
}

export function AuthErrorDisplay({
  onRetry,
  onDismiss,
}: AuthErrorDisplayProps) {
  const { error, clearError } = useAuth();

  if (!error) return null;

  const handleDismiss = () => {
    clearError();
    onDismiss?.();
  };

  const handleRetry = () => {
    clearError();
    onRetry?.();
  };

  const getErrorIcon = () => {
    switch (error.code) {
      case "TOKEN_EXPIRED":
        return <RefreshCw className="h-4 w-4" />;
      case "REFRESH_FAILED":
        return <RefreshCw className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getErrorTitle = () => {
    switch (error.code) {
      case "TOKEN_EXPIRED":
        return "Sesión Expirada";
      case "REFRESH_FAILED":
        return "Error de Renovación";
      case "INVALID_USER_DATA":
        return "Datos Inválidos";
      case "AUTH_CHECK_FAILED":
        return "Error de Verificación";
      default:
        return "Error de Autenticación";
    }
  };

  const getErrorAction = () => {
    switch (error.code) {
      case "TOKEN_EXPIRED":
      case "REFRESH_FAILED":
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            className="ml-2"
          >
            Reintentar
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Alert className="mb-4 border-red-200 bg-red-50">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-2">
          {getErrorIcon()}
          <div className="flex-1">
            <AlertTitle className="text-red-800">{getErrorTitle()}</AlertTitle>
            <AlertDescription className="text-red-700 mt-1">
              {error.message}
            </AlertDescription>
            {getErrorAction()}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="h-6 w-6 p-0 text-red-600 hover:text-red-800 hover:bg-red-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  );
}
