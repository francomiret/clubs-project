import { NextRequest, NextResponse } from "next/server";

// Mock user data - en producción esto vendría de la base de datos
const mockUsers = [
    {
        id: "1",
        name: "Admin User",
        email: "admin@club.com",
        password: "admin123", // En producción esto estaría hasheado
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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validar campos requeridos
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email y contraseña son requeridos" },
                { status: 400 }
            );
        }

        // Buscar usuario
        const user = mockUsers.find(
            (u) => u.email === email && u.password === password
        );

        if (!user) {
            return NextResponse.json(
                { message: "Credenciales inválidas" },
                { status: 401 }
            );
        }

        // En producción, aquí generarías un JWT token real
        const token = `mock-jwt-token-${user.id}-${Date.now()}`;

        // Retornar respuesta exitosa
        return NextResponse.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                clubId: user.clubId,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
} 