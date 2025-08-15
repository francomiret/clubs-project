import { buildAuthUrl } from './config';

export interface HealthCheckResult {
    isHealthy: boolean;
    backendUrl: string;
    status: number;
    responseTime: number;
    error?: string;
    timestamp: Date;
}

export async function checkBackendHealth(): Promise<HealthCheckResult> {
    const startTime = Date.now();
    const backendUrl = buildAuthUrl('PROFILE');

    try {
        const response = await fetch(backendUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Timeout de 5 segundos
            signal: AbortSignal.timeout(5000),
        });

        const responseTime = Date.now() - startTime;

        return {
            isHealthy: response.ok || response.status === 401, // 401 es esperado sin token
            backendUrl,
            status: response.status,
            responseTime,
            timestamp: new Date(),
        };
    } catch (error) {
        const responseTime = Date.now() - startTime;

        return {
            isHealthy: false,
            backendUrl,
            status: 0,
            responseTime,
            error: error instanceof Error ? error.message : 'Error desconocido',
            timestamp: new Date(),
        };
    }
}

export async function checkDatabaseConnection(): Promise<boolean> {
    try {
        const response = await fetch('/api/config', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.ok;
    } catch {
        return false;
    }
}

export function logHealthStatus(result: HealthCheckResult) {
    const status = result.isHealthy ? '✅' : '❌';
    const message = `${status} Backend Health Check - Status: ${result.status}, Time: ${result.responseTime}ms, URL: ${result.backendUrl}`;

    if (result.isHealthy) {
        console.log(message);
    } else {
        console.error(message, result.error);
    }

    return result;
}
