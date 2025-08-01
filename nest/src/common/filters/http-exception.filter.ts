import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

export interface ErrorResponse {
    statusCode: number;
    message: string | string[];
    error: string;
    timestamp: string;
    path: string;
    requestId?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const requestId = request.headers['x-request-id'] as string;

        let status: HttpStatus;
        let message: string | string[];
        let error: string;

        // Manejar diferentes tipos de excepciones
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            } else if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
                message = exceptionResponse.message as string | string[];
            } else {
                message = exception.message;
            }

            error = exception.name;
        } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            // Manejar errores específicos de Prisma
            const prismaError = this.handlePrismaError(exception);
            status = prismaError.status;
            message = prismaError.message;
            error = prismaError.error;
        } else if (exception instanceof Prisma.PrismaClientValidationError) {
            status = HttpStatus.BAD_REQUEST;
            message = 'Error de validación en la base de datos';
            error = 'ValidationError';
        } else if (exception instanceof Prisma.PrismaClientInitializationError) {
            status = HttpStatus.SERVICE_UNAVAILABLE;
            message = 'Error de conexión con la base de datos';
            error = 'DatabaseConnectionError';
        } else if (exception instanceof Error) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Error interno del servidor';
            error = exception.name || 'InternalServerError';
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Error interno del servidor';
            error = 'UnknownError';
        }

        // Log del error
        this.logger.error(
            `${request.method} ${request.url} - ${status} - ${error}: ${message}`,
            exception instanceof Error ? exception.stack : undefined,
        );

        // Construir respuesta de error
        const errorResponse: ErrorResponse = {
            statusCode: status,
            message,
            error,
            timestamp: new Date().toISOString(),
            path: request.url,
            requestId,
        };

        response.status(status).json(errorResponse);
    }

    private handlePrismaError(error: Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                return {
                    status: HttpStatus.CONFLICT,
                    message: 'Ya existe un registro con estos datos únicos',
                    error: 'UniqueConstraintViolation',
                };
            case 'P2003':
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Referencia inválida en la base de datos',
                    error: 'ForeignKeyConstraintViolation',
                };
            case 'P2025':
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Registro no encontrado',
                    error: 'RecordNotFound',
                };
            case 'P2021':
                return {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Error en la estructura de la base de datos',
                    error: 'DatabaseSchemaError',
                };
            case 'P2022':
                return {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Error en el índice de la base de datos',
                    error: 'DatabaseIndexError',
                };
            default:
                return {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Error en la base de datos',
                    error: 'DatabaseError',
                };
        }
    }
} 