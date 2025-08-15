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
        console.log("Intentando conectar a:", backendUrl);

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
        console.log("Respuesta del backend:", responseText.substring(0, 200) + "...");
        console.log("Status del backend:", response.status);
        console.log("Headers del backend:", Object.fromEntries(response.headers.entries()));

        // Verificar si la respuesta es HTML en lugar de JSON
        if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
            console.error("El backend está devolviendo HTML en lugar de JSON. URL:", backendUrl);
            return NextResponse.json(
                {
                    message: "Error de configuración del servidor. El backend no está respondiendo correctamente.",
                    details: "Se recibió HTML en lugar de JSON"
                },
                { status: 502 }
            );
        }

        let data;
        try {
            data = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
            console.error("Error al parsear JSON del backend:", parseError);
            console.error("Respuesta recibida:", responseText);
            return NextResponse.json(
                {
                    message: "Error al procesar la respuesta del servidor",
                    details: "La respuesta no es un JSON válido"
                },
                { status: 502 }
            );
        }

        if (!response.ok) {
            return NextResponse.json(
                {
                    message: data.message ||
                        (response.status === 401 ? "Credenciales inválidas" : "Error al autenticar")
                },
                { status: response.status }
            );
        }

        // El backend devuelve { success: true, data: { accessToken, refreshToken, user } }
        const authData = data.data || data;

        // Verificar estructura de la respuesta
        if (!authData.accessToken || !authData.refreshToken || !authData.user) {
            console.error("Respuesta del backend incompleta:", authData);
            return NextResponse.json(
                { message: "Respuesta del servidor incompleta" },
                { status: 502 }
            );
        }

        // Devolver la respuesta del backend directamente
        const frontendResponse = {
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            user: authData.user
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