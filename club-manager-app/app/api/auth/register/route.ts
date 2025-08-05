import { NextRequest, NextResponse } from "next/server";
import { buildAuthUrl, SYSTEM_CONFIG } from "@/lib/config";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password, clubName } = body;

        // Validar campos requeridos
        if (!name || !email || !password || !clubName) {
            return NextResponse.json(
                { message: "Nombre, email, contraseña y nombre del club son requeridos" },
                { status: 400 }
            );
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Formato de email inválido" },
                { status: 400 }
            );
        }

        // Validar longitud de contraseña
        if (password.length < 6) {
            return NextResponse.json(
                { message: "La contraseña debe tener al menos 6 caracteres" },
                { status: 400 }
            );
        }

        // Llamar al backend NestJS
        const response = await fetch(buildAuthUrl("REGISTER"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                clubName,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Manejar errores del backend
            return NextResponse.json(
                { message: data.message || "Error al registrar usuario" },
                { status: response.status }
            );
        }

        // Retornar respuesta exitosa del backend
        return NextResponse.json({
            token: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.user,
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "Error de conexión con el servidor" },
            { status: 500 }
        );
    }
} 