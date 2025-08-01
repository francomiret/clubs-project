import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
    constructor(entityName: string, id?: string | number) {
        const message = id && id !== '' && id !== 0
            ? `${entityName} con ID ${id} no encontrado`
            : `${entityName} no encontrado`;

        super(message, HttpStatus.NOT_FOUND);
    }
}

export class EntityAlreadyExistsException extends HttpException {
    constructor(entityName: string, field?: string) {
        const message = field && field !== ''
            ? `${entityName} con ${field} ya existe`
            : `${entityName} ya existe`;

        super(message, HttpStatus.CONFLICT);
    }
}

export class ValidationException extends HttpException {
    constructor(message: string | string[]) {
        const finalMessage = Array.isArray(message) ? message : message;
        super(finalMessage, HttpStatus.BAD_REQUEST);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message = 'No autorizado') {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}

export class ForbiddenException extends HttpException {
    constructor(message = 'Acceso denegado') {
        super(message, HttpStatus.FORBIDDEN);
    }
}

export class DatabaseException extends HttpException {
    constructor(message = 'Error en la base de datos') {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export class BusinessLogicException extends HttpException {
    constructor(message: string, statusCode = HttpStatus.BAD_REQUEST) {
        super(message, statusCode);
    }
} 