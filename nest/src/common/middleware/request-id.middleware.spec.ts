import { RequestIdMiddleware } from './request-id.middleware';
import { Request, Response } from 'express';

describe('RequestIdMiddleware', () => {
    let middleware: RequestIdMiddleware;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock;

    beforeEach(() => {
        middleware = new RequestIdMiddleware();
        mockNext = jest.fn();
        
        mockRequest = {
            headers: {},
        };

        mockResponse = {
            setHeader: jest.fn(),
        };
    });

    describe('use', () => {
        it('should use existing request ID from headers', () => {
            const existingRequestId = 'existing-request-id';
            mockRequest.headers = {
                'x-request-id': existingRequestId,
            };

            middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockRequest.headers['x-request-id']).toBe(existingRequestId);
            expect(mockResponse.setHeader).toHaveBeenCalledWith('X-Request-ID', existingRequestId);
            expect(mockNext).toHaveBeenCalled();
        });

        it('should generate new request ID when not provided', () => {
            mockRequest.headers = {};

            middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockRequest.headers['x-request-id']).toBeDefined();
            expect(typeof mockRequest.headers['x-request-id']).toBe('string');
            expect(mockRequest.headers['x-request-id']).toMatch(/^req_\d+_[a-z0-9]+$/);
            expect(mockResponse.setHeader).toHaveBeenCalledWith('X-Request-ID', mockRequest.headers['x-request-id']);
            expect(mockNext).toHaveBeenCalled();
        });

        it('should generate unique request IDs for different requests', () => {
            mockRequest.headers = {};

            // First request
            middleware.use(mockRequest as Request, mockResponse as Response, mockNext);
            const firstRequestId = mockRequest.headers['x-request-id'];

            // Reset for second request
            mockRequest.headers = {};
            jest.clearAllMocks();

            // Second request
            middleware.use(mockRequest as Request, mockResponse as Response, mockNext);
            const secondRequestId = mockRequest.headers['x-request-id'];

            expect(firstRequestId).not.toBe(secondRequestId);
            expect(firstRequestId).toMatch(/^req_\d+_[a-z0-9]+$/);
            expect(secondRequestId).toMatch(/^req_\d+_[a-z0-9]+$/);
        });

        it('should handle request with undefined headers', () => {
            mockRequest.headers = undefined;

            middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockRequest.headers).toBeDefined();
            expect(mockRequest.headers!['x-request-id']).toBeDefined();
            expect(mockRequest.headers!['x-request-id']).toMatch(/^req_\d+_[a-z0-9]+$/);
            expect(mockResponse.setHeader).toHaveBeenCalledWith('X-Request-ID', mockRequest.headers!['x-request-id']);
            expect(mockNext).toHaveBeenCalled();
        });

        it('should handle request with null headers', () => {
            mockRequest.headers = null as any;

            middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockRequest.headers).toBeDefined();
            expect(mockRequest.headers!['x-request-id']).toBeDefined();
            expect(mockRequest.headers!['x-request-id']).toMatch(/^req_\d+_[a-z0-9]+$/);
            expect(mockResponse.setHeader).toHaveBeenCalledWith('X-Request-ID', mockRequest.headers!['x-request-id']);
            expect(mockNext).toHaveBeenCalled();
        });

        it('should preserve other headers when generating request ID', () => {
            mockRequest.headers = {
                'user-agent': 'Mozilla/5.0 Test Browser',
                'content-type': 'application/json',
            };

            middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockRequest.headers['user-agent']).toBe('Mozilla/5.0 Test Browser');
            expect(mockRequest.headers['content-type']).toBe('application/json');
            expect(mockRequest.headers['x-request-id']).toBeDefined();
            expect(mockNext).toHaveBeenCalled();
        });

        it('should call next function exactly once', () => {
            mockRequest.headers = {};

            middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockNext).toHaveBeenCalledTimes(1);
        });

        it('should set response header with correct format', () => {
            mockRequest.headers = {};

            middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.setHeader).toHaveBeenCalledWith('X-Request-ID', expect.any(String));
            expect(mockResponse.setHeader).toHaveBeenCalledTimes(1);
        });

        it('should handle case-insensitive header matching', () => {
            const existingRequestId = 'existing-request-id';
            mockRequest.headers = {
                'X-Request-ID': existingRequestId, // Different case
            };

            middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

            // Should still generate a new ID since we're looking for 'x-request-id'
            expect(mockRequest.headers['x-request-id']).toBeDefined();
            expect(mockRequest.headers['x-request-id']).not.toBe(existingRequestId);
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe('generateRequestId', () => {
        it('should generate request IDs with correct format', () => {
            const requestId = (middleware as any).generateRequestId();
            
            expect(requestId).toMatch(/^req_\d+_[a-z0-9]+$/);
            expect(requestId).toContain('req_');
        });

        it('should generate unique request IDs', () => {
            const requestId1 = (middleware as any).generateRequestId();
            const requestId2 = (middleware as any).generateRequestId();
            
            expect(requestId1).not.toBe(requestId2);
        });

        it('should include timestamp in request ID', () => {
            const requestId = (middleware as any).generateRequestId();
            const parts = requestId.split('_');
            
            expect(parts.length).toBe(3);
            expect(parts[0]).toBe('req');
            expect(parseInt(parts[1])).toBeGreaterThan(0);
            expect(parts[2]).toMatch(/^[a-z0-9]+$/);
        });

        it('should generate alphanumeric suffix', () => {
            const requestId = (middleware as any).generateRequestId();
            const parts = requestId.split('_');
            const suffix = parts[2];
            
            expect(suffix).toMatch(/^[a-z0-9]+$/);
            expect(suffix.length).toBeGreaterThan(0);
        });
    });

    describe('edge cases', () => {
        it('should handle empty string request ID', () => {
            mockRequest.headers = {
                'x-request-id': '',
            };

            middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockRequest.headers['x-request-id']).toBeDefined();
            expect(mockRequest.headers['x-request-id']).not.toBe('');
            expect(mockNext).toHaveBeenCalled();
        });

        it('should handle whitespace-only request ID', () => {
            mockRequest.headers = {
                'x-request-id': '   ',
            };

            middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockRequest.headers['x-request-id']).toBeDefined();
            expect(mockRequest.headers['x-request-id']).toBe('   ');
            expect(mockNext).toHaveBeenCalled();
        });

        it('should handle very long existing request ID', () => {
            const longRequestId = 'a'.repeat(1000);
            mockRequest.headers = {
                'x-request-id': longRequestId,
            };

            middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockRequest.headers['x-request-id']).toBe(longRequestId);
            expect(mockResponse.setHeader).toHaveBeenCalledWith('X-Request-ID', longRequestId);
            expect(mockNext).toHaveBeenCalled();
        });

        it('should handle special characters in existing request ID', () => {
            const specialRequestId = 'req_123_!@#$%^&*()';
            mockRequest.headers = {
                'x-request-id': specialRequestId,
            };

            middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockRequest.headers['x-request-id']).toBe(specialRequestId);
            expect(mockResponse.setHeader).toHaveBeenCalledWith('X-Request-ID', specialRequestId);
            expect(mockNext).toHaveBeenCalled();
        });
    });
}); 