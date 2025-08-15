import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, CreateUserData, UpdateUserData } from '@/components/creative/types';

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener usuarios');
            }

            const data = await response.json();

            // El backend devuelve { success: true, data: [...] }
            if (data.success && data.data) {
                setUsers(data.data);
            } else {
                setUsers(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    const createUser = async (userData: CreateUserData): Promise<User> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear usuario');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const newUser = responseData.success && responseData.data ? responseData.data : responseData;
            setUsers(prev => [...prev, newUser]);
            return newUser;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error creating user:', err);
            throw new Error(errorMessage);
        }
    };

    const updateUser = async (id: string, userData: UpdateUserData): Promise<User> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar usuario');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const updatedUser = responseData.success && responseData.data ? responseData.data : responseData;
            setUsers(prev => prev.map(user =>
                user.id === id ? updatedUser : user
            ));
            return updatedUser;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error updating user:', err);
            throw new Error(errorMessage);
        }
    };

    const deleteUser = async (id: string): Promise<void> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar usuario');
            }

            setUsers(prev => prev.filter(user => user.id !== id));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error deleting user:', err);
            throw new Error(errorMessage);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchUsers();
        } else {
            setLoading(false);
        }
    }, [user]);

    return {
        users,
        loading,
        error,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
    };
} 