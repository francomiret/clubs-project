# Configuración de Swagger en Clubs API

Este proyecto incluye una configuración completa de Swagger para documentar la API REST.

## 🚀 Acceso a la Documentación

Una vez que la aplicación esté ejecutándose, puedes acceder a la documentación de Swagger en:

```
http://localhost:3000/api
```

## 📋 Características de la Documentación

### Configuración Incluida

1. **Documentación Automática**: Todos los endpoints están documentados automáticamente
2. **Validación de DTOs**: Los DTOs incluyen validaciones y ejemplos
3. **Respuestas Tipadas**: Todas las respuestas están tipadas con entidades
4. **Interfaz Interactiva**: Puedes probar los endpoints directamente desde Swagger UI
5. **Organización por Tags**: Los endpoints están organizados por categorías

### DTOs Configurados

- **CreateClubDto**: Para crear nuevos clubs
- **UpdateClubDto**: Para actualizar clubs existentes
- **ClubEntity**: Entidad para documentar las respuestas

### Decoradores Utilizados

- `@ApiTags()`: Organizar endpoints por categorías
- `@ApiOperation()`: Describir operaciones
- `@ApiResponse()`: Documentar respuestas
- `@ApiParam()`: Documentar parámetros de ruta
- `@ApiProperty()`: Documentar propiedades de DTOs

## 🛠️ Estructura de Archivos

```
src/
├── swagger.config.ts      # Configuración principal de Swagger
├── swagger-ui.config.ts   # Configuración de la interfaz de usuario
├── clubs/
│   ├── dto/
│   │   ├── create-club.dto.ts
│   │   ├── update-club.dto.ts
│   │   └── index.ts
│   ├── entities/
│   │   └── club.entity.ts
│   ├── clubs.controller.ts
│   ├── clubs.service.ts
│   └── clubs.module.ts
└── main.ts               # Configuración de la aplicación
```

## 📝 Ejemplo de Uso

### Crear un Club

```bash
POST /clubs
Content-Type: application/json

{
  "name": "Club Deportivo Nuevo"
}
```

### Obtener Todos los Clubs

```bash
GET /clubs
```

### Obtener un Club por ID

```bash
GET /clubs/{id}
```

### Actualizar un Club

```bash
PATCH /clubs/{id}
Content-Type: application/json

{
  "name": "Club Deportivo Actualizado"
}
```

### Eliminar un Club

```bash
DELETE /clubs/{id}
```

## 🔧 Configuración Avanzada

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

## 📚 Dependencias Instaladas

- `@nestjs/swagger`: Decoradores y configuración de Swagger
- `swagger-ui-express`: Interfaz de usuario de Swagger
- `class-validator`: Validación de DTOs
- `class-transformer`: Transformación de datos

## 🎯 Próximos Pasos

Para expandir la documentación, puedes:

1. **Agregar más DTOs** para otros modelos (User, Member, Sponsor, Payment)
2. **Crear entidades** para todos los modelos
3. **Agregar autenticación** con `@ApiBearerAuth()`
4. **Documentar códigos de error** específicos
5. **Agregar ejemplos** más detallados

## 🔍 Verificación

Para verificar que Swagger está funcionando correctamente:

1. Inicia la aplicación: `npm run start:dev`
2. Abre tu navegador en: `http://localhost:3000/api`
3. Deberías ver la interfaz de Swagger con todos los endpoints documentados
4. Prueba los endpoints usando la interfaz interactiva
