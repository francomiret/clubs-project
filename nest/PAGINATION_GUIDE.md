# Guía de Paginación

Este proyecto incluye un sistema de paginación reutilizable que se puede usar en todos los controladores.

## 🚀 Uso Rápido

### 1. En el Controlador

```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaginationQueryDto, Paginated } from '../common';

@ApiTags('example')
@Controller('example')
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) {}

    @Get('paginated')
    @Paginated() // Decorador que aplica paginación automáticamente
    @ApiOperation({ summary: 'Obtener elementos con paginación' })
    findAllPaginated(@Query() query: PaginationQueryDto) {
        return this.exampleService.findAllPaginated(query);
    }
}
```

### 2. En el Servicio

```typescript
import { Injectable } from '@nestjs/common';
import { PaginationQueryDto, PaginationService } from '../common';

@Injectable()
export class ExampleService {
    constructor(
        private readonly exampleRepository: ExampleRepository,
        private readonly paginationService: PaginationService,
    ) {}

    async findAllPaginated(query: PaginationQueryDto) {
        const { data, total } = await this.exampleRepository.findAllPaginated(query);
        const { page, limit } = this.paginationService.parsePagination(query);
        
        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }
}
```

### 3. En el Repositorio

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from '../common';

@Injectable()
export class ExampleRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAllPaginated(query: PaginationQueryDto) {
        const { skip, take } = this.parsePagination(query);
        
        const [data, total] = await Promise.all([
            this.prisma.example.findMany({
                skip,
                take,
            }),
            this.prisma.example.count(),
        ]);

        return { data, total };
    }

    private parsePagination(query: PaginationQueryDto) {
        const page = parseInt(query.page?.toString() || '1');
        const limit = parseInt(query.limit?.toString() || '10');
        const skip = (page - 1) * limit;
        
        return { skip, take: limit };
    }
}
```

## 📋 Parámetros de Paginación

### Query Parameters

- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Elementos por página (default: 10, máximo: 100)

### Ejemplos de URLs

```
GET /clubs/paginated                    # Página 1, 10 elementos
GET /clubs/paginated?page=2             # Página 2, 10 elementos
GET /clubs/paginated?limit=5            # Página 1, 5 elementos
GET /clubs/paginated?page=3&limit=20    # Página 3, 20 elementos
```

## 📊 Respuesta de Paginación

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Club 1",
      "createdAt": "2025-08-01T00:00:00.000Z"
    }
  ],
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

## 🔧 Componentes Disponibles

### DTOs
- `PaginationQueryDto`: Para validar los parámetros de query
- `PaginationResponseDto`: Para documentar la respuesta en Swagger

### Servicios
- `PaginationService`: Servicio con métodos de utilidad para paginación

### Decoradores
- `@Paginated()`: Decorador que aplica paginación automáticamente

### Interceptores
- `PaginationInterceptor`: Interceptor para transformar respuestas

## 🎯 Beneficios

1. **Reutilizable**: Se puede usar en cualquier controlador
2. **Validado**: Los parámetros se validan automáticamente
3. **Documentado**: Swagger se genera automáticamente
4. **Consistente**: Misma estructura de respuesta en toda la API
5. **Flexible**: Fácil de personalizar según necesidades

## 📝 Ejemplo Completo

### Controlador
```typescript
@Get('paginated')
@Paginated()
@ApiOperation({ summary: 'Obtener clubs con paginación' })
findAllPaginated(@Query() query: PaginationQueryDto) {
    return this.clubsService.findAllPaginated(query);
}
```

### Servicio
```typescript
async findAllPaginated(query: PaginationQueryDto) {
    const { data, total } = await this.clubsRepository.findAllWithRelationsPaginated(query);
    const { page, limit } = this.paginationService.parsePagination(query);
    
    return this.paginationService.createPaginationResponse(data, total, page, limit);
}
```

### Repositorio
```typescript
async findAllWithRelationsPaginated(query: PaginationQueryDto) {
    const { skip, take } = this.parsePagination(query);
    
    const [data, total] = await Promise.all([
        this.prisma.club.findMany({
            skip,
            take,
            include: {
                users: true,
                members: true,
                sponsors: true,
                payments: true,
            },
        }),
        this.prisma.club.count(),
    ]);

    return { data, total };
}
```

## 🚀 Próximos Pasos

1. **Agregar filtros**: Implementar búsqueda y filtros
2. **Ordenamiento**: Agregar parámetros de ordenamiento
3. **Cache**: Implementar cache para respuestas paginadas
4. **Métricas**: Agregar métricas de uso de paginación 