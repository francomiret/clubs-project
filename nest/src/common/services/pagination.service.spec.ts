import { PaginationService } from './pagination.service';
import { PaginationQueryDto } from '../dto/pagination.dto';

describe('PaginationService', () => {
    let service: PaginationService;

    beforeEach(() => {
        service = new PaginationService();
    });

    describe('parsePagination', () => {
        it('should parse default values when no query provided', () => {
            const query = {};
            const result = service.parsePagination(query as PaginationQueryDto);

            expect(result).toEqual({
                skip: 0,
                take: 10,
                page: 1,
                limit: 10,
            });
        });

        it('should parse custom page and limit values', () => {
            const query = { page: 3, limit: 25 };
            const result = service.parsePagination(query as PaginationQueryDto);

            expect(result).toEqual({
                skip: 50, // (3 - 1) * 25
                take: 25,
                page: 3,
                limit: 25,
            });
        });

        it('should handle string values in query', () => {
            const query = { page: '2', limit: '15' };
            const result = service.parsePagination(query as any);

            expect(result).toEqual({
                skip: 15, // (2 - 1) * 15
                take: 15,
                page: 2,
                limit: 15,
            });
        });

        it('should handle undefined values', () => {
            const query = { page: undefined, limit: undefined };
            const result = service.parsePagination(query as any);

            expect(result).toEqual({
                skip: 0,
                take: 10,
                page: 1,
                limit: 10,
            });
        });

        it('should handle null values', () => {
            const query = { page: null, limit: null };
            const result = service.parsePagination(query as any);

            expect(result).toEqual({
                skip: 0,
                take: 10,
                page: 1,
                limit: 10,
            });
        });

        it('should handle empty string values', () => {
            const query = { page: '', limit: '' };
            const result = service.parsePagination(query as any);

            expect(result).toEqual({
                skip: 0,
                take: 10,
                page: 1,
                limit: 10,
            });
        });

        it('should handle zero values', () => {
            const query = { page: 0, limit: 0 };
            const result = service.parsePagination(query as PaginationQueryDto);

            expect(result).toEqual({
                skip: 0,
                take: 1,
                page: 1,
                limit: 1,
            });
        });

        it('should handle negative values', () => {
            const query = { page: -1, limit: -5 };
            const result = service.parsePagination(query as PaginationQueryDto);

            expect(result).toEqual({
                skip: 0,
                take: 1,
                page: 1,
                limit: 1,
            });
        });

        it('should handle very large values', () => {
            const query = { page: 1000, limit: 1000 };
            const result = service.parsePagination(query as PaginationQueryDto);

            expect(result).toEqual({
                skip: 999000, // (1000 - 1) * 1000
                take: 1000,
                page: 1000,
                limit: 1000,
            });
        });

        it('should handle decimal values', () => {
            const query = { page: 2.5, limit: 15.7 };
            const result = service.parsePagination(query as any);

            expect(result).toEqual({
                skip: 15, // (2 - 1) * 15
                take: 15,
                page: 2,
                limit: 15,
            });
        });
    });

    describe('createPaginationResponse', () => {
        it('should create pagination response with basic data', () => {
            const data = [{ id: 1, name: 'test1' }, { id: 2, name: 'test2' }];
            const total = 2;
            const page = 1;
            const limit = 10;

            const result = service.createPaginationResponse(data, total, page, limit);

            expect(result).toEqual({
                data,
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 2,
                    totalPages: 1,
                    hasNext: false,
                    hasPrev: false,
                },
            });
        });

        it('should create pagination response with multiple pages', () => {
            const data = [{ id: 1, name: 'test1' }];
            const total = 25;
            const page = 2;
            const limit = 10;

            const result = service.createPaginationResponse(data, total, page, limit);

            expect(result).toEqual({
                data,
                pagination: {
                    page: 2,
                    limit: 10,
                    total: 25,
                    totalPages: 3,
                    hasNext: true,
                    hasPrev: true,
                },
            });
        });

        it('should handle empty data array', () => {
            const data: any[] = [];
            const total = 0;
            const page = 1;
            const limit = 10;

            const result = service.createPaginationResponse(data, total, page, limit);

            expect(result).toEqual({
                data: [],
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 0,
                    totalPages: 0,
                    hasNext: false,
                    hasPrev: false,
                },
            });
        });

        it('should handle first page correctly', () => {
            const data = [{ id: 1, name: 'test1' }];
            const total = 5;
            const page = 1;
            const limit = 10;

            const result = service.createPaginationResponse(data, total, page, limit);

            expect(result.pagination.hasPrev).toBe(false);
            expect(result.pagination.hasNext).toBe(false);
        });

        it('should handle last page correctly', () => {
            const data = [{ id: 5, name: 'test5' }];
            const total = 5;
            const page = 1;
            const limit = 10;

            const result = service.createPaginationResponse(data, total, page, limit);

            expect(result.pagination.hasPrev).toBe(false);
            expect(result.pagination.hasNext).toBe(false);
        });

        it('should handle middle page correctly', () => {
            const data = [{ id: 11, name: 'test11' }];
            const total = 25;
            const page = 2;
            const limit = 10;

            const result = service.createPaginationResponse(data, total, page, limit);

            expect(result.pagination.hasPrev).toBe(true);
            expect(result.pagination.hasNext).toBe(true);
        });

        it('should calculate total pages correctly', () => {
            const testCases = [
                { total: 0, limit: 10, expected: 0 },
                { total: 5, limit: 10, expected: 1 },
                { total: 10, limit: 10, expected: 1 },
                { total: 11, limit: 10, expected: 2 },
                { total: 25, limit: 10, expected: 3 },
                { total: 100, limit: 25, expected: 4 },
            ];

            testCases.forEach(({ total, limit, expected }) => {
                const data = [{ id: 1, name: 'test' }];
                const result = service.createPaginationResponse(data, total, 1, limit);
                expect(result.pagination.totalPages).toBe(expected);
            });
        });

        it('should handle edge case with exact division', () => {
            const data = [{ id: 10, name: 'test10' }];
            const total = 10;
            const page = 1;
            const limit = 10;

            const result = service.createPaginationResponse(data, total, page, limit);

            expect(result.pagination.totalPages).toBe(1);
            expect(result.pagination.hasNext).toBe(false);
        });

        it('should handle edge case with remainder', () => {
            const data = [{ id: 11, name: 'test11' }];
            const total = 11;
            const page = 2;
            const limit = 10;

            const result = service.createPaginationResponse(data, total, page, limit);

            expect(result.pagination.totalPages).toBe(2);
            expect(result.pagination.hasNext).toBe(false);
        });

        it('should handle large numbers', () => {
            const data = [{ id: 1000, name: 'test1000' }];
            const total = 10000;
            const page = 100;
            const limit = 100;

            const result = service.createPaginationResponse(data, total, page, limit);

            expect(result.pagination.totalPages).toBe(100);
            expect(result.pagination.hasPrev).toBe(true);
            expect(result.pagination.hasNext).toBe(false);
        });

        it('should preserve data structure', () => {
            const complexData = [
                {
                    id: 1,
                    name: 'test1',
                    metadata: {
                        createdAt: '2025-08-01T10:30:00.000Z',
                        updatedAt: '2025-08-01T11:00:00.000Z',
                    },
                    tags: ['tag1', 'tag2'],
                },
                {
                    id: 2,
                    name: 'test2',
                    metadata: {
                        createdAt: '2025-08-01T12:30:00.000Z',
                        updatedAt: '2025-08-01T13:00:00.000Z',
                    },
                    tags: ['tag3'],
                },
            ];
            const total = 2;
            const page = 1;
            const limit = 10;

            const result = service.createPaginationResponse(complexData, total, page, limit);

            expect(result.data).toEqual(complexData);
            expect(result.data[0].metadata.createdAt).toBe('2025-08-01T10:30:00.000Z');
            expect(result.data[1].tags).toEqual(['tag3']);
        });
    });

    describe('integration tests', () => {
        it('should work together for a complete pagination scenario', () => {
            const query = { page: 3, limit: 5 };
            const data = [{ id: 11, name: 'test11' }, { id: 12, name: 'test12' }];
            const total = 12;

            // Parse pagination
            const parsed = service.parsePagination(query as PaginationQueryDto);
            expect(parsed.skip).toBe(10); // (3 - 1) * 5
            expect(parsed.take).toBe(5);

            // Create response
            const response = service.createPaginationResponse(data, total, parsed.page, parsed.limit);
            expect(response.pagination.page).toBe(3);
            expect(response.pagination.limit).toBe(5);
            expect(response.pagination.total).toBe(12);
            expect(response.pagination.totalPages).toBe(3);
            expect(response.pagination.hasPrev).toBe(true);
            expect(response.pagination.hasNext).toBe(false);
        });

        it('should handle edge case where page exceeds total pages', () => {
            const query = { page: 5, limit: 10 };
            const data: any[] = [];
            const total = 25;

            const parsed = service.parsePagination(query as PaginationQueryDto);
            const response = service.createPaginationResponse(data, total, parsed.page, parsed.limit);

            expect(response.pagination.page).toBe(5);
            expect(response.pagination.totalPages).toBe(3);
            expect(response.pagination.hasPrev).toBe(true);
            expect(response.pagination.hasNext).toBe(false);
        });
    });
}); 