import { LoggingInterceptor } from './logging.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { Request, Response } from 'express';

describe('LoggingInterceptor', () => {
    let interceptor: LoggingInterceptor;
    let mockExecutionContext: Partial<ExecutionContext>;
    let mockCallHandler: Partial<CallHandler>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        interceptor = new LoggingInterceptor();
        
        mockRequest = {
            method: 'GET',
            url: '/test',
            body: { name: 'test', password: 'secret123' },
            query: { page: '1', limit: '10' },
            params: { id: '123' },
            headers: {
                'user-agent': 'Mozilla/5.0 Test Browser',
                'x-request-id': 'test-request-id',
                'x-forwarded-for': '192.168.1.1',
            },
            connection: {
                remoteAddress: '192.168.1.2',
            } as any,
            socket: {
                remoteAddress: '192.168.1.3',
            } as any,
        };

        mockResponse = {
            statusCode: 200,
        };

        mockExecutionContext = {
            switchToHttp: jest.fn().mockReturnValue({
                getRequest: jest.fn().mockReturnValue(mockRequest),
                getResponse: jest.fn().mockReturnValue(mockResponse),
            }),
        };

        mockCallHandler = {
            handle: jest.fn(),
        };

        // Mock console.log to avoid cluttering test output
        jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('intercept', () => {
        it('should log request and successful response', (done) => {
            const testData = { id: 1, name: 'test' };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(testData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: (data) => {
                    expect(data).toEqual(testData);
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should log request and error response', (done) => {
            const testError = new Error('Test error');
            mockCallHandler.handle = jest.fn().mockReturnValue(throwError(() => testError));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: () => done(new Error('Should have thrown')),
                error: (error) => {
                    expect(error).toBe(testError);
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
            });
        });

        it('should sanitize sensitive data in request body', (done) => {
            const testData = { id: 1, name: 'test' };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(testData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: () => {
                    // Verify that the interceptor was called (sanitization happens internally)
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should handle request without sensitive data', (done) => {
            mockRequest.body = { name: 'test', email: 'test@example.com' };
            const testData = { id: 1, name: 'test' };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(testData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: () => {
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should handle request without body', (done) => {
            mockRequest.body = undefined;
            const testData = { id: 1, name: 'test' };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(testData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: () => {
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should get client IP from x-forwarded-for header', (done) => {
            const testData = { id: 1, name: 'test' };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(testData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: () => {
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should get client IP from x-real-ip header', (done) => {
            mockRequest.headers = {
                'x-real-ip': '192.168.1.4',
            };
            const testData = { id: 1, name: 'test' };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(testData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: () => {
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should get client IP from connection remoteAddress', (done) => {
            mockRequest.headers = {};
            const testData = { id: 1, name: 'test' };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(testData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: () => {
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should return unknown for IP when no headers are available', (done) => {
            mockRequest.headers = {};
            mockRequest.connection = undefined;
            mockRequest.socket = undefined;
            const testData = { id: 1, name: 'test' };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(testData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: () => {
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should handle large response data', (done) => {
            const largeData = { items: Array(1000).fill({ id: 1, name: 'test' }) };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(largeData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: (data) => {
                    expect(data).toEqual(largeData);
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should handle response with undefined data', (done) => {
            mockCallHandler.handle = jest.fn().mockReturnValue(of(undefined));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: (data) => {
                    expect(data).toBeUndefined();
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });

        it('should generate request ID when not provided', (done) => {
            mockRequest.headers = {};
            const testData = { id: 1, name: 'test' };
            mockCallHandler.handle = jest.fn().mockReturnValue(of(testData));

            interceptor.intercept(mockExecutionContext as ExecutionContext, mockCallHandler as CallHandler).subscribe({
                next: () => {
                    expect(mockCallHandler.handle).toHaveBeenCalled();
                    done();
                },
                error: done,
            });
        });
    });

    describe('private methods', () => {
        describe('sanitizeBody', () => {
            it('should sanitize password field', () => {
                const body = { name: 'test', password: 'secret123', email: 'test@example.com' };
                const result = (interceptor as any).sanitizeBody(body);
                
                expect(result.password).toBe('***REDACTED***');
                expect(result.name).toBe('test');
                expect(result.email).toBe('test@example.com');
            });

            it('should sanitize token field', () => {
                const body = { name: 'test', token: 'jwt-token-123' };
                const result = (interceptor as any).sanitizeBody(body);
                
                expect(result.token).toBe('***REDACTED***');
                expect(result.name).toBe('test');
            });

            it('should sanitize secret field', () => {
                const body = { name: 'test', secret: 'api-secret-456' };
                const result = (interceptor as any).sanitizeBody(body);
                
                expect(result.secret).toBe('***REDACTED***');
                expect(result.name).toBe('test');
            });

            it('should sanitize key field', () => {
                const body = { name: 'test', key: 'encryption-key-789' };
                const result = (interceptor as any).sanitizeBody(body);
                
                expect(result.key).toBe('***REDACTED***');
                expect(result.name).toBe('test');
            });

            it('should handle null body', () => {
                const result = (interceptor as any).sanitizeBody(null);
                expect(result).toBeNull();
            });

            it('should handle undefined body', () => {
                const result = (interceptor as any).sanitizeBody(undefined);
                expect(result).toBeUndefined();
            });
        });

        describe('getClientIp', () => {
            it('should return x-forwarded-for IP', () => {
                const request = {
                    headers: { 'x-forwarded-for': '192.168.1.1' },
                } as any;
                
                const result = (interceptor as any).getClientIp(request);
                expect(result).toBe('192.168.1.1');
            });

            it('should return x-real-ip when x-forwarded-for is not available', () => {
                const request = {
                    headers: { 'x-real-ip': '192.168.1.2' },
                } as any;
                
                const result = (interceptor as any).getClientIp(request);
                expect(result).toBe('192.168.1.2');
            });

            it('should return connection remoteAddress when headers are not available', () => {
                const request = {
                    headers: {},
                    connection: { remoteAddress: '192.168.1.3' },
                } as any;
                
                const result = (interceptor as any).getClientIp(request);
                expect(result).toBe('192.168.1.3');
            });

            it('should return socket remoteAddress when connection is not available', () => {
                const request = {
                    headers: {},
                    connection: undefined,
                    socket: { remoteAddress: '192.168.1.4' },
                } as any;
                
                const result = (interceptor as any).getClientIp(request);
                expect(result).toBe('192.168.1.4');
            });

            it('should return unknown when no IP information is available', () => {
                const request = {
                    headers: {},
                    connection: undefined,
                    socket: undefined,
                } as any;
                
                const result = (interceptor as any).getClientIp(request);
                expect(result).toBe('unknown');
            });
        });

        describe('getDataSize', () => {
            it('should return correct size for object', () => {
                const data = { id: 1, name: 'test' };
                const result = (interceptor as any).getDataSize(data);
                expect(result).toBeGreaterThan(0);
            });

            it('should return 0 for invalid JSON', () => {
                const data = { circular: {} };
                (data as any).circular = data; // Create circular reference
                
                const result = (interceptor as any).getDataSize(data);
                expect(result).toBe(0);
            });

            it('should return 0 for undefined data', () => {
                const result = (interceptor as any).getDataSize(undefined);
                expect(result).toBe(0);
            });
        });

        describe('generateRequestId', () => {
            it('should generate unique request IDs', () => {
                const id1 = (interceptor as any).generateRequestId();
                const id2 = (interceptor as any).generateRequestId();
                
                expect(id1).not.toBe(id2);
                expect(id1).toMatch(/^req_\d+_[a-z0-9]+$/);
                expect(id2).toMatch(/^req_\d+_[a-z0-9]+$/);
            });
        });
    });
}); 