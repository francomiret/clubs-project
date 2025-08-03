# Sistema de Roles y Permisos

## Descripción General

El sistema de roles y permisos permite un control granular sobre las acciones que pueden realizar los usuarios en diferentes clubs. Cada usuario puede tener diferentes roles en diferentes clubs, y cada rol tiene un conjunto específico de permisos.

## Modelo de Datos

### Club

- Representa un club o organización
- Contiene roles y usuarios asociados

### User

- Representa un usuario del sistema
- Puede pertenecer a múltiples clubs con diferentes roles

### UserClub

- Tabla de relación entre usuarios y clubs
- Define el rol específico del usuario en cada club

### Role

- Define un rol dentro de un club específico
- Contiene permisos asociados

### Permission

- Define una acción específica que se puede realizar
- Es global y puede ser reutilizada en múltiples roles

### RolePermission

- Tabla de relación entre roles y permisos
- Define qué permisos tiene cada rol

## Permisos Disponibles

### Usuarios

- `users.read` - Leer usuarios
- `users.create` - Crear usuarios
- `users.update` - Actualizar usuarios
- `users.delete` - Eliminar usuarios

### Miembros

- `members.read` - Leer miembros
- `members.create` - Crear miembros
- `members.update` - Actualizar miembros
- `members.delete` - Eliminar miembros

### Sponsors

- `sponsors.read` - Leer sponsors
- `sponsors.create` - Crear sponsors
- `sponsors.update` - Actualizar sponsors
- `sponsors.delete` - Eliminar sponsors

### Pagos

- `payments.read` - Leer pagos
- `payments.create` - Crear pagos
- `payments.update` - Actualizar pagos
- `payments.delete` - Eliminar pagos

### Roles

- `roles.read` - Leer roles
- `roles.create` - Crear roles
- `roles.update` - Actualizar roles
- `roles.delete` - Eliminar roles

### Permisos

- `permissions.read` - Leer permisos
- `permissions.create` - Crear permisos
- `permissions.update` - Actualizar permisos
- `permissions.delete` - Eliminar permisos

## Roles Predefinidos

### ADMIN

- Tiene todos los permisos disponibles
- Puede gestionar usuarios, miembros, sponsors, pagos, roles y permisos

### MEMBER

- Permisos limitados de lectura
- Puede ver miembros, sponsors y pagos
- No puede realizar operaciones de escritura

## Uso del Sistema

### 1. Guard de Permisos

El `PermissionsGuard` verifica si el usuario tiene los permisos necesarios para acceder a un endpoint específico.

```typescript
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('users')
export class UsersController {
  @Get()
  @RequirePermissions('users.read')
  findAll() {
    return this.usersService.findAll();
  }
}
```

### 2. Decorador de Permisos

El decorador `@RequirePermissions()` define qué permisos son necesarios para acceder a un endpoint.

```typescript
@RequirePermissions('users.create', 'users.update')
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

### 3. Autenticación

El sistema de autenticación ahora incluye los permisos del usuario en el token JWT y en la respuesta de login.

```typescript
// Respuesta de login
{
  accessToken: "...",
  refreshToken: "...",
  user: {
    id: "...",
    email: "...",
    name: "...",
    permissions: ["users.read", "members.create", ...]
  }
}
```

## Migración de Datos

### Scripts Disponibles

1. **backup-users.ts** - Hace backup de usuarios existentes
2. **seed-permissions.ts** - Sembra permisos básicos
3. **restore-users.ts** - Restaura usuarios después de migración
4. **assign-permissions.ts** - Asigna permisos a roles

### Proceso de Migración

```bash
# 1. Hacer backup de usuarios existentes
npx ts-node prisma/backup-users.ts

# 2. Actualizar esquema de base de datos
npx prisma db push --force-reset

# 3. Sembrar permisos básicos
npx ts-node prisma/seed-permissions.ts

# 4. Restaurar usuarios
npx ts-node prisma/restore-users.ts

# 5. Asignar permisos a roles
npx ts-node prisma/assign-permissions.ts
```

## Ejemplos de Uso

### Crear un Nuevo Rol

```typescript
const treasurerRole = await prisma.role.create({
  data: {
    name: 'TREASURER',
    clubId: clubId,
  },
});

// Asignar permisos específicos
await prisma.rolePermission.createMany({
  data: [
    { roleId: treasurerRole.id, permissionId: paymentsReadPermission.id },
    { roleId: treasurerRole.id, permissionId: paymentsCreatePermission.id },
    { roleId: treasurerRole.id, permissionId: paymentsUpdatePermission.id },
  ],
});
```

### Asignar Usuario a Club con Rol

```typescript
await prisma.userClub.create({
  data: {
    userId: userId,
    clubId: clubId,
    roleId: roleId,
  },
});
```

### Verificar Permisos en Código

```typescript
@Injectable()
export class SomeService {
  async someMethod(user: any, clubId: string) {
    const userClub = await this.prisma.userClub.findUnique({
      where: {
        userId_clubId: {
          userId: user.id,
          clubId: clubId,
        },
      },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    const permissions = userClub.role.permissions.map(
      (rp) => rp.permission.name,
    );

    if (!permissions.includes('users.create')) {
      throw new ForbiddenException('Sin permisos para crear usuarios');
    }
  }
}
```

## Consideraciones de Seguridad

1. **Validación de Club**: Siempre verificar que el usuario pertenece al club antes de realizar operaciones
2. **Permisos Granulares**: Usar permisos específicos en lugar de roles generales
3. **Auditoría**: Considerar implementar logs de auditoría para acciones sensibles
4. **Cache**: Los permisos se pueden cachear para mejorar el rendimiento

## Próximos Pasos

1. Implementar cache de permisos
2. Agregar logs de auditoría
3. Crear interfaz de administración de roles y permisos
4. Implementar permisos condicionales basados en datos
5. Agregar soporte para permisos temporales
