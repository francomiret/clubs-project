# Clubs Project - NestJS con Prisma y PostgreSQL

Este proyecto está configurado con NestJS, Prisma ORM y PostgreSQL usando Docker, implementando el patrón Repository y documentación completa con Swagger.

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

## 📊 Modelo de Datos

El proyecto incluye los siguientes modelos:

### Club

- `id`: Identificador único (UUID)
- `name`: Nombre del club
- `users`: Relación con usuarios del club
- `members`: Relación con miembros del club
- `sponsors`: Relación con patrocinadores
- `payments`: Relación con pagos
- `createdAt`: Fecha de creación
- `updatedAt`: Fecha de actualización

### User

- `id`: Identificador único (UUID)
- `email`: Email único del usuario
- `password`: Contraseña del usuario
- `name`: Nombre del usuario
- `role`: Rol del usuario (ADMIN, TREASURER, MEMBER, SPONSOR)
- `clubId`: Referencia al club
- `createdAt`: Fecha de creación
- `updatedAt`: Fecha de actualización

### Member

- `id`: Identificador único (UUID)
- `name`: Nombre del miembro
- `email`: Email único del miembro
- `clubId`: Referencia al club
- `payments`: Relación con pagos del miembro
- `createdAt`: Fecha de creación

### Sponsor

- `id`: Identificador único (UUID)
- `name`: Nombre del patrocinador
- `email`: Email único del patrocinador
- `clubId`: Referencia al club
- `payments`: Relación con pagos del patrocinador
- `createdAt`: Fecha de creación

### Payment

- `id`: Identificador único (UUID)
- `amount`: Monto del pago
- `description`: Descripción opcional del pago
- `date`: Fecha del pago
- `memberId`: Referencia al miembro (opcional)
- `sponsorId`: Referencia al patrocinador (opcional)
- `clubId`: Referencia al club

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

#### Beneficios del Patrón Repository:

- **Separación de responsabilidades**: Servicio, Repositorio y Controlador tienen roles claros
- **Testabilidad mejorada**: Fácil mock del repositorio para tests unitarios
- **Flexibilidad**: Cambio de ORM sin afectar el servicio
- **Mantenibilidad**: Código más limpio y organizado

### Flujo de Datos

```
HTTP Request → Controller → Service → Repository → Database
                ↓           ↓         ↓
              DTOs      Business    Data Access
                        Logic       Layer
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

## 🌐 Endpoints Disponibles

- `POST /clubs` - Crear un nuevo club
- `GET /clubs` - Obtener todos los clubs
- `GET /clubs/:id` - Obtener un club específico
- `PATCH /clubs/:id` - Actualizar un club
- `DELETE /clubs/:id` - Eliminar un club

## 📚 Documentación de la API (Swagger)

La API está completamente documentada con Swagger. Una vez que la aplicación esté ejecutándose, puedes acceder a la documentación interactiva en:

```
http://localhost:3000/api
```

### Características de la Documentación:

- **Documentación Automática**: Todos los endpoints están documentados automáticamente
- **Validación de DTOs**: Los DTOs incluyen validaciones y ejemplos
- **Respuestas Tipadas**: Todas las respuestas están tipadas con entidades
- **Interfaz Interactiva**: Puedes probar los endpoints directamente desde Swagger UI
- **Organización por Tags**: Los endpoints están organizados por categorías

### DTOs Configurados:

- **CreateClubDto**: Para crear nuevos clubs
- **UpdateClubDto**: Para actualizar clubs existentes
- **ClubEntity**: Entidad para documentar las respuestas

### Decoradores Utilizados:

- `@ApiTags()`: Organizar endpoints por categorías
- `@ApiOperation()`: Describir operaciones
- `@ApiResponse()`: Documentar respuestas
- `@ApiParam()`: Documentar parámetros de ruta
- `@ApiProperty()`: Documentar propiedades de DTOs

### Ejemplo de Uso:

#### Crear un Club

```bash
POST /clubs
Content-Type: application/json

{
  "name": "Club Deportivo Nuevo"
}
```

#### Obtener Todos los Clubs

```bash
GET /clubs
```

#### Obtener un Club por ID

```bash
GET /clubs/{id}
```

#### Actualizar un Club

```bash
PATCH /clubs/{id}
Content-Type: application/json

{
  "name": "Club Deportivo Actualizado"
}
```

#### Eliminar un Club

```bash
DELETE /clubs/{id}
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
├── swagger.config.ts        # Configuración de Swagger
├── swagger-ui.config.ts     # Configuración de UI de Swagger
└── app.module.ts            # Módulo principal
```

## 🔧 Configuración

### Variables de Entorno

El archivo `.env` contiene la configuración necesaria:

```
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clubs_db?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-here"
JWT_EXPIRES_IN="1h"
JWT_REFRESH_EXPIRES_IN="7d"

# Application
PORT=3000
NODE_ENV=development
```

### Docker

El archivo `docker-compose.yml` configura PostgreSQL:

- Puerto: 5432
- Usuario: postgres
- Contraseña: postgres
- Base de datos: clubs_db

### Validación Global

La aplicación incluye validación global con `class-validator`:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

### Opciones de Swagger UI

- **Ordenamiento alfabético** de tags y operaciones
- **Expansión automática** de la documentación
- **Filtros** para buscar endpoints
- **Duración de requests** visible
- **Modo "Try it out"** habilitado

## 🧪 Pruebas

El script `scripts/seed.ts` crea datos de ejemplo que incluyen:

- Un club de ejemplo
- Un usuario administrador
- Un miembro
- Un patrocinador
- Pagos de ejemplo

Ejecuta `npm run db:seed` para poblar la base de datos con estos datos de prueba.

## 🎯 Próximos Pasos

Para expandir el proyecto, puedes:

1. **Agregar más DTOs** para otros modelos (User, Member, Sponsor, Payment)
2. **Crear entidades** para todos los modelos
3. **Documentar códigos de error** específicos
4. **Agregar ejemplos** más detallados
5. **Crear repositorios** para otros modelos
6. **Implementar cache** en el repositorio
7. **Agregar transacciones** para operaciones complejas
8. **Implementar blacklist de tokens** para logout
9. **Agregar rate limiting** para endpoints sensibles
10. **Implementar autenticación de dos factores**

## 🔍 Verificación

Para verificar que todo funciona correctamente:

1. Inicia la aplicación: `npm run start:dev`
2. Abre tu navegador en: `http://localhost:3000/api`
3. Deberías ver la interfaz de Swagger con todos los endpoints documentados
4. Prueba los endpoints usando la interfaz interactiva
5. Verifica que la base de datos esté poblada con datos de ejemplo
