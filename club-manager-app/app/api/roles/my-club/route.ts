import { NextRequest, NextResponse } from "next/server";
import { buildApiUrl } from "@/lib/config";

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

        // Llamar al backend NestJS para obtener roles del club del usuario
        const response = await fetch(buildApiUrl("ROLES") + "/my-club", {
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
                    message: errorData.message || "Error al obtener roles del club",
                    status: response.status
                },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Retornar datos del backend
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error al obtener roles del club:", error);
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
