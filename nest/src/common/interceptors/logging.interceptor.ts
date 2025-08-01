import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        const { method, url, body, query, params, headers } = request;
        const userAgent = headers['user-agent'] || '';
        const requestId = headers['x-request-id'] || this.generateRequestId();
        const startTime = Date.now();

        // Log de la request
        this.logger.log(
            `[${requestId}] ${method} ${url} - Iniciando request`,
            {
                method,
                url,
                body: this.sanitizeBody(body),
                query,
                params,
                userAgent,
                ip: this.getClientIp(request),
            },
        );

        return next.handle().pipe(
            tap((data) => {
                const endTime = Date.now();
                const duration = endTime - startTime;

                // Log de la response exitosa
                this.logger.log(
                    `[${requestId}] ${method} ${url} - ${response.statusCode} - ${duration}ms`,
                    {
                        statusCode: response.statusCode,
                        duration,
                        dataSize: this.getDataSize(data),
                    },
                );
            }),
            catchError((error) => {
                const endTime = Date.now();
                const duration = endTime - startTime;

                // Log del error
                this.logger.error(
                    `[${requestId}] ${method} ${url} - Error después de ${duration}ms`,
                    {
                        error: error.message,
                        stack: error.stack,
                        duration,
                    },
                );

                throw error;
            }),
        );
    }

    private sanitizeBody(body: any): any {
        if (!body) return body;

        const sanitized = { ...body };
        const sensitiveFields = ['password', 'token', 'secret', 'key'];

        sensitiveFields.forEach((field) => {
            if (sanitized[field]) {
                sanitized[field] = '***REDACTED***';
            }
        });

        return sanitized;
    }

    private getClientIp(request: Request): string {
        return (
            request.headers['x-forwarded-for'] ||
            request.headers['x-real-ip'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            'unknown'
        ) as string;
    }

    private getDataSize(data: any): number {
        try {
            return JSON.stringify(data).length;
        } catch {
            return 0;
        }
    }

    private generateRequestId(): string {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
} 