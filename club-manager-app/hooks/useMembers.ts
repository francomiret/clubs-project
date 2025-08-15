import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Member, CreateMemberData, UpdateMemberData } from '@/components/creative/types';

export function useMembers() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchMembers = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('authToken');
            console.log('Token from localStorage:', token ? 'Present' : 'Missing');
            console.log('User from context:', user);

            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/members', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Backend error response:', errorData);
                throw new Error(errorData.message || 'Error al obtener miembros');
            }

            const data = await response.json();
            console.log('Backend response data:', data);

            // El backend devuelve { success: true, data: [...] }
            if (data.success && data.data) {
                setMembers(data.data);
            } else {
                setMembers(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error fetching members:', err);
        } finally {
            setLoading(false);
        }
    };

    const createMember = async (memberData: CreateMemberData): Promise<Member> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            // Si no se proporciona clubId, usar el club del usuario autenticado
            const dataToSend = {
                ...memberData,
                clubId: memberData.clubId || user?.clubId,
            };

            const response = await fetch('/api/members', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Backend error response:', errorData);
                throw new Error(errorData.message || 'Error al crear miembro');
            }

            const responseData = await response.json();
            console.log('Backend response data:', responseData);

            // El backend devuelve { success: true, data: {...} }
            const newMember = responseData.success && responseData.data ? responseData.data : responseData;
            setMembers(prev => [...prev, newMember]);
            return newMember;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error creating member:', err);
            throw new Error(errorMessage);
        }
    };

    const updateMember = async (id: string, memberData: UpdateMemberData): Promise<Member> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/members/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memberData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Backend error response:', errorData);
                throw new Error(errorData.message || 'Error al actualizar miembro');
            }

            const responseData = await response.json();
            console.log('Backend response data:', responseData);

            // El backend devuelve { success: true, data: {...} }
            const updatedMember = responseData.success && responseData.data ? responseData.data : responseData;
            setMembers(prev => prev.map(member =>
                member.id === id ? updatedMember : member
            ));
            return updatedMember;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error updating member:', err);
            throw new Error(errorMessage);
        }
    };

    const deleteMember = async (id: string): Promise<void> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/members/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Backend error response:', errorData);
                throw new Error(errorData.message || 'Error al eliminar miembro');
            }

            const responseData = await response.json();
            console.log('Backend response data:', responseData);

            setMembers(prev => prev.filter(member => member.id !== id));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error deleting member:', err);
            throw new Error(errorMessage);
        }
    };

    useEffect(() => {
        console.log('useMembers useEffect - user:', user);
        if (user && user.id) {
            console.log('Fetching members for user:', user.id);
            fetchMembers();
        } else {
            console.log('No user or user.id, skipping fetchMembers');
            setLoading(false);
        }
    }, [user]);

    return {
        members,
        loading,
        error,
        fetchMembers,
        createMember,
        updateMember,
        deleteMember,
    };
} 