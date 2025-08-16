import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Payment, CreatePaymentData, UpdatePaymentData } from '@/components/creative/types';

export function usePayments() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchPayments = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/payments', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener pagos');
            }

            const data = await response.json();

            // El backend devuelve { success: true, data: [...] }
            if (data.success && data.data) {
                setPayments(data.data);
            } else {
                setPayments(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error fetching payments:', err);
        } finally {
            setLoading(false);
        }
    };

    const createPayment = async (paymentData: CreatePaymentData): Promise<Payment> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            // Asegurar que se tenga un clubId válido
            if (!paymentData.clubId) {
                throw new Error('Club ID es requerido');
            }

            const response = await fetch('/api/payments', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear pago');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const newPayment = responseData.success && responseData.data ? responseData.data : responseData;
            setPayments(prev => [...prev, newPayment]);
            return newPayment;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error creating payment:', err);
            throw new Error(errorMessage);
        }
    };

    const updatePayment = async (id: string, paymentData: UpdatePaymentData): Promise<Payment> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/payments/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar pago');
            }

            const responseData = await response.json();

            // El backend devuelve { success: true, data: {...} }
            const updatedPayment = responseData.success && responseData.data ? responseData.data : responseData;
            setPayments(prev => prev.map(payment =>
                payment.id === id ? updatedPayment : payment
            ));
            return updatedPayment;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error updating payment:', err);
            throw new Error(errorMessage);
        }
    };

    const deletePayment = async (id: string): Promise<void> => {
        try {
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/payments/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar pago');
            }

            setPayments(prev => prev.filter(payment => payment.id !== id));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error deleting payment:', err);
            throw new Error(errorMessage);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchPayments();
        } else {
            setLoading(false);
        }
    }, [user]);

    return {
        payments,
        loading,
        error,
        fetchPayments,
        createPayment,
        updatePayment,
        deletePayment,
    };
} 