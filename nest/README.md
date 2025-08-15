# 🏆 Clubs Project - Sistema de Gestión Deportiva

## 📋 Descripción General

Sistema completo de gestión de clubs deportivos construido con **NestJS**, **Prisma ORM** y **PostgreSQL**, implementando autenticación JWT, sistema de roles y permisos granular, paginación, manejo de errores centralizado y documentación completa con Swagger.

## 🚀 Configuración Rápida

### 1. Iniciar la base de datos

```bash
docker-compose up -d
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Aplicar migraciones

```bash
npm run db:migrate
```

### 4. Poblar la base de datos con datos de ejemplo

```bash
npm run db:seed
```

### 5. Iniciar la aplicación

```bash
npm run start:dev
```

## 🔐 Sistema de Autenticación y Autorización

### Características Principales

- **JWT (JSON Web Tokens)** para autenticación
- **Refresh tokens** para renovación automática
- **Sistema de roles** específicos por club
- **Permisos granulares** para control de acceso
- **Guards de protección** para rutas sensibles

### Variables de Entorno

Crear archivo `.env` en la raíz:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clubs_db?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-here"
JWT_EXPIRES_IN="1h"
JWT_REFRESH_EXPIRES_IN="7d"

# Application
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Endpoints de Autenticación

#### 1. Registro de Usuario

**POST** `/auth/register`

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Juan Pérez",
  "clubName": "Club Deportivo"
}
```

#### 2. Login

**POST** `/auth/login`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 3. Refresh Token

**POST** `/auth/refresh`

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 4. Perfil de Usuario

**GET** `/auth/profile`

```
Authorization: Bearer <token>
```

#### 5. Logout

**POST** `/auth/logout`

```
Authorization: Bearer <token>
```

## 🛡️ Sistema de Roles y Permisos

### Modelo de Datos

- **Club**: Entidad principal que contiene la información del club
- **User**: Usuarios del sistema
- **UserClub**: Relación muchos a muchos entre usuarios y clubs con roles
- **Role**: Roles específicos por club
- **Permission**: Permisos del sistema
- **RolePermission**: Relación entre roles y permisos
- **Member**: Miembros del club
- **Sponsor**: Patrocinadores del club
- **Payment**: Pagos realizados

### Permisos Disponibles (35 total)

#### Usuarios

- `users.read`, `users.create`, `users.update`, `users.delete`

#### Miembros

- `members.read`, `members.create`, `members.update`, `members.delete`

#### Sponsors

- `sponsors.read`, `sponsors.create`, `sponsors.update`, `sponsors.delete`

#### Pagos

- `payments.read`, `payments.create`, `payments.update`, `payments.delete`

#### Roles

- `roles.read`, `roles.create`, `roles.update`, `roles.delete`

#### Permisos

- `permissions.read`, `permissions.create`, `permissions.update`, `permissions.delete`

#### Clubs

- `club.read`, `club.update`, `clubs.read`

#### Propiedades

- `properties.read`, `properties.create`, `properties.update`, `properties.delete`

#### Actividades

- `activities.read`, `activities.create`, `activities.update`, `activities.delete`

### Roles Predefinidos

#### ADMIN

- **Permisos**: Todos los permisos disponibles
- **Acceso**: Gestión completa del sistema

#### MANAGER

- **Permisos**: Todos excepto eliminación y gestión de roles/permisos
- **Acceso**: Gestión de datos sin eliminación

#### MEMBER

- **Permisos**: Solo permisos de lectura
- **Acceso**: Visualización de información

### Uso del Sistema

#### Guard de Permisos

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

#### Decorador de Permisos

```typescript
@RequirePermissions('users.create', 'users.update')
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

## 📊 Sistema de Paginación

### Uso Rápido

#### En el Controlador

```typescript
@Get('paginated')
@Paginated()
@ApiOperation({ summary: 'Obtener elementos con paginación' })
findAllPaginated(@Query() query: PaginationQueryDto) {
  return this.exampleService.findAllPaginated(query);
}
```

#### Parámetros de Query

- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Elementos por página (default: 10, máximo: 100)

#### Ejemplos de URLs

```
GET /clubs/paginated                    # Página 1, 10 elementos
GET /clubs/paginated?page=2             # Página 2, 10 elementos
GET /clubs/paginated?limit=5            # Página 1, 5 elementos
GET /clubs/paginated?page=3&limit=20    # Página 3, 20 elementos
```

#### Respuesta de Paginación

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🛡️ Sistema de Manejo de Errores

### Componentes Principales

1. **HttpExceptionFilter** - Filtro global de excepciones
2. **LoggingInterceptor** - Interceptor para logging de requests/responses
3. **TransformInterceptor** - Interceptor para transformar respuestas
4. **RequestIdMiddleware** - Middleware para tracking de requests
5. **Excepciones Personalizadas** - Clases de excepción específicas

### Estructura de Respuestas

#### Respuesta Exitosa

```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2025-08-01T10:30:00.000Z",
  "path": "/api/clubs",
  "requestId": "req_1733123400000_abc123def"
}
```

#### Respuesta de Error

```json
{
  "statusCode": 404,
  "message": "Club con ID 123 no encontrado",
  "error": "EntityNotFoundException",
  "timestamp": "2025-08-01T10:30:00.000Z",
  "path": "/api/clubs/123",
  "requestId": "req_1733123400000_abc123def"
}
```

### Tipos de Errores Manejados

- **400**: Errores de validación
- **401**: Token JWT inválido o expirado
- **403**: Usuario no tiene permisos requeridos
- **404**: Recurso no encontrado
- **409**: Conflicto (recurso ya existe)
- **500**: Error interno del servidor

## 🌐 Endpoints Disponibles

### Autenticación

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrarse
- `POST /auth/refresh` - Renovar token
- `GET /auth/profile` - Obtener perfil
- `POST /auth/logout` - Cerrar sesión

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

## 📚 Documentación de la API (Swagger)

### Acceso a la Documentación

Una vez que la aplicación esté ejecutándose, accede a la documentación interactiva en:

```
http://localhost:3001/api
```

### Características

- **Documentación Automática**: Todos los endpoints documentados automáticamente
- **Validación de DTOs**: Los DTOs incluyen validaciones y ejemplos
- **Respuestas Tipadas**: Todas las respuestas están tipadas con entidades
- **Interfaz Interactiva**: Puedes probar los endpoints directamente desde Swagger UI
- **Organización por Tags**: Los endpoints están organizados por categorías

## 🏗️ Arquitectura del Proyecto

### Patrón Repository

Este proyecto implementa el patrón Repository para mejorar la separación de responsabilidades y facilitar el testing.

#### Componentes del Patrón Repository:

1. **Interfaz del Repositorio** (`IClubsRepository`):
   - Define el contrato para todas las operaciones de datos
   - Métodos para CRUD básico y operaciones con relaciones

2. **Implementación del Repositorio** (`ClubsRepository`):
   - Implementa la interfaz usando Prisma
   - Maneja todas las operaciones de base de datos
   - Incluye métodos para obtener datos con relaciones

3. **Token de Inyección** (`CLUBS_REPOSITORY`):
   - Permite la inyección de dependencias con la interfaz
   - Facilita el testing y la flexibilidad

4. **Servicio** (`ClubsService`):
   - Usa el repositorio a través de la interfaz
   - Separación clara de responsabilidades
   - Lógica de negocio independiente del acceso a datos

### Flujo de Datos

```
HTTP Request → Controller → Service → Repository → Database
                ↓           ↓         ↓
              DTOs      Business    Data Access
                        Logic       Layer
```

## 📁 Estructura del Proyecto

```
src/
├── prisma/
│   ├── prisma.service.ts    # Servicio de conexión a BD
│   └── prisma.module.ts     # Módulo global de Prisma
├── common/
│   ├── dto/                 # DTOs compartidos
│   ├── services/            # Servicios compartidos
│   ├── interceptors/        # Interceptores globales
│   ├── filters/             # Filtros de excepciones
│   ├── guards/              # Guards de autenticación
│   ├── decorators/          # Decoradores personalizados
│   └── middleware/          # Middleware global
├── auth/
│   ├── dto/                 # DTOs de autenticación
│   ├── entities/            # Entidades de autenticación
│   ├── strategies/          # Estrategias de Passport
│   ├── guards/              # Guards de autenticación
│   ├── decorators/          # Decoradores de auth
│   ├── interfaces/          # Interfaces JWT
│   ├── auth.service.ts      # Servicio de autenticación
│   ├── auth.controller.ts   # Controlador de auth
│   └── auth.module.ts       # Módulo de autenticación
├── clubs/
│   ├── dto/
│   ├── entities/
│   ├── clubs.repository.ts  # Patrón Repository
│   ├── clubs.service.ts     # Lógica de negocio
│   ├── clubs.controller.ts  # Controlador HTTP
│   └── clubs.module.ts      # Módulo de clubs
├── users/
│   ├── dto/
│   ├── entities/
│   ├── users.repository.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   └── users.module.ts
├── members/
│   ├── dto/
│   ├── entities/
│   ├── members.repository.ts
│   ├── members.service.ts
│   ├── members.controller.ts
│   └── members.module.ts
├── sponsors/
│   ├── dto/
│   ├── entities/
│   ├── sponsors.repository.ts
│   ├── sponsors.service.ts
│   ├── sponsors.controller.ts
│   └── sponsors.module.ts
├── payments/
│   ├── dto/
│   ├── entities/
│   ├── payments.repository.ts
│   ├── payments.service.ts
│   ├── payments.controller.ts
│   └── payments.module.ts
├── roles/
│   ├── dto/
│   ├── entities/
│   ├── roles.repository.ts
│   ├── roles.service.ts
│   ├── roles.controller.ts
│   └── roles.module.ts
├── permissions/
│   ├── dto/
│   ├── entities/
│   ├── permissions.repository.ts
│   ├── permissions.service.ts
│   ├── permissions.controller.ts
│   └── permissions.module.ts
├── swagger.config.ts        # Configuración de Swagger
├── swagger-ui.config.ts     # Configuración de UI de Swagger
└── app.module.ts            # Módulo principal
```

## 🛠️ Comandos Útiles

```bash
# Base de datos
npm run db:studio      # Abrir Prisma Studio
npm run db:migrate     # Aplicar migraciones
npm run db:generate    # Generar cliente Prisma
npm run db:reset       # Resetear base de datos
npm run db:seed        # Poblar con datos de ejemplo

# Desarrollo
npm run start:dev      # Iniciar en modo desarrollo
npm run build          # Compilar el proyecto
npm run test           # Ejecutar tests
```

## 🧪 Datos de Prueba

### Usuario Administrador por Defecto

- **Email**: `admin@club.com`
- **Password**: `admin123`
- **Rol**: ADMIN
- **Permisos**: Todos los permisos del sistema (35)

### Datos Creados por el Seed

- **35 permisos** del sistema
- **1 club** por defecto
- **1 rol ADMIN** con todos los permisos
- **1 usuario admin** con acceso completo

## 🔒 Seguridad

### Autenticación

- **JWT tokens** con expiración configurable
- **Refresh tokens** para renovación automática
- **Encriptación de contraseñas** con bcrypt

### Autorización

- **Sistema de permisos granular** por recurso y acción
- **Roles específicos por club** para multi-tenancy
- **Validación de permisos** en cada endpoint

### Validación

- **Validación global** con class-validator
- **Sanitización de datos** en logs
- **Manejo seguro de errores** sin exposición de información interna

## 🚀 Próximos Pasos

### Funcionalidades Planificadas

1. **Cache de permisos** para mejorar rendimiento
2. **Logs de auditoría** para cambios en roles y permisos
3. **Permisos condicionales** basados en datos
4. **Roles temporales** con fechas de expiración
5. **Interfaz de administración web** para gestión de roles

### Mejoras de Seguridad

1. **Blacklist de tokens** para logout seguro
2. **Rate limiting** para prevenir ataques de fuerza bruta
3. **Two-factor authentication** (2FA)
4. **OAuth integration** con Google, Facebook, etc.

### Mejoras de Performance

1. **Cache Redis** para datos frecuentemente accedidos
2. **Compresión de respuestas** para reducir ancho de banda
3. **Lazy loading** de relaciones en Prisma
4. **Connection pooling** optimizado para PostgreSQL

## 🔍 Verificación del Sistema

### 1. Verificar Base de Datos

```bash
npm run db:seed
```

### 2. Iniciar Aplicación

```bash
npm run start:dev
```

### 3. Verificar Documentación

- Abrir navegador en: `http://localhost:3001/api`
- Deberías ver la interfaz de Swagger con todos los endpoints

### 4. Probar Autenticación

- Usar credenciales: `admin@club.com` / `admin123`
- Verificar que puedes acceder a `/permissions`, `/roles`, `/users`

## 📞 Soporte y Contacto

### Documentación Adicional

- **Swagger UI**: `http://localhost:3001/api`
- **Prisma Studio**: `npm run db:studio`

### Solución de Problemas Comunes

#### Error de Conexión a Base de Datos

```bash
# Verificar que PostgreSQL esté corriendo
docker ps
# Verificar DATABASE_URL en .env
```

#### Error de Compilación

```bash
# Limpiar cache
rm -rf node_modules
npm install
npm run build
```

#### Error de Seed

```bash
# Verificar esquema de base de datos
npx prisma db push
npm run db:seed
```

---

## 🎉 ¡El sistema está completamente implementado y listo para usar!

**Características implementadas:**

- ✅ Autenticación JWT completa
- ✅ Sistema de roles y permisos granular
- ✅ Paginación automática
- ✅ Manejo de errores centralizado
- ✅ Documentación Swagger completa
- ✅ Patrón Repository implementado
- ✅ Validación global de datos
- ✅ Logging detallado
- ✅ Base de datos configurada y poblada
- ✅ Endpoints protegidos y funcionales

**Para comenzar:**

1. Ejecuta `npm run db:seed` para configurar la base de datos
2. Inicia la aplicación con `npm run start:dev`
3. Accede a la documentación en `http://localhost:3001/api`
4. Usa las credenciales admin: `admin@club.com` / `admin123`
