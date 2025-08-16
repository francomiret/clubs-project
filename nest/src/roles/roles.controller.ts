import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto, AssignUserRoleDto } from './dto';
import { RoleEntity } from './entities/role.entity';
import { PaginationQueryDto, PaginationResponseDto, Paginated } from '../common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { CurrentUserRequest } from '../auth/decorators/current-user-request.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@ApiTags('roles')
@ApiBearerAuth()
@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    @RequirePermissions('roles.create')
    @ApiOperation({ summary: 'Crear un nuevo rol' })
    @ApiResponse({
        status: 201,
        description: 'Rol creado exitosamente',
        type: RoleEntity,
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'Sin permisos para crear roles' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    @ApiResponse({ status: 409, description: 'El rol ya existe en este club' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    @RequirePermissions('roles.read')
    @ApiOperation({ summary: 'Obtener todos los roles' })
    @ApiResponse({
        status: 200,
        description: 'Lista de roles obtenida exitosamente',
        type: [RoleEntity],
    })
    @ApiResponse({ status: 403, description: 'Sin permisos para leer roles' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    findAll() {
        return this.rolesService.findAll();
    }

    @Get('my-club')
    @RequirePermissions('roles.read')
    @ApiOperation({ summary: 'Obtener roles del club del usuario actual' })
    @ApiResponse({
        status: 200,
        description: 'Roles del club del usuario obtenidos exitosamente',
        type: [RoleEntity],
    })
    @ApiResponse({ status: 403, description: 'Sin permisos para leer roles' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    findMyClubRoles(@CurrentUser() user: UserEntity) {
        // Obtener el primer club del usuario (asumiendo que un usuario solo puede estar en un club)
        const userClub = user.clubs?.[0];
        if (!userClub) {
            throw new Error('Usuario no pertenece a ningún club');
        }
        return this.rolesService.findByClubId(userClub.clubId);
    }

    @Get('paginated')
    @RequirePermissions('roles.read')
    @Paginated()
    @ApiOperation({ summary: 'Obtener todos los roles con paginación' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de roles obtenida exitosamente',
        type: PaginationResponseDto,
    })
    @ApiResponse({ status: 403, description: 'Sin permisos para leer roles' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    findAllPaginated(@Query() query: PaginationQueryDto) {
        return this.rolesService.findAllPaginated(query);
    }

    @Get('club/:clubId')
    @RequirePermissions('roles.read')
    @ApiOperation({ summary: 'Obtener roles por club' })
    @ApiParam({ name: 'clubId', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Roles del club obtenidos exitosamente',
        type: [RoleEntity],
    })
    @ApiResponse({ status: 403, description: 'Sin permisos para leer roles' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    findByClubId(@Param('clubId') clubId: string) {
        return this.rolesService.findByClubId(clubId);
    }

    @Get('club/:clubId/paginated')
    @RequirePermissions('roles.read')
    @Paginated()
    @ApiOperation({ summary: 'Obtener roles por club con paginación' })
    @ApiParam({ name: 'clubId', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de roles del club obtenida exitosamente',
        type: PaginationResponseDto,
    })
    @ApiResponse({ status: 403, description: 'Sin permisos para leer roles' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    findByClubIdPaginated(@Param('clubId') clubId: string, @Query() query: PaginationQueryDto) {
        return this.rolesService.findByClubIdPaginated(clubId, query);
    }

    @Get(':id')
    @RequirePermissions('roles.read')
    @ApiOperation({ summary: 'Obtener un rol por ID' })
    @ApiParam({ name: 'id', description: 'ID del rol' })
    @ApiResponse({
        status: 200,
        description: 'Rol encontrado exitosamente',
        type: RoleEntity,
    })
    @ApiResponse({ status: 404, description: 'Rol no encontrado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'Sin permisos para leer roles' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    findOne(@Param('id') id: string) {
        return this.rolesService.findOne(id);
    }

    @Patch(':id')
    @RequirePermissions('roles.update')
    @ApiOperation({ summary: 'Actualizar un rol' })
    @ApiParam({ name: 'id', description: 'ID del rol' })
    @ApiResponse({
        status: 200,
        description: 'Rol actualizado exitosamente',
        type: RoleEntity,
    })
    @ApiResponse({ status: 404, description: 'Rol no encontrado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'Sin permisos para actualizar roles' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    @ApiResponse({ status: 409, description: 'El rol ya existe en este club' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(id, updateRoleDto);
    }

    @Delete(':id')
    @RequirePermissions('roles.delete')
    @ApiOperation({ summary: 'Eliminar un rol' })
    @ApiParam({ name: 'id', description: 'ID del rol' })
    @ApiResponse({
        status: 200,
        description: 'Rol eliminado exitosamente',
        type: RoleEntity,
    })
    @ApiResponse({ status: 404, description: 'Rol no encontrado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'Sin permisos para eliminar roles' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    remove(@Param('id') id: string) {
        return this.rolesService.remove(id);
    }

    @Post('assign-user')
    @RequirePermissions('roles.update')
    @ApiOperation({ summary: 'Asignar un usuario a un rol en un club' })
    @ApiResponse({
        status: 201,
        description: 'Usuario asignado al rol exitosamente',
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'Sin permisos para actualizar roles' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'Rol no encontrado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    @ApiResponse({ status: 409, description: 'El rol no pertenece al club especificado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    assignUserToRole(@Body() assignUserRoleDto: AssignUserRoleDto) {
        return this.rolesService.assignUserToRole(assignUserRoleDto);
    }
} 