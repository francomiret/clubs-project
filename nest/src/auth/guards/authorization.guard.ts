import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export interface RequiredPermission {
    resource: string;
    action: string;
}

export const PERMISSIONS_KEY = 'permissions';

export const RequirePermission = (resource: string, action: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(PERMISSIONS_KEY, { resource, action }, descriptor.value);
        return descriptor;
    };
};

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermission = this.reflector.get<RequiredPermission>(
            PERMISSIONS_KEY,
            context.getHandler(),
        );

        if (!requiredPermission) {
            return true; // No se requiere permiso específico
        }

        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ForbiddenException('Token de autorización requerido');
        }

        const token = authHeader.substring(7);

        try {
            const payload = this.jwtService.verify(token);
            const userPermissions = payload.permissions || [];

            const requiredPermissionString = `${requiredPermission.resource}.${requiredPermission.action}`;

            if (!userPermissions.includes(requiredPermissionString)) {
                throw new ForbiddenException(
                    `Permiso requerido: ${requiredPermissionString}`
                );
            }

            // Agregar el usuario al request para uso posterior
            request['user'] = payload;

            return true;
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw error;
            }
            throw new ForbiddenException('Token inválido');
        }
    }
} 