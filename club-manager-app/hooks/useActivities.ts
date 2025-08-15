import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Activity, CreateActivityData, UpdateActivityData } from '@/components/creative/types';

export function useActivities() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchActivities = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/activities', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener actividades');
            }

            const data = await response.json();

            // El backend devuelve { success: true, data: [...] }
            if (data.success && data.data) {
                setActivities(data.data);
            } else {
                setActivities(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error fetching activities:', err);
        } finally {
            setLoading(false);
        }
    };

    const createActivity = async (activityData: CreateActivityData): Promise<Activity> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/activities', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activityData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear actividad');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const newActivity = responseData.success && responseData.data ? responseData.data : responseData;
            setActivities(prev => [...prev, newActivity]);
            return newActivity;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error creating activity:', err);
            throw new Error(errorMessage);
        }
    };

    const updateActivity = async (id: string, activityData: UpdateActivityData): Promise<Activity> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/activities/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activityData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar actividad');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const updatedActivity = responseData.success && responseData.data ? responseData.data : responseData;
            setActivities(prev => prev.map(activity =>
                activity.id === id ? updatedActivity : activity
            ));
            return updatedActivity;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error updating activity:', err);
            throw new Error(errorMessage);
        }
    };

    const deleteActivity = async (id: string): Promise<void> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/activities/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar actividad');
            }

            setActivities(prev => prev.filter(activity => activity.id !== id));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error deleting activity:', err);
            throw new Error(errorMessage);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchActivities();
        } else {
            setLoading(false);
        }
    }, [user]);

    return {
        activities,
        loading,
        error,
        fetchActivities,
        createActivity,
        updateActivity,
        deleteActivity,
    };
} 