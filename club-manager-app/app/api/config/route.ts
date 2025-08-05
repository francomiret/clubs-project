import { NextRequest, NextResponse } from "next/server";
import { buildApiUrl } from "@/lib/config";

export async function GET(request: NextRequest) {
    try {
        // Configuración del sistema
        const config = {
            defaultClubId: "club-example-id",
            defaultRoleId: "c8376e07-d335-4b0f-a3e2-70a6c6dcf575", // MEMBER role
            roles: {
                admin: "07ca500a-1ba4-4cd9-87d2-53e18db78b8a",
                manager: "dccdd76e-cdc4-4508-b3cb-0397a2c2ce5e",
                member: "c8376e07-d335-4b0f-a3e2-70a6c6dcf575"
            }
        };

        return NextResponse.json(config);
    } catch (error) {
        console.error("Config error:", error);
        return NextResponse.json(
            { message: "Error al obtener la configuración" },
            { status: 500 }
        );
    }
} 