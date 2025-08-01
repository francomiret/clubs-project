import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

@Injectable()
export class PaginationInterceptor<T>
    implements NestInterceptor<T, PaginatedResponse<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<PaginatedResponse<T>> {
        const request = context.switchToHttp().getRequest();
        const { page = 1, limit = 10 } = request.query;

        return next.handle().pipe(
            map((response) => {
                if (response && response.data && response.pagination) {
                    return response;
                }

                // Si la respuesta no está paginada, la envolvemos
                return {
                    data: response,
                    pagination: {
                        page: parseInt(page),
                        limit: parseInt(limit),
                        total: response?.length || 0,
                        totalPages: Math.ceil((response?.length || 0) / parseInt(limit)),
                        hasNext: false,
                        hasPrev: parseInt(page) > 1,
                    },
                };
            }),
        );
    }
} 