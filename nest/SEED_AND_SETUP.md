# Seed y Configuración del Sistema

## Descripción General

Este documento describe el proceso de configuración inicial del sistema de gestión de clubs deportivos con roles y permisos.

## Base de Datos Limpia

La base de datos ha sido limpiada y configurada desde cero con el nuevo esquema de roles y permisos.

### Esquema de Base de Datos

El sistema utiliza las siguientes entidades principales:

- **Club**: Entidad principal que contiene la información del club
- **User**: Usuarios del sistema
- **UserClub**: Relación muchos a muchos entre usuarios y clubs con roles
- **Role**: Roles específicos por club
- **Permission**: Permisos del sistema
- **RolePermission**: Relación entre roles y permisos
- **Member**: Miembros del club
- **Sponsor**: Patrocinadores del club
- **Payment**: Pagos realizados

## Datos Iniciales Creados

### 1. Permisos del Sistema (28 permisos)

#### Permisos de Usuarios

- `users.read` - Leer información de usuarios
- `users.create` - Crear nuevos usuarios
- `users.update` - Actualizar información de usuarios
- `users.delete` - Eliminar usuarios

#### Permisos de Miembros

- `members.read` - Leer información de miembros
- `members.create` - Crear nuevos miembros
- `members.update` - Actualizar información de miembros
- `members.delete` - Eliminar miembros

#### Permisos de Sponsors

- `sponsors.read` - Leer información de sponsors
- `sponsors.create` - Crear nuevos sponsors
- `sponsors.update` - Actualizar información de sponsors
- `sponsors.delete` - Eliminar sponsors

#### Permisos de Pagos

- `payments.read` - Leer información de pagos
- `payments.create` - Crear nuevos pagos
- `payments.update` - Actualizar información de pagos
- `payments.delete` - Eliminar pagos

#### Permisos de Roles

- `roles.read` - Leer información de roles
- `roles.create` - Crear nuevos roles
- `roles.update` - Actualizar información de roles
- `roles.delete` - Eliminar roles

#### Permisos de Permisos

- `permissions.read` - Leer información de permisos
- `permissions.create` - Crear nuevos permisos
- `permissions.update` - Actualizar información de permisos
- `permissions.delete` - Eliminar permisos

#### Permisos de Clubs

- `clubs.read` - Leer información de clubs
- `clubs.create` - Crear nuevos clubs
- `clubs.update` - Actualizar información de clubs
- `clubs.delete` - Eliminar clubs

### 2. Club de Ejemplo

- **Nombre**: Club Deportivo Ejemplo
- **ID**: club-example-id

### 3. Roles del Club

#### Rol ADMIN

- **Nombre**: ADMIN
- **Permisos**: Todos los permisos del sistema
- **Descripción**: Acceso completo a todas las funcionalidades

#### Rol MANAGER

- **Nombre**: MANAGER
- **Permisos**: Todos excepto eliminación y gestión de roles/permisos
- **Descripción**: Puede gestionar datos pero no eliminar ni configurar roles

#### Rol MEMBER

- **Nombre**: MEMBER
- **Permisos**: Solo permisos de lectura (excepto roles y permisos)
- **Descripción**: Acceso de solo lectura a la información del club

### 4. Usuarios de Ejemplo

#### Usuario Administrador

- **Email**: admin@clubdeportivo.com
- **Contraseña**: password123
- **Rol**: ADMIN
- **Permisos**: Todos

#### Usuario Gerente

- **Email**: manager@clubdeportivo.com
- **Contraseña**: password123
- **Rol**: MANAGER
- **Permisos**: Limitados (sin eliminación ni gestión de roles)

#### Usuario Miembro

- **Email**: member@clubdeportivo.com
- **Contraseña**: password123
- **Rol**: MEMBER
- **Permisos**: Solo lectura

### 5. Datos de Ejemplo

#### Miembros (3)

1. **Juan Pérez** - juan.perez@email.com
2. **María García** - maria.garcia@email.com
3. **Carlos López** - carlos.lopez@email.com

#### Sponsors (2)

1. **Empresa Deportiva ABC** - ana.martinez@empresaabc.com
2. **Tienda Deportiva XYZ** - roberto.silva@tiendaxyz.com

#### Pagos (3)

1. Mensualidad agosto 2024 - Juan Pérez - $50.00
2. Mensualidad agosto 2024 - María García - $50.00
3. Mensualidad septiembre 2024 - Juan Pérez - $50.00

## Comandos de Configuración

### 1. Limpiar Base de Datos

```bash
npx prisma db push --force-reset
```

### 2. Ejecutar Seed

```bash
npx ts-node scripts/seed.ts
```

### 3. Compilar Proyecto

```bash
npm run build
```

### 4. Iniciar Servidor

```bash
npm start
```

## Endpoints Disponibles

### Autenticación

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrarse
- `POST /auth/refresh` - Renovar token

### Permisos

- `GET /permissions` - Listar permisos
- `GET /permissions/paginated` - Listar con paginación
- `POST /permissions` - Crear permiso
- `GET /permissions/:id` - Obtener permiso
- `PATCH /permissions/:id` - Actualizar permiso
- `DELETE /permissions/:id` - Eliminar permiso

### Roles

- `GET /roles` - Listar roles
- `GET /roles/paginated` - Listar con paginación
- `GET /roles/club/:clubId` - Roles por club
- `POST /roles` - Crear rol
- `GET /roles/:id` - Obtener rol
- `PATCH /roles/:id` - Actualizar rol
- `DELETE /roles/:id` - Eliminar rol
- `POST /roles/assign-user` - Asignar usuario a rol

### Otros Módulos

- **Clubs**: `/clubs`
- **Users**: `/users`
- **Members**: `/members`
- **Sponsors**: `/sponsors`
- **Payments**: `/payments`

## Seguridad

### Autenticación

- Todos los endpoints requieren autenticación JWT
- Tokens expiran automáticamente
- Refresh tokens disponibles

### Autorización

- Sistema de permisos granular
- Roles específicos por club
- Validación de permisos en cada endpoint

### Validación

- Validación de entrada con class-validator
- Sanitización de datos
- Manejo de errores centralizado

## Próximos Pasos

1. **Configurar Variables de Entorno**
   - Configurar `DATABASE_URL`
   - Configurar `JWT_SECRET`
   - Configurar otros secrets

2. **Personalizar Datos**
   - Modificar información del club
   - Agregar usuarios específicos
   - Configurar roles personalizados

3. **Configurar Frontend**
   - Conectar con los endpoints
   - Implementar autenticación
   - Crear interfaces de gestión

4. **Despliegue**
   - Configurar base de datos de producción
   - Configurar variables de entorno
   - Desplegar aplicación

## Notas Importantes

- **Contraseñas**: Todos los usuarios de ejemplo usan `password123`
- **Base de Datos**: PostgreSQL requerido
- **Node.js**: Versión 18+ recomendada
- **Dependencias**: Todas instaladas con `npm install`

## Solución de Problemas

### Error de Conexión a Base de Datos

```bash
# Verificar que PostgreSQL esté corriendo
# Verificar DATABASE_URL en .env
```

### Error de Compilación

```bash
# Limpiar cache
rm -rf node_modules
npm install
npm run build
```

### Error de Seed

```bash
# Verificar esquema de base de datos
npx prisma db push
npx ts-node scripts/seed.ts
```

## Contacto

Para soporte técnico o preguntas sobre la configuración, revisar la documentación de la API en `/api` cuando el servidor esté corriendo.
