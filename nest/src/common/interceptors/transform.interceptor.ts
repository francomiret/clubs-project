import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    timestamp: string;
    path: string;
    requestId?: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        const request = context.switchToHttp().getRequest<Request>();
        const requestId = request.headers['x-request-id'] as string;

        return next.handle().pipe(
            map((data) => {
                // Si ya es una respuesta paginada, mantener su estructura
                if (data && typeof data === 'object' && 'data' in data && 'pagination' in data) {
                    return {
                        success: true,
                        data: data.data,
                        pagination: data.pagination,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        requestId,
                    };
                }

                // Para respuestas simples
                return {
                    success: true,
                    data,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    requestId,
                };
            }),
        );
    }
} 