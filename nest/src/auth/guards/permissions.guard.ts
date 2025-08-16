import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.get<string[]>(
            'permissions',
            context.getHandler()
        );

        // Si no se requieren permisos específicos, permitir acceso
        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const { user } = request;

        // Verificar que el usuario esté autenticado
        if (!user) {
            throw new ForbiddenException('Usuario no autenticado');
        }

        // Verificar que el usuario tenga permisos
        if (!user.permissions || !Array.isArray(user.permissions)) {
            throw new ForbiddenException('Usuario sin permisos asignados');
        }

        // Verificar que el usuario tenga todos los permisos requeridos
        const hasAllPermissions = requiredPermissions.every(permission =>
            user.permissions.includes(permission)
        );

        if (!hasAllPermissions) {
            const missingPermissions = requiredPermissions.filter(permission =>
                !user.permissions.includes(permission)
            );
            throw new ForbiddenException(
                `Permisos requeridos: ${missingPermissions.join(', ')}`
            );
        }

        return true;
    }
} 