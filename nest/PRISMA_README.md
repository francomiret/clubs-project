# Configuración de Prisma con PostgreSQL

Este proyecto está configurado con Prisma ORM y PostgreSQL usando Docker.

## Estructura del Modelo

El esquema de Prisma incluye los siguientes modelos:

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

## Comandos Útiles

### Iniciar la base de datos

```bash
docker-compose up -d
```

### Detener la base de datos

```bash
docker-compose down
```

### Generar el cliente de Prisma

```bash
npx prisma generate
```

### Aplicar migraciones

```bash
npx prisma migrate dev
```

### Ver la base de datos en Prisma Studio

```bash
npx prisma studio
```

### Resetear la base de datos

```bash
npx prisma migrate reset
```

### Ver el estado de las migraciones

```bash
npx prisma migrate status
```

## Variables de Entorno

El archivo `.env` contiene:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clubs_db?schema=public"
```

## Uso en NestJS

El proyecto incluye:

- `PrismaService`: Servicio para manejar la conexión a la base de datos
- `PrismaModule`: Módulo global que exporta el servicio de Prisma
- `ClubsService`: Ejemplo de servicio que usa Prisma
- `ClubsController`: Ejemplo de controlador con endpoints CRUD

## Endpoints de Ejemplo

- `POST /clubs` - Crear un nuevo club
- `GET /clubs` - Obtener todos los clubs
- `GET /clubs/:id` - Obtener un club específico
- `PATCH /clubs/:id` - Actualizar un club
- `DELETE /clubs/:id` - Eliminar un club

## Ejemplo de Uso

```typescript
// Crear un club
const club = await this.prisma.club.create({
  data: {
    name: 'Mi Club',
  },
});

// Obtener un club con todas sus relaciones
const clubWithRelations = await this.prisma.club.findUnique({
  where: { id: clubId },
  include: {
    users: true,
    members: true,
    sponsors: true,
    payments: true,
  },
});
```
