# 🛡️ Sistema de Manejo de Errores Centralizado

## 📋 Descripción General

El sistema de manejo de errores centralizado proporciona una gestión consistente y robusta de errores en toda la aplicación, incluyendo logging detallado, transformación de respuestas y excepciones personalizadas.

## 🏗️ Arquitectura del Sistema

### Componentes Principales

1. **HttpExceptionFilter** - Filtro global de excepciones
2. **LoggingInterceptor** - Interceptor para logging de requests/responses
3. **TransformInterceptor** - Interceptor para transformar respuestas
4. **RequestIdMiddleware** - Middleware para tracking de requests
5. **Excepciones Personalizadas** - Clases de excepción específicas

## 🔧 Componentes Implementados

### 1. Filtro de Excepciones Global

**Archivo**: `src/common/filters/http-exception.filter.ts`

```typescript
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // Maneja todos los tipos de errores de forma centralizada
}
```

**Características**:

- ✅ Manejo de excepciones HTTP estándar
- ✅ Manejo específico de errores de Prisma
- ✅ Logging automático de errores
- ✅ Respuestas de error estandarizadas
- ✅ Inclusión de Request ID para tracking

### 2. Interceptor de Logging

**Archivo**: `src/common/interceptors/logging.interceptor.ts`

```typescript
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  // Logging detallado de requests y responses
}
```

**Características**:

- ✅ Logging de requests con sanitización de datos sensibles
- ✅ Logging de responses con métricas de performance
- ✅ Logging de errores con stack traces
- ✅ Tracking de Request ID
- ✅ Métricas de duración y tamaño de datos

### 3. Interceptor de Transformación

**Archivo**: `src/common/interceptors/transform.interceptor.ts`

```typescript
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>> {
  // Transforma todas las respuestas en formato estándar
}
```

**Características**:

- ✅ Respuestas exitosas con estructura consistente
- ✅ Compatibilidad con respuestas paginadas
- ✅ Inclusión de metadatos (timestamp, path, requestId)
- ✅ Formato estándar para toda la API

### 4. Middleware de Request ID

**Archivo**: `src/common/middleware/request-id.middleware.ts`

```typescript
@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  // Genera y propaga Request IDs únicos
}
```

**Características**:

- ✅ Generación automática de Request IDs únicos
- ✅ Propagación en headers de request y response
- ✅ Tracking completo de requests a través de la aplicación

### 5. Excepciones Personalizadas

**Archivo**: `src/common/exceptions/custom.exceptions.ts`

```typescript
export class EntityNotFoundException extends HttpException {}
export class EntityAlreadyExistsException extends HttpException {}
export class ValidationException extends HttpException {}
export class UnauthorizedException extends HttpException {}
export class ForbiddenException extends HttpException {}
export class DatabaseException extends HttpException {}
export class BusinessLogicException extends HttpException {}
```

## 📊 Estructura de Respuestas

### Respuesta Exitosa

```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2025-08-01T10:30:00.000Z",
  "path": "/api/clubs",
  "requestId": "req_1733123400000_abc123def"
}
```

### Respuesta Paginada

```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  },
  "timestamp": "2025-08-01T10:30:00.000Z",
  "path": "/api/clubs/paginated",
  "requestId": "req_1733123400000_abc123def"
}
```

### Respuesta de Error

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

## 🎯 Tipos de Errores Manejados

### 1. Errores de Validación

```typescript
// Automáticamente manejados por ValidationPipe
{
  "statusCode": 400,
  "message": [
    "name: El nombre es requerido",
    "email: El email debe ser válido"
  ],
  "error": "ValidationException"
}
```

### 2. Errores de Entidad No Encontrada

```typescript
// Lanzados manualmente en servicios
throw new EntityNotFoundException('Club', id);
```

### 3. Errores de Prisma

```typescript
// Manejados automáticamente por el filtro
// P2002: Unique constraint violation
// P2003: Foreign key constraint violation
// P2025: Record not found
// etc.
```

### 4. Errores de Base de Datos

```typescript
// Errores de conexión y estructura
{
  "statusCode": 503,
  "message": "Error de conexión con la base de datos",
  "error": "DatabaseConnectionError"
}
```

## 🔍 Logging y Monitoreo

### Logs de Request

```
[req_1733123400000_abc123def] GET /api/clubs - Iniciando request
{
  "method": "GET",
  "url": "/api/clubs",
  "body": { "name": "Club Deportivo" },
  "query": { "page": "1", "limit": "10" },
  "userAgent": "Mozilla/5.0...",
  "ip": "192.168.1.1"
}
```

### Logs de Response

```
[req_1733123400000_abc123def] GET /api/clubs - 200 - 45ms
{
  "statusCode": 200,
  "duration": 45,
  "dataSize": 1024
}
```

### Logs de Error

```
[req_1733123400000_abc123def] GET /api/clubs/123 - Error después de 12ms
{
  "error": "Club con ID 123 no encontrado",
  "stack": "EntityNotFoundException: Club con ID 123 no encontrado...",
  "duration": 12
}
```

## 🚀 Uso en Servicios

### Ejemplo de Servicio con Manejo de Errores

```typescript
@Injectable()
export class ClubsService {
  async findOne(id: string): Promise<Club> {
    const club = await this.clubsRepository.findByIdWithRelations(id);
    if (!club) {
      throw new EntityNotFoundException('Club', id);
    }
    return club;
  }

  async update(id: string, data: UpdateClubDto): Promise<Club> {
    const club = await this.clubsRepository.findByIdWithRelations(id);
    if (!club) {
      throw new EntityNotFoundException('Club', id);
    }
    return this.clubsRepository.update(id, data);
  }

  async remove(id: string): Promise<Club> {
    const club = await this.clubsRepository.findByIdWithRelations(id);
    if (!club) {
      throw new EntityNotFoundException('Club', id);
    }
    return this.clubsRepository.remove(id);
  }
}
```

## 🔧 Configuración Global

### main.ts

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global middleware
  app.use(RequestIdMiddleware);

  // Configure global validation with custom exception factory
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map(
          (error) =>
            `${error.property}: ${Object.values(error.constraints || {}).join(', ')}`,
        );
        return new ValidationException(messages);
      },
    }),
  );

  // Apply global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Apply global interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  // ... resto de configuración
}
```

## 📈 Beneficios del Sistema

### 1. **Consistencia**

- ✅ Respuestas de error estandarizadas
- ✅ Formato consistente en toda la API
- ✅ Códigos de estado HTTP apropiados

### 2. **Observabilidad**

- ✅ Logging detallado de requests/responses
- ✅ Tracking de Request IDs
- ✅ Métricas de performance
- ✅ Stack traces para debugging

### 3. **Mantenibilidad**

- ✅ Manejo centralizado de errores
- ✅ Excepciones personalizadas reutilizables
- ✅ Fácil extensión y modificación

### 4. **Seguridad**

- ✅ Sanitización de datos sensibles en logs
- ✅ Manejo seguro de errores de base de datos
- ✅ No exposición de información interna

### 5. **Performance**

- ✅ Logging asíncrono
- ✅ Transformación eficiente de respuestas
- ✅ Métricas de duración de requests

## 🧪 Testing del Sistema

### Ejemplos de Testing

```typescript
describe('Error Handling', () => {
  it('should return 404 for non-existent club', async () => {
    const response = await request(app.getHttpServer())
      .get('/clubs/non-existent-id')
      .expect(404);

    expect(response.body).toMatchObject({
      statusCode: 404,
      message: 'Club con ID non-existent-id no encontrado',
      error: 'EntityNotFoundException',
      timestamp: expect.any(String),
      path: '/clubs/non-existent-id',
      requestId: expect.any(String),
    });
  });

  it('should return 400 for validation errors', async () => {
    const response = await request(app.getHttpServer())
      .post('/clubs')
      .send({})
      .expect(400);

    expect(response.body).toMatchObject({
      statusCode: 400,
      message: expect.arrayContaining([
        expect.stringContaining('name:'),
        expect.stringContaining('required'),
      ]),
      error: 'ValidationException',
    });
  });
});
```

## 🔄 Flujo de Manejo de Errores

1. **Request llega** → RequestIdMiddleware genera ID único
2. **LoggingInterceptor** → Registra inicio de request
3. **ValidationPipe** → Valida datos de entrada
4. **Servicio** → Ejecuta lógica de negocio
5. **TransformInterceptor** → Transforma respuesta exitosa
6. **LoggingInterceptor** → Registra fin de request
7. **Error ocurre** → HttpExceptionFilter maneja excepción
8. **LoggingInterceptor** → Registra error con stack trace
9. **Response** → Cliente recibe error estandarizado

## 📚 Próximos Pasos

1. **Métricas Avanzadas**: Implementar métricas de Prometheus
2. **Alertas**: Configurar alertas para errores críticos
3. **Rate Limiting**: Implementar límites de requests
4. **Circuit Breaker**: Protección contra fallos en cascada
5. **Health Checks**: Endpoints de salud de la aplicación

---

¡El sistema de manejo de errores está completamente implementado y funcionando! 🎉
