import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_CONFIG } from '@/lib/config';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json(
                { message: 'Token de autorización requerido' },
                { status: 401 }
            );
        }

        const response = await fetch(`${BACKEND_CONFIG.BASE_URL}/roles`, {
            method: 'GET',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || 'Error al obtener roles' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching roles:', error);
        return NextResponse.json(
            { message: 'Error de conexión con el servidor' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json(
                { message: 'Token de autorización requerido' },
                { status: 401 }
            );
        }

        const body = await request.json();

        const response = await fetch(`${BACKEND_CONFIG.BASE_URL}/roles`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || 'Error al crear rol' },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Error creating role:', error);
        return NextResponse.json(
            { message: 'Error de conexión con el servidor' },
            { status: 500 }
        );
    }
} 