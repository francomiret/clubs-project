import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dto/pagination.dto';

@Injectable()
export class PaginationService {
    parsePagination(query: PaginationQueryDto) {
        const page = Math.max(1, parseInt(query.page?.toString() || '1'));
        const limit = Math.max(1, parseInt(query.limit?.toString() || '10'));
        const skip = (page - 1) * limit;
        
        return { 
            skip, 
            take: limit,
            page,
            limit
        };
    }

    createPaginationResponse<T>(
        data: T[],
        total: number,
        page: number,
        limit: number,
    ) {
        const totalPages = Math.ceil(total / limit);
        
        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        };
    }
} 