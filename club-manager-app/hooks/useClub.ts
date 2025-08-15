import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Club, UpdateClubData } from '@/components/creative/types';

export function useClub() {
    const [club, setClub] = useState<Club | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchClub = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            // Obtener el club del usuario autenticado
            const clubId = user?.clubId;
            if (!clubId) {
                throw new Error('No se encontró el ID del club');
            }

            const response = await fetch(`/api/clubs/${clubId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener club');
            }

            const data = await response.json();

            // El backend devuelve { success: true, data: {...} }
            if (data.success && data.data) {
                setClub(data.data);
            } else {
                setClub(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error fetching club:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateClub = async (clubData: UpdateClubData): Promise<Club> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const clubId = user?.clubId;
            if (!clubId) {
                throw new Error('No se encontró el ID del club');
            }

            // Convertir foundationDate de string a Date si está presente
            const dataToSend = {
                ...clubData,
                foundationDate: clubData.foundationDate ? new Date(clubData.foundationDate) : undefined,
            };

            const response = await fetch(`/api/clubs/${clubId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar club');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const updatedClub = responseData.success && responseData.data ? responseData.data : responseData;
            setClub(updatedClub);
            return updatedClub;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error updating club:', err);
            throw new Error(errorMessage);
        }
    };

    useEffect(() => {
        if (user && user.id && user.clubId) {
            fetchClub();
        } else {
            setLoading(false);
        }
    }, [user]);

    return {
        club,
        loading,
        error,
        fetchClub,
        updateClub,
    };
} 