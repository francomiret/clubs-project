import { NextRequest, NextResponse } from "next/server";
import { buildAuthUrl } from "@/lib/config";

export async function GET(request: NextRequest) {
    try {
        // Obtener el token del header Authorization
        const authHeader = request.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { message: "Token de autorización requerido" },
                { status: 401 }
            );
        }

        const token = authHeader.substring(7); // Remover "Bearer "

        // Llamar al backend NestJS para verificar el token
        const response = await fetch(buildAuthUrl("PROFILE"), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Error del backend:", response.status, errorData);
            return NextResponse.json(
                {
                    message: errorData.message || "Error de autenticación",
                    status: response.status
                },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Validar estructura de datos
        if (!data || !data.id || !data.email) {
            console.error("Datos de usuario inválidos del backend:", data);
            return NextResponse.json(
                { message: "Datos de usuario inválidos" },
                { status: 500 }
            );
        }

        // Retornar datos del usuario del backend
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error en verificación de autenticación:", error);
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
} 