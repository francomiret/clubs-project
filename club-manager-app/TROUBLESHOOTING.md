# Guía de Solución de Problemas - Club Manager App

## Problemas Comunes de Autenticación

### 1. Error: "Backend no disponible"

**Síntomas:**

- La app muestra "Backend no disponible" al cargar
- No se puede iniciar sesión
- Errores de conexión en la consola

**Soluciones:**

1. **Verificar que el backend esté ejecutándose:**
   ```bash
   cd nest
   npm run start:dev
   ```
2. **Verificar que esté en el puerto correcto:**

   - El backend debe estar en `http://localhost:3001`
   - Verificar que no haya conflictos de puerto

3. **Verificar la base de datos:**
   ```bash
   cd nest
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

### 2. Error: "Sesión Expirada"

**Síntomas:**

- Usuario es redirigido al login después de un tiempo
- Tokens JWT expiran prematuramente

**Soluciones:**

1. **Verificar configuración de JWT en el backend:**

   - `JWT_EXPIRES_IN` debe estar configurado (por defecto: 1h)
   - `JWT_REFRESH_EXPIRES_IN` debe estar configurado (por defecto: 7d)

2. **Verificar variables de entorno:**
   ```env
   JWT_SECRET=your-secret-key
   JWT_REFRESH_SECRET=your-refresh-secret-key
   ```

### 3. Error: "Datos de Usuario Inválidos"

**Síntomas:**

- Error al cargar el perfil del usuario
- Datos faltantes en la respuesta del backend

**Soluciones:**

1. **Verificar la estructura de la respuesta del backend:**

   - El endpoint `/auth/profile` debe retornar: `id`, `email`, `name`
   - Verificar que no haya campos `null` o `undefined`

2. **Verificar la base de datos:**
   - Los usuarios deben tener todos los campos requeridos
   - Las relaciones entre `User`, `UserClub`, `Role` deben estar correctas

### 4. Error: "Error de Renovación"

**Síntomas:**

- No se puede renovar el token de acceso
- Usuario es expulsado de la sesión

**Soluciones:**

1. **Verificar el refresh token:**

   - Debe estar almacenado en `localStorage`
   - No debe estar expirado

2. **Verificar el endpoint de refresh:**
   - `/auth/refresh` debe estar funcionando
   - Debe retornar `accessToken` y `refreshToken`

### 5. Error: "Forbidden resource" (403)

**Síntomas:**

- Error 403 al intentar acceder a endpoints como `/permissions`, `/roles`
- Token JWT válido pero acceso denegado
- Mensaje: "Forbidden resource"

**Causa:**
El usuario no tiene los permisos necesarios para acceder al recurso solicitado. Aunque el token JWT sea válido, el sistema de autorización verifica que el usuario tenga los permisos específicos requeridos.

**Soluciones:**

1. **Verificar permisos del usuario:**

   ```bash
   cd nest
   npm run db:check-permissions <tu-email>
   ```

2. **Actualizar permisos de usuarios ADMIN:**

   ```bash
   cd nest
   npm run db:update-admin-permissions
   ```

3. **Usar el usuario admin del seed:**

   ```bash
   cd nest
   npm run db:seed
   ```

   Luego inicia sesión con:

   - **Email:** `admin@club.com`
   - **Password:** `admin123`

4. **Verificar que el rol tenga los permisos correctos:**

   - Los roles ADMIN deben tener todos los permisos del sistema
   - Los roles MANAGER y MEMBER tienen permisos limitados

5. **Regenerar tokens después de actualizar permisos:**
   - Cerrar sesión y volver a iniciar
   - Los nuevos tokens incluirán los permisos actualizados

**Permisos requeridos por endpoint:**

- `/permissions` → `permissions.read`
- `/roles` → `roles.read`
- `/users` → `users.read`
- `/members` → `members.read`
- `/sponsors` → `sponsors.read`
- `/payments` → `payments.read`
- `/properties` → `properties.read`
- `/activities` → `activities.read`

## Diagnóstico de Problemas

### 1. Verificar Consola del Navegador

1. Abrir DevTools (F12)
2. Ir a la pestaña Console
3. Buscar errores relacionados con:
   - Fetch requests fallidos
   - Errores de autenticación
   - Problemas de CORS

### 2. Verificar Pestaña Network

1. En DevTools, ir a Network
2. Recargar la página
3. Buscar requests fallidos a:
   - `/api/auth/me`
   - `/api/auth/refresh`
   - Backend NestJS

### 3. Verificar Logs del Backend

1. En la terminal del backend, buscar:
   - Errores de conexión a la base de datos
   - Errores de validación JWT
   - Errores de CORS

## Configuración Recomendada

### Variables de Entorno del Frontend

```env
BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

### Variables de Entorno del Backend

```env
PORT=3001
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clubs_db"
```

## Comandos de Diagnóstico

### Frontend

```bash
# Verificar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Verificar build
npm run build
```

### Backend

```bash
# Verificar dependencias
npm install

# Generar cliente Prisma
npm run db:generate

# Ejecutar migraciones
npm run db:migrate

# Poblar base de datos
npm run db:seed

# Ejecutar en modo desarrollo
npm run start:dev

# Verificar build
npm run build
```

### Base de Datos

```bash
# Verificar que PostgreSQL esté ejecutándose
docker ps

# Conectar a la base de datos
docker exec -it clubs-postgres psql -U postgres -d clubs_db

# Verificar tablas
\dt

# Verificar usuarios
SELECT * FROM "User";
```

## Contacto y Soporte

Si los problemas persisten después de seguir esta guía:

1. **Revisar logs completos** del navegador y backend
2. **Verificar versión de Node.js** (recomendado: 18+)
3. **Verificar versión de npm** (recomendado: 9+)
4. **Crear issue** con logs de error y pasos para reproducir
