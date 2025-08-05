import { NextRequest, NextResponse } from "next/server";

// Mock user data - en producción esto vendría de la base de datos
const mockUsers = [
    {
        id: "1",
        name: "Admin User",
        email: "admin@club.com",
        password: "admin123",
        role: "admin",
        clubId: "club-1",
    },
    {
        id: "2",
        name: "Juan Pérez",
        email: "juan@club.com",
        password: "user123",
        role: "user",
        clubId: "club-1",
    },
];

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

        // En producción, aquí validarías el JWT token real
        // Por ahora, simulamos la validación del token mock
        const tokenParts = token.split("-");
        if (tokenParts.length < 4 || !tokenParts[0].startsWith("mock-jwt-token")) {
            return NextResponse.json(
                { message: "Token inválido" },
                { status: 401 }
            );
        }

        const userId = tokenParts[2]; // Obtener el ID del usuario del token

        // Buscar el usuario
        const user = mockUsers.find((u) => u.id === userId);

        if (!user) {
            return NextResponse.json(
                { message: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        // Retornar datos del usuario (sin la contraseña)
        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            clubId: user.clubId,
        });
    } catch (error) {
        console.error("Auth check error:", error);
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
} 