import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto, UpdatePermissionDto } from './dto';
import { PermissionEntity } from './entities/permission.entity';
import { PaginationQueryDto, PaginationResponseDto, Paginated } from '../common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';

@ApiTags('permissions')
@Controller('permissions')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) { }

    @Post()
    @RequirePermissions('permissions.create')
    @ApiOperation({ summary: 'Crear un nuevo permiso' })
    @ApiResponse({
        status: 201,
        description: 'Permiso creado exitosamente',
        type: PermissionEntity,
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 403, description: 'Sin permisos para crear permisos' })
    @ApiResponse({ status: 409, description: 'El permiso ya existe' })
    create(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionsService.create(createPermissionDto);
    }

    @Get()
    @RequirePermissions('permissions.read')
    @ApiOperation({ summary: 'Obtener todos los permisos' })
    @ApiResponse({
        status: 200,
        description: 'Lista de permisos obtenida exitosamente',
        type: [PermissionEntity],
    })
    @ApiResponse({ status: 403, description: 'Sin permisos para leer permisos' })
    findAll() {
        return this.permissionsService.findAll();
    }

    @Get('paginated')
    @RequirePermissions('permissions.read')
    @Paginated()
    @ApiOperation({ summary: 'Obtener todos los permisos con paginación' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de permisos obtenida exitosamente',
        type: PaginationResponseDto,
    })
    @ApiResponse({ status: 403, description: 'Sin permisos para leer permisos' })
    findAllPaginated(@Query() query: PaginationQueryDto) {
        return this.permissionsService.findAllPaginated(query);
    }

    @Get(':id')
    @RequirePermissions('permissions.read')
    @ApiOperation({ summary: 'Obtener un permiso por ID' })
    @ApiParam({ name: 'id', description: 'ID del permiso' })
    @ApiResponse({
        status: 200,
        description: 'Permiso encontrado exitosamente',
        type: PermissionEntity,
    })
    @ApiResponse({ status: 404, description: 'Permiso no encontrado' })
    @ApiResponse({ status: 403, description: 'Sin permisos para leer permisos' })
    findOne(@Param('id') id: string) {
        return this.permissionsService.findOne(id);
    }

    @Patch(':id')
    @RequirePermissions('permissions.update')
    @ApiOperation({ summary: 'Actualizar un permiso' })
    @ApiParam({ name: 'id', description: 'ID del permiso' })
    @ApiResponse({
        status: 200,
        description: 'Permiso actualizado exitosamente',
        type: PermissionEntity,
    })
    @ApiResponse({ status: 404, description: 'Permiso no encontrado' })
    @ApiResponse({ status: 403, description: 'Sin permisos para actualizar permisos' })
    @ApiResponse({ status: 409, description: 'El nombre del permiso ya existe' })
    update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
        return this.permissionsService.update(id, updatePermissionDto);
    }

    @Delete(':id')
    @RequirePermissions('permissions.delete')
    @ApiOperation({ summary: 'Eliminar un permiso' })
    @ApiParam({ name: 'id', description: 'ID del permiso' })
    @ApiResponse({
        status: 200,
        description: 'Permiso eliminado exitosamente',
        type: PermissionEntity,
    })
    @ApiResponse({ status: 404, description: 'Permiso no encontrado' })
    @ApiResponse({ status: 403, description: 'Sin permisos para eliminar permisos' })
    remove(@Param('id') id: string) {
        return this.permissionsService.remove(id);
    }
} 