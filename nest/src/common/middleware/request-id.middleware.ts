import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const requestId = req.headers['x-request-id'] || this.generateRequestId();

        // Agregar el request ID a los headers de la request
        req.headers['x-request-id'] = requestId;

        // Agregar el request ID a los headers de la response
        res.setHeader('X-Request-ID', requestId);

        next();
    }

    private generateRequestId(): string {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
} 