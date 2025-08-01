import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { PaginationInterceptor } from '../interceptors/pagination.interceptor';

export function Paginated() {
    return applyDecorators(
        UseInterceptors(PaginationInterceptor),
        ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' }),
        ApiQuery({ name: 'limit', required: false, type: Number, description: 'Elementos por página' }),
    );
} 