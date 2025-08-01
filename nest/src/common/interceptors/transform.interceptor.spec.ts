import { TransformInterceptor, ApiResponse } from './transform.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { Request } from 'express';

describe('TransformInterceptor', () => {
    let interceptor: TransformInterceptor<any>;
    let mockExecutionContext: Partial<ExecutionContext>;
    let mockCallHandler: Partial<CallHandler>;
    let mockRequest: Partial<Request>;

    beforeEach(() => {
        interceptor = new TransformInterceptor();
        
        mockRequest = {
            url: '/test',
            headers: {
                'x-request-id': 'test-request-id',
            },
        };

        mockExecutionContext = {
            switchToHttp: jest.fn().mockReturnValue({
                getRequest: jest.fn().mockReturnValue(mockRequest),
            }),
        };

        mockCallHandler = {
            handle: jest.fn(),
        };
    });

    describe('intercept', () => {
        it('should transform simple response data', (done) => {
            const testData = { id: 1, name: 'test' };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(testData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: (response: ApiResponse<any>) => {
                    expect(response).toEqual({
                        success: true,
                        data: testData,
                        timestamp: expect.any(String),
                        path: '/test',
                        requestId: 'test-request-id',
                    });
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should transform paginated response data', (done) => {
            const paginatedData = {
                data: [{ id: 1, name: 'test1' }, { id: 2, name: 'test2' }],
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 2,
                    totalPages: 1,
                    hasNext: false,
                    hasPrev: false,
                },
            };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(paginatedData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: (response: ApiResponse<any>) => {
                    expect(response).toEqual({
                        success: true,
                        data: paginatedData.data,
                        pagination: paginatedData.pagination,
                        timestamp: expect.any(String),
                        path: '/test',
                        requestId: 'test-request-id',
                    });
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should handle response without request ID', (done) => {
            mockRequest.headers = {};
            const testData = { id: 1, name: 'test' };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(testData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: (response: ApiResponse<any>) => {
                    expect(response).toEqual({
                        success: true,
                        data: testData,
                        timestamp: expect.any(String),
                        path: '/test',
                        requestId: undefined,
                    });
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should handle null response data', (done) => {
            mockCallHandler.handle = jest.fn().mockReturnValue(of(null));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: (response: ApiResponse<any>) => {
                    expect(response).toEqual({
                        success: true,
                        data: null,
                        timestamp: expect.any(String),
                        path: '/test',
                        requestId: 'test-request-id',
                    });
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should handle undefined response data', (done) => {
            mockCallHandler.handle = jest.fn().mockReturnValue(of(undefined));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: (response: ApiResponse<any>) => {
                    expect(response).toEqual({
                        success: true,
                        data: undefined,
                        timestamp: expect.any(String),
                        path: '/test',
                        requestId: 'test-request-id',
                    });
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should handle empty array response', (done) => {
            const emptyArray: any[] = [];
            mockCallHandler.handle = jest.fn().mockReturnValue(of(emptyArray));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: (response: ApiResponse<any>) => {
                    expect(response).toEqual({
                        success: true,
                        data: emptyArray,
                        timestamp: expect.any(String),
                        path: '/test',
                        requestId: 'test-request-id',
                    });
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should handle complex nested object response', (done) => {
            const complexData = {
                user: {
                    id: 1,
                    name: 'John Doe',
                    profile: {
                        email: 'john@example.com',
                        preferences: {
                            theme: 'dark',
                            language: 'es',
                        },
                    },
                },
                metadata: {
                    createdAt: '2025-08-01T10:30:00.000Z',
                    updatedAt: '2025-08-01T11:00:00.000Z',
                },
            };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(complexData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: (response: ApiResponse<any>) => {
                    expect(response).toEqual({
                        success: true,
                        data: complexData,
                        timestamp: expect.any(String),
                        path: '/test',
                        requestId: 'test-request-id',
                    });
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should handle response with data but no pagination', (done) => {
            const dataWithDataProperty = {
                data: { id: 1, name: 'test' },
                otherProperty: 'value',
            };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(dataWithDataProperty));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: (response: ApiResponse<any>) => {
                    expect(response).toEqual({
                        success: true,
                        data: dataWithDataProperty,
                        timestamp: expect.any(String),
                        path: '/test',
                        requestId: 'test-request-id',
                    });
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should handle response with pagination but no data property', (done) => {
            const dataWithPaginationProperty = {
                items: [{ id: 1, name: 'test1' }],
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 1,
                    totalPages: 1,
                    hasNext: false,
                    hasPrev: false,
                },
            };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(dataWithPaginationProperty));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: (response: ApiResponse<any>) => {
                    expect(response).toEqual({
                        success: true,
                        data: dataWithPaginationProperty,
                        timestamp: expect.any(String),
                        path: '/test',
                        requestId: 'test-request-id',
                    });
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should include valid timestamp', (done) => {
            const testData = { id: 1, name: 'test' };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(testData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: (response: ApiResponse<any>) => {
                    expect(response.timestamp).toBeDefined();
                    expect(new Date(response.timestamp)).toBeInstanceOf(Date);
                    expect(new Date(response.timestamp).getTime()).toBeGreaterThan(0);
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should handle different URL paths', (done) => {
            mockRequest.url = '/api/clubs/123';
            const testData = { id: 1, name: 'test' };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(testData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: (response: ApiResponse<any>) => {
                    expect(response.path).toBe('/api/clubs/123');
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });
    });

    describe('ApiResponse interface', () => {
        it('should have correct structure for simple response', () => {
            const apiResponse: ApiResponse<any> = {
                success: true,
                data: { id: 1, name: 'test' },
                timestamp: '2025-08-01T10:30:00.000Z',
                path: '/test',
                requestId: 'test-id',
            };

            expect(apiResponse).toHaveProperty('success');
            expect(apiResponse).toHaveProperty('data');
            expect(apiResponse).toHaveProperty('timestamp');
            expect(apiResponse).toHaveProperty('path');
            expect(apiResponse).toHaveProperty('requestId');
            expect(apiResponse.success).toBe(true);
        });

        it('should have correct structure for paginated response', () => {
            const apiResponse: ApiResponse<any> = {
                success: true,
                data: [{ id: 1, name: 'test1' }],
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 1,
                    totalPages: 1,
                    hasNext: false,
                    hasPrev: false,
                },
                timestamp: '2025-08-01T10:30:00.000Z',
                path: '/test',
                requestId: 'test-id',
            };

            expect(apiResponse).toHaveProperty('pagination');
            expect(apiResponse.pagination).toHaveProperty('page');
            expect(apiResponse.pagination).toHaveProperty('limit');
            expect(apiResponse.pagination).toHaveProperty('total');
            expect(apiResponse.pagination).toHaveProperty('totalPages');
            expect(apiResponse.pagination).toHaveProperty('hasNext');
            expect(apiResponse.pagination).toHaveProperty('hasPrev');
        });

        it('should support optional message property', () => {
            const apiResponse: ApiResponse<any> = {
                success: true,
                data: { id: 1, name: 'test' },
                message: 'Operation successful',
                timestamp: '2025-08-01T10:30:00.000Z',
                path: '/test',
                requestId: 'test-id',
            };

            expect(apiResponse).toHaveProperty('message');
            expect(apiResponse.message).toBe('Operation successful');
        });
    });
}); 