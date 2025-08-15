import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Role, CreateRoleData, UpdateRoleData } from '@/components/creative/types';

export function useRoles() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchRoles = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/roles', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener roles');
            }

            const data = await response.json();

            // El backend devuelve { success: true, data: [...] }
            if (data.success && data.data) {
                setRoles(data.data);
            } else {
                setRoles(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error fetching roles:', err);
        } finally {
            setLoading(false);
        }
    };

    const createRole = async (roleData: CreateRoleData): Promise<Role> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            // Si no se proporciona clubId, usar el club del usuario autenticado
            const dataToSend = {
                ...roleData,
                clubId: roleData.clubId || user?.clubId,
            };

            const response = await fetch('/api/roles', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear rol');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const newRole = responseData.success && responseData.data ? responseData.data : responseData;
            setRoles(prev => [...prev, newRole]);
            return newRole;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error creating role:', err);
            throw new Error(errorMessage);
        }
    };

    const updateRole = async (id: string, roleData: UpdateRoleData): Promise<Role> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/roles/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roleData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar rol');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const updatedRole = responseData.success && responseData.data ? responseData.data : responseData;
            setRoles(prev => prev.map(role =>
                role.id === id ? updatedRole : role
            ));
            return updatedRole;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error updating role:', err);
            throw new Error(errorMessage);
        }
    };

    const deleteRole = async (id: string): Promise<void> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/roles/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar rol');
            }

            setRoles(prev => prev.filter(role => role.id !== id));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error deleting role:', err);
            throw new Error(errorMessage);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchRoles();
        } else {
            setLoading(false);
        }
    }, [user]);

    return {
        roles,
        loading,
        error,
        fetchRoles,
        createRole,
        updateRole,
        deleteRole,
    };
} 