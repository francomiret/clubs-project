import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Sponsor, CreateSponsorData, UpdateSponsorData } from '@/components/creative/types';

export function useSponsors() {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchSponsors = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/sponsors', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener sponsors');
            }

            const data = await response.json();

            // El backend devuelve { success: true, data: [...] }
            if (data.success && data.data) {
                setSponsors(data.data);
            } else {
                setSponsors(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error fetching sponsors:', err);
        } finally {
            setLoading(false);
        }
    };

    const createSponsor = async (sponsorData: CreateSponsorData): Promise<Sponsor> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            // Si no se proporciona clubId, usar el club del usuario autenticado
            const dataToSend = {
                ...sponsorData,
                clubId: sponsorData.clubId || user?.clubId,
            };

            const response = await fetch('/api/sponsors', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear sponsor');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const newSponsor = responseData.success && responseData.data ? responseData.data : responseData;
            setSponsors(prev => [...prev, newSponsor]);
            return newSponsor;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error creating sponsor:', err);
            throw new Error(errorMessage);
        }
    };

    const updateSponsor = async (id: string, sponsorData: UpdateSponsorData): Promise<Sponsor> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/sponsors/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sponsorData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar sponsor');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const updatedSponsor = responseData.success && responseData.data ? responseData.data : responseData;
            setSponsors(prev => prev.map(sponsor =>
                sponsor.id === id ? updatedSponsor : sponsor
            ));
            return updatedSponsor;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error updating sponsor:', err);
            throw new Error(errorMessage);
        }
    };

    const deleteSponsor = async (id: string): Promise<void> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/sponsors/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar sponsor');
            }

            setSponsors(prev => prev.filter(sponsor => sponsor.id !== id));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error deleting sponsor:', err);
            throw new Error(errorMessage);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchSponsors();
        } else {
            setLoading(false);
        }
    }, [user]);

    return {
        sponsors,
        loading,
        error,
        fetchSponsors,
        createSponsor,
        updateSponsor,
        deleteSponsor,
    };
} 