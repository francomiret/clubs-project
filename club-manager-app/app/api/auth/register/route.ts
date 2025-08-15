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
        console.log("Respuesta del backend:", responseText.substring(0, 200) + "...");
        console.log("Status del backend:", response.status);

        let data;
        try {
            data = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
            console.error("Error al parsear JSON del backend:", parseError);
            return NextResponse.json(
                { message: "Error al procesar la respuesta del servidor" },
                { status: 502 }
            );
        }

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || "Error al registrar usuario" },
                { status: response.status }
            );
        }

        // El backend devuelve { success: true, data: { accessToken, refreshToken, user } }
        const authData = data.data || data;

        // Verificar estructura de la respuesta del backend
        if (!authData.accessToken || !authData.refreshToken || !authData.user) {
            console.error("Respuesta del backend incompleta:", authData);
            return NextResponse.json(
                { message: "Respuesta incompleta del servidor backend" },
                { status: 502 }
            );
        }

        // Devolver la respuesta del backend directamente
        return NextResponse.json({
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            user: authData.user,
        });

    } catch (error) {
        console.error("Error en register API route:", error);
        return NextResponse.json(
            { message: "Error de conexión con el servidor" },
            { status: 500 }
        );
    }
}