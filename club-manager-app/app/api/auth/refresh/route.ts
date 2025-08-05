import { NextRequest, NextResponse } from "next/server";
import { buildAuthUrl } from "@/lib/config";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { refreshToken } = body;

        // Validar que se proporcione el refresh token
        if (!refreshToken) {
            return NextResponse.json(
                { message: "Refresh token es requerido" },
                { status: 400 }
            );
        }

        // Llamar al backend NestJS para renovar el token
        const response = await fetch(buildAuthUrl("REFRESH"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Manejar errores del backend
            return NextResponse.json(
                { message: data.message || "Error al renovar el token" },
                { status: response.status }
            );
        }

        // Retornar respuesta exitosa del backend
        return NextResponse.json({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expiresIn: data.expiresIn,
        });
    } catch (error) {
        console.error("Refresh token error:", error);
        return NextResponse.json(
            { message: "Error de conexión con el servidor" },
            { status: 500 }
        );
    }
} 