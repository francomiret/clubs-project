"use client";

import { useState } from "react";
import { RegisterForm, RegisterData } from "@/components/auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function RegisterPage() {
  const { register } = useAuth();
  const [error, setError] = useState<string>("");

  const handleRegister = async (data: RegisterData) => {
    const { name, email, password, clubName } = data;
    try {
      setError("");
      await register(name, email, password, clubName);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al registrar usuario"
      );
    }
  };

  return (
    <ProtectedRoute requireAuth={false}>
      <RegisterForm onSubmit={handleRegister} error={error} />
    </ProtectedRoute>
  );
}
