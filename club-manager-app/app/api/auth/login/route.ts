import { NextRequest, NextResponse } from "next/server";
import { buildAuthUrl } from "@/lib/config";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email y contraseña son requeridos" },
                { status: 400 }
            );
        }

        const backendUrl = buildAuthUrl("LOGIN");

        const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        // Verificar si la respuesta tiene contenido antes de parsear
        const responseText = await response.text();
        const data = responseText ? JSON.parse(responseText) : {};

        if (!response.ok) {
            return NextResponse.json(
                {
                    message: data.message ||
                        (response.status === 401 ? "Credenciales inválidas" : "Error al autenticar")
                },
                { status: response.status }
            );
        }

        // Verificar estructura de la respuesta
        if (!data.accessToken || !data.refreshToken || !data.user) {
            console.error("Respuesta del backend incompleta:", data);
            return NextResponse.json(
                { message: "Respuesta del servidor incompleta" },
                { status: 502 }
            );
        }

        // Mapear nombres de campos para mantener consistencia con el frontend
        const frontendResponse = {
            token: data.accessToken,  // Asegurar compatibilidad con lo que espera el frontend
            refreshToken: data.refreshToken,
            user: data.user
        };

        return NextResponse.json(frontendResponse);

    } catch (error) {
        console.error("Error en login API route:", error);
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}