import { useState, useCallback } from 'react';

interface AuthError {
    message: string;
    code?: string;
    timestamp: Date;
}

export function useAuthError() {
    const [error, setError] = useState<AuthError | null>(null);

    const setAuthError = useCallback((message: string, code?: string) => {
        const authError: AuthError = {
            message,
            code,
            timestamp: new Date(),
        };
        setError(authError);
        console.error('Auth Error:', authError);
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const handleApiError = useCallback(async (response: Response, defaultMessage: string = 'Error de autenticación') => {
        try {
            const errorData = await response.json();
            const message = errorData.message || errorData.error || defaultMessage;
            setAuthError(message, response.status.toString());
            return message;
        } catch {
            const message = `${defaultMessage} (${response.status})`;
            setAuthError(message, response.status.toString());
            return message;
        }
    }, [setAuthError]);

    return {
        error,
        setAuthError,
        clearError,
        handleApiError,
    };
}
