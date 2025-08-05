import { NextRequest, NextResponse } from "next/server";

// Mock user data - en producción esto vendría de la base de datos
let mockUsers = [
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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        // Validar campos requeridos
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Nombre, email y contraseña son requeridos" },
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

        // Verificar si el email ya existe
        const existingUser = mockUsers.find((u) => u.email === email);
        if (existingUser) {
            return NextResponse.json(
                { message: "El email ya está registrado" },
                { status: 409 }
            );
        }

        // Crear nuevo usuario
        const newUser = {
            id: (mockUsers.length + 1).toString(),
            name,
            email,
            password, // En producción esto estaría hasheado
            role: "user", // Por defecto es usuario normal
            clubId: "club-1", // Asignar al club principal
        };

        // Agregar a la lista (en producción esto se guardaría en la base de datos)
        mockUsers.push(newUser);

        // En producción, aquí generarías un JWT token real
        const token = `mock-jwt-token-${newUser.id}-${Date.now()}`;

        // Retornar respuesta exitosa
        return NextResponse.json({
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                clubId: newUser.clubId,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
} 