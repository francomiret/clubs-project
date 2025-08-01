import {
    EntityNotFoundException,
    EntityAlreadyExistsException,
    ValidationException,
    UnauthorizedException,
    ForbiddenException,
    DatabaseException,
    BusinessLogicException,
} from './custom.exceptions';
import { HttpStatus } from '@nestjs/common';

describe('Custom Exceptions', () => {
    describe('EntityNotFoundException', () => {
        it('should create exception with entity name and ID', () => {
            const exception = new EntityNotFoundException('Club', '123');

            expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
            expect(exception.message).toBe('Club con ID 123 no encontrado');
        });

        it('should create exception with entity name only', () => {
            const exception = new EntityNotFoundException('User');

            expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
            expect(exception.message).toBe('User no encontrado');
        });

        it('should create exception with numeric ID', () => {
            const exception = new EntityNotFoundException('Payment', 456);

            expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
            expect(exception.message).toBe('Payment con ID 456 no encontrado');
        });

        it('should handle different entity types', () => {
            const clubException = new EntityNotFoundException('Club', '123');
            const userException = new EntityNotFoundException('User', '456');
            const memberException = new EntityNotFoundException('Member', '789');

            expect(clubException.message).toBe('Club con ID 123 no encontrado');
            expect(userException.message).toBe('User con ID 456 no encontrado');
            expect(memberException.message).toBe('Member con ID 789 no encontrado');
        });
    });

    describe('EntityAlreadyExistsException', () => {
        it('should create exception with entity name and field', () => {
            const exception = new EntityAlreadyExistsException('User', 'email');

            expect(exception.getStatus()).toBe(HttpStatus.CONFLICT);
            expect(exception.message).toBe('User con email ya existe');
        });

        it('should create exception with entity name only', () => {
            const exception = new EntityAlreadyExistsException('Club');

            expect(exception.getStatus()).toBe(HttpStatus.CONFLICT);
            expect(exception.message).toBe('Club ya existe');
        });

        it('should handle different entity types and fields', () => {
            const userException = new EntityAlreadyExistsException('User', 'email');
            const clubException = new EntityAlreadyExistsException('Club', 'name');
            const memberException = new EntityAlreadyExistsException('Member', 'phone');

            expect(userException.message).toBe('User con email ya existe');
            expect(clubException.message).toBe('Club con name ya existe');
            expect(memberException.message).toBe('Member con phone ya existe');
        });
    });

    describe('ValidationException', () => {
        it('should create exception with string message', () => {
            const exception = new ValidationException('Invalid data provided');

            expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
            expect(exception.message).toBe('Invalid data provided');
        });

        it('should create exception with array of messages', () => {
            const messages = [
                'name: El nombre es requerido',
                'email: El email debe ser válido',
                'age: La edad debe ser mayor a 0',
            ];
            const exception = new ValidationException(messages);

            expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
            expect(exception.getResponse()).toEqual(messages);
        });

        it('should handle empty array of messages', () => {
            const exception = new ValidationException([]);

            expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
            expect(exception.getResponse()).toEqual([]);
        });

        it('should handle single message in array', () => {
            const exception = new ValidationException(['Only one error']);

            expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
            expect(exception.getResponse()).toEqual(['Only one error']);
        });
    });

    describe('UnauthorizedException', () => {
        it('should create exception with default message', () => {
            const exception = new UnauthorizedException();

            expect(exception.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
            expect(exception.message).toBe('No autorizado');
        });

        it('should create exception with custom message', () => {
            const exception = new UnauthorizedException('Invalid credentials');

            expect(exception.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
            expect(exception.message).toBe('Invalid credentials');
        });

        it('should handle different custom messages', () => {
            const exception1 = new UnauthorizedException('Token expired');
            const exception2 = new UnauthorizedException('Invalid API key');

            expect(exception1.message).toBe('Token expired');
            expect(exception2.message).toBe('Invalid API key');
        });
    });

    describe('ForbiddenException', () => {
        it('should create exception with default message', () => {
            const exception = new ForbiddenException();

            expect(exception.getStatus()).toBe(HttpStatus.FORBIDDEN);
            expect(exception.message).toBe('Acceso denegado');
        });

        it('should create exception with custom message', () => {
            const exception = new ForbiddenException('Insufficient permissions');

            expect(exception.getStatus()).toBe(HttpStatus.FORBIDDEN);
            expect(exception.message).toBe('Insufficient permissions');
        });

        it('should handle different custom messages', () => {
            const exception1 = new ForbiddenException('Admin access required');
            const exception2 = new ForbiddenException('Resource access denied');

            expect(exception1.message).toBe('Admin access required');
            expect(exception2.message).toBe('Resource access denied');
        });
    });

    describe('DatabaseException', () => {
        it('should create exception with default message', () => {
            const exception = new DatabaseException();

            expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(exception.message).toBe('Error en la base de datos');
        });

        it('should create exception with custom message', () => {
            const exception = new DatabaseException('Connection timeout');

            expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(exception.message).toBe('Connection timeout');
        });

        it('should handle different custom messages', () => {
            const exception1 = new DatabaseException('Query execution failed');
            const exception2 = new DatabaseException('Transaction rollback error');

            expect(exception1.message).toBe('Query execution failed');
            expect(exception2.message).toBe('Transaction rollback error');
        });
    });

    describe('BusinessLogicException', () => {
        it('should create exception with default status code', () => {
            const exception = new BusinessLogicException('Business rule violation');

            expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
            expect(exception.message).toBe('Business rule violation');
        });

        it('should create exception with custom status code', () => {
            const exception = new BusinessLogicException('Resource conflict', HttpStatus.CONFLICT);

            expect(exception.getStatus()).toBe(HttpStatus.CONFLICT);
            expect(exception.message).toBe('Resource conflict');
        });

        it('should handle different status codes', () => {
            const exception1 = new BusinessLogicException('Not found', HttpStatus.NOT_FOUND);
            const exception2 = new BusinessLogicException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
            const exception3 = new BusinessLogicException('Too many requests', HttpStatus.TOO_MANY_REQUESTS);

            expect(exception1.getStatus()).toBe(HttpStatus.NOT_FOUND);
            expect(exception2.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(exception3.getStatus()).toBe(HttpStatus.TOO_MANY_REQUESTS);
        });

        it('should handle different business logic messages', () => {
            const exception1 = new BusinessLogicException('User quota exceeded');
            const exception2 = new BusinessLogicException('Invalid business operation');
            const exception3 = new BusinessLogicException('Workflow state invalid');

            expect(exception1.message).toBe('User quota exceeded');
            expect(exception2.message).toBe('Invalid business operation');
            expect(exception3.message).toBe('Workflow state invalid');
        });
    });

    describe('Exception inheritance', () => {
        it('should all inherit from HttpException', () => {
            const exceptions = [
                new EntityNotFoundException('Test'),
                new EntityAlreadyExistsException('Test'),
                new ValidationException('Test'),
                new UnauthorizedException(),
                new ForbiddenException(),
                new DatabaseException(),
                new BusinessLogicException('Test'),
            ];

            exceptions.forEach(exception => {
                expect(exception).toBeInstanceOf(Error);
                expect(exception.getStatus).toBeDefined();
                expect(typeof exception.getStatus()).toBe('number');
            });
        });

        it('should have proper error names', () => {
            expect(new EntityNotFoundException('Test').name).toBe('EntityNotFoundException');
            expect(new EntityAlreadyExistsException('Test').name).toBe('EntityAlreadyExistsException');
            expect(new ValidationException('Test').name).toBe('ValidationException');
            expect(new UnauthorizedException().name).toBe('UnauthorizedException');
            expect(new ForbiddenException().name).toBe('ForbiddenException');
            expect(new DatabaseException().name).toBe('DatabaseException');
            expect(new BusinessLogicException('Test').name).toBe('BusinessLogicException');
        });
    });

    describe('Edge cases', () => {
        it('should handle empty string messages', () => {
            const exception = new ValidationException('');
            expect(exception.message).toBe('');
        });

        it('should handle null ID in EntityNotFoundException', () => {
            const exception = new EntityNotFoundException('Test', null as any);
            expect(exception.message).toBe('Test no encontrado');
        });

        it('should handle undefined ID in EntityNotFoundException', () => {
            const exception = new EntityNotFoundException('Test', undefined);
            expect(exception.message).toBe('Test no encontrado');
        });

        it('should handle empty string ID in EntityNotFoundException', () => {
            const exception = new EntityNotFoundException('Test', '');
            expect(exception.message).toBe('Test no encontrado');
        });

        it('should handle zero ID in EntityNotFoundException', () => {
            const exception = new EntityNotFoundException('Test', 0);
            expect(exception.message).toBe('Test no encontrado');
        });

        it('should handle empty field in EntityAlreadyExistsException', () => {
            const exception = new EntityAlreadyExistsException('Test', '');
            expect(exception.message).toBe('Test ya existe');
        });

        it('should handle null field in EntityAlreadyExistsException', () => {
            const exception = new EntityAlreadyExistsException('Test', null as any);
            expect(exception.message).toBe('Test ya existe');
        });

        it('should handle undefined field in EntityAlreadyExistsException', () => {
            const exception = new EntityAlreadyExistsException('Test', undefined);
            expect(exception.message).toBe('Test ya existe');
        });
    });
}); 