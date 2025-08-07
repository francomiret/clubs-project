import { buildAuthUrl } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password, clubName } = body;

        // Validaciones (las que ya tienes están bien)

        const response = await fetch(buildAuthUrl("REGISTER"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, clubName }),
        });

        const responseText = await response.text();
        const data = responseText ? JSON.parse(responseText) : {};

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || "Error al registrar usuario" },
                { status: response.status }
            );
        }

        // Verificar estructura de la respuesta del backend
        if (!data.accessToken || !data.refreshToken || !data.user) {
            return NextResponse.json(
                { message: "Respuesta incompleta del servidor backend" },
                { status: 502 }
            );
        }

        // Mapear los nombres de campos para el frontend
        return NextResponse.json({
            token: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.user,
        });

    } catch (error) {
        return NextResponse.json(
            { message: "Error de conexión con el servidor" },
            { status: 500 }
        );
    }
}