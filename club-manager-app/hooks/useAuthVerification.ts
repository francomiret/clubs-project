import { useCallback, useRef } from 'react';

export function useAuthVerification() {
  const isVerifying = useRef(false);
  const lastVerification = useRef<number>(0);
  const VERIFICATION_COOLDOWN = 5000; // 5 segundos entre verificaciones

  const verifyAuth = useCallback(async (
    checkAuthFn: () => Promise<boolean>,
    onSuccess?: () => void,
    onError?: (error: any) => void
  ) => {
    // Evitar verificaciones simultáneas
    if (isVerifying.current) {
      return false;
    }

    // Evitar verificaciones muy frecuentes
    const now = Date.now();
    if (now - lastVerification.current < VERIFICATION_COOLDOWN) {
      return false;
    }

    try {
      isVerifying.current = true;
      lastVerification.current = now;

      const result = await checkAuthFn();
      
      if (result && onSuccess) {
        onSuccess();
      }
      
      return result;
    } catch (error) {
      console.error('Auth verification failed:', error);
      if (onError) {
        onError(error);
      }
      return false;
    } finally {
      isVerifying.current = false;
    }
  }, []);

  const forceVerify = useCallback(async (
    checkAuthFn: () => Promise<boolean>,
    onSuccess?: () => void,
    onError?: (error: any) => void
  ) => {
    // Reset cooldown para verificaciones forzadas
    lastVerification.current = 0;
    return verifyAuth(checkAuthFn, onSuccess, onError);
  }, [verifyAuth]);

  return {
    verifyAuth,
    forceVerify,
    isVerifying: isVerifying.current,
  };
}
