# Endpoints de Roles y Permisos

## Descripción General

Este documento describe los endpoints disponibles para gestionar roles y permisos en el sistema. Todos los endpoints requieren autenticación JWT y los permisos correspondientes.

## Autenticación

Todos los endpoints requieren un token JWT válido en el header:

```
Authorization: Bearer <token>
```

## Endpoints de Permisos

### Base URL: `/permissions`

#### 1. Crear Permiso

- **POST** `/permissions`
- **Permisos requeridos:** `permissions.create`
- **Body:**

```json
{
  "name": "users.create",
  "description": "Permite crear nuevos usuarios"
}
```

- **Respuesta:** 201 - Permiso creado exitosamente

#### 2. Obtener Todos los Permisos

- **GET** `/permissions`
- **Permisos requeridos:** `permissions.read`
- **Respuesta:** 200 - Lista de permisos

#### 3. Obtener Permisos con Paginación

- **GET** `/permissions/paginated?page=1&limit=10`
- **Permisos requeridos:** `permissions.read`
- **Query Parameters:**
  - `page`: Número de página (default: 1)
  - `limit`: Elementos por página (default: 10)
- **Respuesta:** 200 - Lista paginada de permisos

#### 4. Obtener Permiso por ID

- **GET** `/permissions/:id`
- **Permisos requeridos:** `permissions.read`
- **Respuesta:** 200 - Permiso encontrado

#### 5. Actualizar Permiso

- **PATCH** `/permissions/:id`
- **Permisos requeridos:** `permissions.update`
- **Body:**

```json
{
  "name": "users.create.advanced",
  "description": "Permite crear usuarios con permisos avanzados"
}
```

- **Respuesta:** 200 - Permiso actualizado

#### 6. Eliminar Permiso

- **DELETE** `/permissions/:id`
- **Permisos requeridos:** `permissions.delete`
- **Respuesta:** 200 - Permiso eliminado

## Endpoints de Roles

### Base URL: `/roles`

#### 1. Crear Rol

- **POST** `/roles`
- **Permisos requeridos:** `roles.create`
- **Body:**

```json
{
  "name": "TREASURER",
  "clubId": "c02c6a05-eb28-48cf-96a4-7327832c0338",
  "permissionIds": ["p1", "p2", "p3"]
}
```

- **Respuesta:** 201 - Rol creado exitosamente

#### 2. Obtener Todos los Roles

- **GET** `/roles`
- **Permisos requeridos:** `roles.read`
- **Respuesta:** 200 - Lista de roles con sus permisos

#### 3. Obtener Roles con Paginación

- **GET** `/roles/paginated?page=1&limit=10`
- **Permisos requeridos:** `roles.read`
- **Query Parameters:**
  - `page`: Número de página (default: 1)
  - `limit`: Elementos por página (default: 10)
- **Respuesta:** 200 - Lista paginada de roles

#### 4. Obtener Roles por Club

- **GET** `/roles/club/:clubId`
- **Permisos requeridos:** `roles.read`
- **Respuesta:** 200 - Roles del club especificado

#### 5. Obtener Roles por Club con Paginación

- **GET** `/roles/club/:clubId/paginated?page=1&limit=10`
- **Permisos requeridos:** `roles.read`
- **Respuesta:** 200 - Lista paginada de roles del club

#### 6. Obtener Rol por ID

- **GET** `/roles/:id`
- **Permisos requeridos:** `roles.read`
- **Respuesta:** 200 - Rol encontrado con sus permisos

#### 7. Actualizar Rol

- **PATCH** `/roles/:id`
- **Permisos requeridos:** `roles.update`
- **Body:**

```json
{
  "name": "SENIOR_TREASURER",
  "permissionIds": ["p1", "p2", "p3", "p4"]
}
```

- **Respuesta:** 200 - Rol actualizado

#### 8. Eliminar Rol

- **DELETE** `/roles/:id`
- **Permisos requeridos:** `roles.delete`
- **Respuesta:** 200 - Rol eliminado

#### 9. Asignar Usuario a Rol

- **POST** `/roles/assign-user`
- **Permisos requeridos:** `roles.update`
- **Body:**

```json
{
  "userId": "u02c6a05-eb28-48cf-96a4-7327832c0338",
  "clubId": "c02c6a05-eb28-48cf-96a4-7327832c0338",
  "roleId": "r02c6a05-eb28-48cf-96a4-7327832c0338"
}
```

- **Respuesta:** 201 - Usuario asignado al rol exitosamente

## Códigos de Error

### 400 - Bad Request

- Datos de entrada inválidos
- Validación de esquema fallida

### 401 - Unauthorized

- Token JWT inválido o expirado
- Token no proporcionado

### 403 - Forbidden

- Usuario no tiene los permisos requeridos
- Acceso denegado

### 404 - Not Found

- Recurso no encontrado
- ID inválido

### 409 - Conflict

- Recurso ya existe
- Violación de restricciones únicas

### 500 - Internal Server Error

- Error interno del servidor

## Ejemplos de Uso

### Crear un Sistema de Roles Completo

1. **Crear Permisos Básicos:**

```bash
# Crear permisos para gestión de usuarios
curl -X POST /permissions \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "users.read",
    "description": "Leer usuarios"
  }'

curl -X POST /permissions \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "users.create",
    "description": "Crear usuarios"
  }'
```

2. **Crear Rol con Permisos:**

```bash
curl -X POST /roles \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "USER_MANAGER",
    "clubId": "club-id",
    "permissionIds": ["permission-id-1", "permission-id-2"]
  }'
```

3. **Asignar Usuario al Rol:**

```bash
curl -X POST /roles/assign-user \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id",
    "clubId": "club-id",
    "roleId": "role-id"
  }'
```

### Consultar Roles y Permisos

1. **Obtener Todos los Permisos:**

```bash
curl -X GET /permissions \
  -H "Authorization: Bearer <token>"
```

2. **Obtener Roles de un Club:**

```bash
curl -X GET /roles/club/club-id \
  -H "Authorization: Bearer <token>"
```

3. **Obtener Rol Específico:**

```bash
curl -X GET /roles/role-id \
  -H "Authorization: Bearer <token>"
```

## Consideraciones de Seguridad

1. **Validación de Permisos:** Todos los endpoints verifican que el usuario tenga los permisos necesarios
2. **Validación de Club:** Los roles están asociados a clubs específicos
3. **Integridad de Datos:** Al eliminar roles, se eliminan automáticamente las relaciones con usuarios y permisos
4. **Unicidad:** Los nombres de permisos son únicos globalmente, los nombres de roles son únicos por club

## Próximos Pasos

1. Implementar cache de permisos para mejorar rendimiento
2. Agregar logs de auditoría para cambios en roles y permisos
3. Implementar permisos condicionales basados en datos
4. Agregar soporte para roles temporales
5. Crear interfaz de administración web
