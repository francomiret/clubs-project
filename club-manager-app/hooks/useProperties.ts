import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Property, CreatePropertyData, UpdatePropertyData } from '@/components/creative/types';

export function useProperties() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchProperties = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/properties', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener propiedades');
            }

            const data = await response.json();

            // El backend devuelve { success: true, data: [...] }
            if (data.success && data.data) {
                setProperties(data.data);
            } else {
                setProperties(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error fetching properties:', err);
        } finally {
            setLoading(false);
        }
    };

    const createProperty = async (propertyData: CreatePropertyData): Promise<Property> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/properties', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(propertyData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear propiedad');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const newProperty = responseData.success && responseData.data ? responseData.data : responseData;
            setProperties(prev => [...prev, newProperty]);
            return newProperty;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error creating property:', err);
            throw new Error(errorMessage);
        }
    };

    const updateProperty = async (id: string, propertyData: UpdatePropertyData): Promise<Property> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/properties/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(propertyData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar propiedad');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const updatedProperty = responseData.success && responseData.data ? responseData.data : responseData;
            setProperties(prev => prev.map(property =>
                property.id === id ? updatedProperty : property
            ));
            return updatedProperty;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error updating property:', err);
            throw new Error(errorMessage);
        }
    };

    const deleteProperty = async (id: string): Promise<void> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/properties/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar propiedad');
            }

            setProperties(prev => prev.filter(property => property.id !== id));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error deleting property:', err);
            throw new Error(errorMessage);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchProperties();
        } else {
            setLoading(false);
        }
    }, [user]);

    return {
        properties,
        loading,
        error,
        fetchProperties,
        createProperty,
        updateProperty,
        deleteProperty,
    };
} 