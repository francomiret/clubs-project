# 🔐 Módulo de Autenticación

## 📋 Descripción General

El módulo de autenticación proporciona un sistema completo de autenticación y autorización basado en JWT (JSON Web Tokens), incluyendo login, registro, refresh tokens y protección de rutas.

## 🏗️ Arquitectura del Sistema

### Componentes Principales

1. **AuthService** - Servicio principal de autenticación
2. **AuthController** - Controlador con endpoints de autenticación
3. **JwtStrategy** - Estrategia JWT para validación de tokens
4. **LocalStrategy** - Estrategia local para login con email/password
5. **Guards** - Protección de rutas y verificación de roles
6. **Decorators** - Decoradores personalizados para autenticación

## 🔧 Configuración

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/clubs_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-here"
JWT_EXPIRES_IN="1h"
JWT_REFRESH_EXPIRES_IN="7d"

# Application
PORT=3000
NODE_ENV=development
```

### Dependencias Instaladas

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt passport-local bcryptjs @nestjs/config
npm install --save-dev @types/passport-jwt @types/passport-local @types/bcryptjs
```

## 📡 Endpoints de Autenticación

### 1. Registro de Usuario

**POST** `/auth/register`

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Juan Pérez",
  "role": "MEMBER",
  "clubId": "c02c6a05-eb28-48cf-96a4-7327832c0338"
}
```

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": "u123",
      "email": "user@example.com",
      "name": "Juan Pérez",
      "role": "MEMBER",
      "clubId": "c02c6a05-eb28-48cf-96a4-7327832c0338"
    }
  }
}
```

### 2. Login

**POST** `/auth/login`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": "u123",
      "email": "user@example.com",
      "name": "Juan Pérez",
      "role": "MEMBER",
      "clubId": "c02c6a05-eb28-48cf-96a4-7327832c0338"
    }
  }
}
```

### 3. Refresh Token

**POST** `/auth/refresh`

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

### 4. Perfil de Usuario

**GET** `/auth/profile`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "id": "u123",
    "email": "user@example.com",
    "name": "Juan Pérez",
    "role": "MEMBER",
    "clubId": "c02c6a05-eb28-48cf-96a4-7327832c0338"
  }
}
```

### 5. Logout

**POST** `/auth/logout`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "message": "Sesión cerrada exitosamente"
  }
}
```

## 🛡️ Protección de Rutas

### 1. Rutas Públicas

Usar el decorador `@Public()` para rutas que no requieren autenticación:

```typescript
@Public()
@Post('login')
async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
}
```

### 2. Rutas Protegidas

Usar el guard `@UseGuards(JwtAuthGuard)` para rutas que requieren autenticación:

```typescript
@UseGuards(JwtAuthGuard)
@Get('profile')
async getProfile(@CurrentUser() user) {
    return user;
}
```

### 3. Verificación de Roles

Usar el decorador `@Roles()` y el guard `RolesGuard`:

```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MANAGER)
@Get('admin-only')
async adminOnly() {
    return { message: 'Solo para administradores' };
}
```

## 🎯 Decoradores Personalizados

### 1. @CurrentUser()

Obtiene el usuario autenticado del request:

```typescript
@Get('profile')
async getProfile(@CurrentUser() user) {
    return user;
}
```

### 2. @Public()

Marca una ruta como pública (no requiere autenticación):

```typescript
@Public()
@Post('login')
async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
}
```

### 3. @Roles()

Especifica los roles requeridos para acceder a una ruta:

```typescript
@Roles(Role.ADMIN, Role.MANAGER)
@Get('admin-only')
async adminOnly() {
    return { message: 'Solo para administradores' };
}
```

## 🔐 Estrategias de Autenticación

### 1. JWT Strategy

Valida tokens JWT en el header `Authorization: Bearer <token>`:

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return user;
  }
}
```

### 2. Local Strategy

Valida credenciales de email/password:

```typescript
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return user;
  }
}
```

## 🛡️ Guards

### 1. JwtAuthGuard

Protege rutas que requieren autenticación JWT:

```typescript
@UseGuards(JwtAuthGuard)
@Get('protected')
async protectedRoute() {
    return { message: 'Ruta protegida' };
}
```

### 2. LocalAuthGuard

Protege rutas de login:

```typescript
@UseGuards(LocalAuthGuard)
@Post('login')
async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
}
```

### 3. RolesGuard

Verifica roles del usuario:

```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Get('admin')
async adminRoute() {
    return { message: 'Solo para administradores' };
}
```

## 🔄 Flujo de Autenticación

### 1. Registro

1. Usuario envía datos de registro
2. Sistema verifica que el email no exista
3. Contraseña se encripta con bcrypt
4. Usuario se crea en la base de datos
5. Se generan tokens JWT
6. Se retorna respuesta con tokens y datos del usuario

### 2. Login

1. Usuario envía email y contraseña
2. Sistema busca usuario por email
3. Se verifica contraseña con bcrypt
4. Se generan tokens JWT
5. Se retorna respuesta con tokens y datos del usuario

### 3. Acceso a Rutas Protegidas

1. Cliente incluye token en header `Authorization: Bearer <token>`
2. JwtAuthGuard intercepta la request
3. JwtStrategy valida el token
4. Si es válido, se agrega el usuario al request
5. Se ejecuta el controlador

### 4. Refresh Token

1. Cliente envía refresh token
2. Sistema valida el refresh token
3. Se generan nuevos tokens
4. Se retorna respuesta con nuevos tokens

## 🔒 Seguridad

### 1. Encriptación de Contraseñas

Las contraseñas se encriptan usando bcrypt con salt rounds de 10:

```typescript
const hashedPassword = await bcrypt.hash(password, 10);
```

### 2. Validación de Tokens

Los tokens JWT se validan en cada request a rutas protegidas:

```typescript
const payload = await this.jwtService.verifyAsync(token, {
  secret: this.configService.get<string>('JWT_SECRET'),
});
```

### 3. Sanitización de Datos

Los datos sensibles se sanitizan en los logs:

```typescript
private sanitizeBody(body: any): any {
    const sanitized = { ...body };
    const sensitiveFields = ['password', 'token', 'secret', 'key'];
    sensitiveFields.forEach((field) => {
        if (sanitized[field]) {
            sanitized[field] = '***REDACTED***';
        }
    });
    return sanitized;
}
```

## 📊 Estructura de Archivos

```
src/auth/
├── dto/
│   ├── login.dto.ts
│   ├── register.dto.ts
│   ├── refresh-token.dto.ts
│   └── index.ts
├── entities/
│   └── auth.entity.ts
├── interfaces/
│   └── jwt-payload.interface.ts
├── strategies/
│   ├── jwt.strategy.ts
│   └── local.strategy.ts
├── guards/
│   ├── jwt-auth.guard.ts
│   ├── local-auth.guard.ts
│   └── roles.guard.ts
├── decorators/
│   ├── current-user.decorator.ts
│   ├── public.decorator.ts
│   └── roles.decorator.ts
├── auth.service.ts
├── auth.controller.ts
└── auth.module.ts
```

## 🧪 Testing

### Ejemplo de Test para AuthService

```typescript
describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return tokens and user data on successful login', async () => {
      // Test implementation
    });
  });
});
```

## 🚀 Próximos Pasos

1. **Implementar Blacklist de Tokens**: Invalidar tokens al hacer logout
2. **Rate Limiting**: Limitar intentos de login
3. **Two-Factor Authentication**: Autenticación de dos factores
4. **OAuth Integration**: Integración con Google, Facebook, etc.
5. **Session Management**: Gestión avanzada de sesiones
6. **Audit Logging**: Logging de eventos de autenticación

---

¡El módulo de autenticación está completamente implementado y listo para usar! 🎉
