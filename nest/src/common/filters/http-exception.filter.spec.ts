import { HttpExceptionFilter, ErrorResponse } from './http-exception.filter';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

describe('HttpExceptionFilter', () => {
    let filter: HttpExceptionFilter;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockHost: Partial<ArgumentsHost>;

    beforeEach(() => {
        filter = new HttpExceptionFilter();
        
        mockRequest = {
            method: 'GET',
            url: '/test',
            headers: {
                'x-request-id': 'test-request-id',
            },
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        mockHost = {
            switchToHttp: jest.fn().mockReturnValue({
                getRequest: jest.fn().mockReturnValue(mockRequest),
                getResponse: jest.fn().mockReturnValue(mockResponse),
            }),
        };
    });

    describe('catch', () => {
        it('should handle HttpException correctly', () => {
            const exception = new HttpException('Test error', HttpStatus.BAD_REQUEST);
            
            filter.catch(exception, mockHost as ArgumentsHost);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Test error',
                    error: 'HttpException',
                    timestamp: expect.any(String),
                    path: '/test',
                    requestId: 'test-request-id',
                }),
            );
        });

        it('should handle HttpException with object response', () => {
            const exception = new HttpException(
                { message: 'Custom error message' },
                HttpStatus.NOT_FOUND,
            );
            
            filter.catch(exception, mockHost as ArgumentsHost);

            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Custom error message',
                    error: 'HttpException',
                }),
            );
        });

        it('should handle Prisma unique constraint violation', () => {
            const prismaError = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
                clientVersion: '2.0.0',
                code: 'P2002',
            });
            
            filter.catch(prismaError, mockHost as ArgumentsHost);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: HttpStatus.CONFLICT,
                    message: 'Ya existe un registro con estos datos únicos',
                    error: 'UniqueConstraintViolation',
                }),
            );
        });

        it('should handle Prisma foreign key constraint violation', () => {
            const prismaError = new Prisma.PrismaClientKnownRequestError('Foreign key constraint failed', {
                clientVersion: '2.0.0',
                code: 'P2003',
            });
            
            filter.catch(prismaError, mockHost as ArgumentsHost);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Referencia inválida en la base de datos',
                    error: 'ForeignKeyConstraintViolation',
                }),
            );
        });

        it('should handle Prisma record not found', () => {
            const prismaError = new Prisma.PrismaClientKnownRequestError('Record not found', {
                clientVersion: '2.0.0',
                code: 'P2025',
            });
            
            filter.catch(prismaError, mockHost as ArgumentsHost);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Registro no encontrado',
                    error: 'RecordNotFound',
                }),
            );
        });

        it('should handle Prisma validation error', () => {
            const prismaError = new Prisma.PrismaClientValidationError('Validation failed', {
                clientVersion: '2.0.0',
            });
            
            filter.catch(prismaError, mockHost as ArgumentsHost);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Error de validación en la base de datos',
                    error: 'ValidationError',
                }),
            );
        });

        it('should handle Prisma initialization error', () => {
            const prismaError = new Prisma.PrismaClientInitializationError('Connection failed', {
                clientVersion: '2.0.0',
            } as any);
            
            filter.catch(prismaError, mockHost as ArgumentsHost);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.SERVICE_UNAVAILABLE);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: HttpStatus.SERVICE_UNAVAILABLE,
                    message: 'Error de conexión con la base de datos',
                    error: 'DatabaseConnectionError',
                }),
            );
        });

        it('should handle generic Error', () => {
            const error = new Error('Generic error');
            
            filter.catch(error, mockHost as ArgumentsHost);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Error interno del servidor',
                    error: 'Error',
                }),
            );
        });

        it('should handle unknown error types', () => {
            const unknownError = 'String error';
            
            filter.catch(unknownError, mockHost as ArgumentsHost);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Error interno del servidor',
                    error: 'UnknownError',
                }),
            );
        });

        it('should generate request ID if not provided', () => {
            mockRequest.headers = {};
            const exception = new HttpException('Test error', HttpStatus.BAD_REQUEST);
            
            filter.catch(exception, mockHost as ArgumentsHost);

            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    requestId: undefined,
                }),
            );
        });

        it('should include timestamp in error response', () => {
            const exception = new HttpException('Test error', HttpStatus.BAD_REQUEST);
            
            filter.catch(exception, mockHost as ArgumentsHost);

            const responseCall = (mockResponse.json as jest.Mock).mock.calls[0][0];
            expect(responseCall.timestamp).toBeDefined();
            expect(new Date(responseCall.timestamp)).toBeInstanceOf(Date);
        });
    });

    describe('ErrorResponse interface', () => {
        it('should have correct structure', () => {
            const errorResponse: ErrorResponse = {
                statusCode: 400,
                message: 'Test error',
                error: 'TestError',
                timestamp: '2025-08-01T10:30:00.000Z',
                path: '/test',
                requestId: 'test-id',
            };

            expect(errorResponse).toHaveProperty('statusCode');
            expect(errorResponse).toHaveProperty('message');
            expect(errorResponse).toHaveProperty('error');
            expect(errorResponse).toHaveProperty('timestamp');
            expect(errorResponse).toHaveProperty('path');
            expect(errorResponse).toHaveProperty('requestId');
        });
    });
}); 