"use client";

import { useState } from "react";
import { LoginForm, LoginData } from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState<string>("");

  const handleLogin = async (data: LoginData) => {
    try {
      setError("");
      await login(data.email, data.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    }
  };

  return (
    <ProtectedRoute requireAuth={false}>
      <LoginForm onSubmit={handleLogin} error={error} />
    </ProtectedRoute>
  );
}
