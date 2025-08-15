import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Permission, CreatePermissionData, UpdatePermissionData } from '@/components/creative/types';

export function usePermissions() {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchPermissions = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/permissions', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener permisos');
            }

            const data = await response.json();

            // El backend devuelve { success: true, data: [...] }
            if (data.success && data.data) {
                setPermissions(data.data);
            } else {
                setPermissions(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error fetching permissions:', err);
        } finally {
            setLoading(false);
        }
    };

    const createPermission = async (permissionData: CreatePermissionData): Promise<Permission> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/permissions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(permissionData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear permiso');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const newPermission = responseData.success && responseData.data ? responseData.data : responseData;
            setPermissions(prev => [...prev, newPermission]);
            return newPermission;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error creating permission:', err);
            throw new Error(errorMessage);
        }
    };

    const updatePermission = async (id: string, permissionData: UpdatePermissionData): Promise<Permission> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/permissions/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(permissionData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar permiso');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const updatedPermission = responseData.success && responseData.data ? responseData.data : responseData;
            setPermissions(prev => prev.map(permission =>
                permission.id === id ? updatedPermission : permission
            ));
            return updatedPermission;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error updating permission:', err);
            throw new Error(errorMessage);
        }
    };

    const deletePermission = async (id: string): Promise<void> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/permissions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar permiso');
            }

            setPermissions(prev => prev.filter(permission => permission.id !== id));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error deleting permission:', err);
            throw new Error(errorMessage);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchPermissions();
        } else {
            setLoading(false);
        }
    }, [user]);

    return {
        permissions,
        loading,
        error,
        fetchPermissions,
        createPermission,
        updatePermission,
        deletePermission,
    };
} 