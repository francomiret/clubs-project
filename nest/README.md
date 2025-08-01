# Clubs Project - NestJS con Prisma y PostgreSQL

Este proyecto está configurado con NestJS, Prisma ORM y PostgreSQL usando Docker.

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

- **Club**: Entidad principal que contiene usuarios, miembros, patrocinadores y pagos
- **User**: Usuarios del sistema con roles (ADMIN, TREASURER, MEMBER, SPONSOR)
- **Member**: Miembros del club que pueden realizar pagos
- **Sponsor**: Patrocinadores que pueden realizar pagos
- **Payment**: Pagos que pueden ser realizados por miembros o patrocinadores

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

## 📁 Estructura del Proyecto

```
src/
├── prisma/
│   ├── prisma.service.ts    # Servicio de conexión a BD
│   └── prisma.module.ts     # Módulo global de Prisma
├── clubs/
│   ├── clubs.service.ts     # Lógica de negocio
│   ├── clubs.controller.ts  # Controlador HTTP
│   └── clubs.module.ts      # Módulo de clubs
└── app.module.ts            # Módulo principal
```

## 🔧 Configuración

### Variables de Entorno

El archivo `.env` contiene la configuración de la base de datos:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clubs_db?schema=public"
```

### Docker

El archivo `docker-compose.yml` configura PostgreSQL:

- Puerto: 5432
- Usuario: postgres
- Contraseña: postgres
- Base de datos: clubs_db

## 📚 Documentación Adicional

Para más detalles sobre la configuración de Prisma, consulta el archivo `PRISMA_README.md`.

## 🧪 Pruebas

El script `scripts/seed.ts` crea datos de ejemplo que incluyen:

- Un club de ejemplo
- Un usuario administrador
- Un miembro
- Un patrocinador
- Pagos de ejemplo

Ejecuta `npm run db:seed` para poblar la base de datos con estos datos de prueba.
