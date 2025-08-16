import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        
        // Si no hay usuario, no permitir acceso
        if (!user) {
            return false;
        }

        // Verificar si el usuario tiene alguno de los roles requeridos
        // El usuario puede tener múltiples roles a través de UserClub
        if (user.clubs && Array.isArray(user.clubs)) {
            return user.clubs.some(userClub => 
                requiredRoles.includes(userClub.role.name)
            );
        }

        // Fallback: verificar si el usuario tiene un rol directo
        if (user.role && requiredRoles.includes(user.role)) {
            return true;
        }

        return false;
    }
} 