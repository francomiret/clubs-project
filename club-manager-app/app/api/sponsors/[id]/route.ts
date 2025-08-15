import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_CONFIG } from '@/lib/config';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json(
                { message: 'Token de autorización requerido' },
                { status: 401 }
            );
        }

        const response = await fetch(`${BACKEND_CONFIG.BASE_URL}/sponsors/${params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || 'Error al obtener sponsor' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching sponsor:', error);
        return NextResponse.json(
            { message: 'Error de conexión con el servidor' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json(
                { message: 'Token de autorización requerido' },
                { status: 401 }
            );
        }

        const body = await request.json();

        const response = await fetch(`${BACKEND_CONFIG.BASE_URL}/sponsors/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || 'Error al actualizar sponsor' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error updating sponsor:', error);
        return NextResponse.json(
            { message: 'Error de conexión con el servidor' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json(
                { message: 'Token de autorización requerido' },
                { status: 401 }
            );
        }

        const response = await fetch(`${BACKEND_CONFIG.BASE_URL}/sponsors/${params.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || 'Error al eliminar sponsor' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error deleting sponsor:', error);
        return NextResponse.json(
            { message: 'Error de conexión con el servidor' },
            { status: 500 }
        );
    }
} 