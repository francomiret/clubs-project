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

        const data = await response.json();

        if (!response.ok) {
            // Manejar errores del backend
            return NextResponse.json(
                { message: data.message || "Token inválido" },
                { status: response.status }
            );
        }

        // Retornar datos del usuario del backend
        return NextResponse.json(data);
    } catch (error) {
        console.error("Auth check error:", error);
        return NextResponse.json(
            { message: "Error de conexión con el servidor" },
            { status: 500 }
        );
    }
} 