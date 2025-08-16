import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto, AssignUserRoleDto } from './dto';
import { RoleEntity } from './entities/role.entity';
import { PaginationQueryDto, PaginationResponseDto, Paginated } from '../common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@ApiTags('roles')
@ApiBearerAuth()
@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo rol' })
    @ApiResponse({
        status: 201,
        description: 'Rol creado exitosamente',
        type: RoleEntity,
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    @ApiResponse({ status: 409, description: 'El rol ya existe en este club' })
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los roles' })
    @ApiResponse({
        status: 200,
        description: 'Lista de roles obtenida exitosamente',
        type: [RoleEntity],
    })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    findAll() {
        return this.rolesService.findAll();
    }

    @Get('my-club')
    @ApiOperation({ summary: 'Obtener roles del club del usuario actual' })
    @ApiResponse({
        status: 200,
        description: 'Roles del club del usuario obtenidos exitosamente',
        type: [RoleEntity],
    })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    findMyClubRoles(@CurrentUser() user: UserEntity) {
        // Obtener el primer club del usuario (asumiendo que un usuario solo puede estar en un club)
        const userClub = user.clubs?.[0];
        if (!userClub) {
            throw new Error('Usuario no pertenece a ningún club');
        }
        return this.rolesService.findByClubId(userClub.clubId);
    }

    @Get('paginated')
    @Paginated()
    @ApiOperation({ summary: 'Obtener todos los roles con paginación' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de roles obtenida exitosamente',
        type: PaginationResponseDto,
    })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    findAllPaginated(@Query() query: PaginationQueryDto) {
        return this.rolesService.findAllPaginated(query);
    }

    @Get('club/:clubId')
    @ApiOperation({ summary: 'Obtener roles por club' })
    @ApiParam({ name: 'clubId', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Roles del club obtenidos exitosamente',
        type: [RoleEntity],
    })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    findByClubId(@Param('clubId') clubId: string) {
        return this.rolesService.findByClubId(clubId);
    }

    @Get('club/:clubId/paginated')
    @Paginated()
    @ApiOperation({ summary: 'Obtener roles por club con paginación' })
    @ApiParam({ name: 'clubId', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de roles del club obtenida exitosamente',
        type: PaginationResponseDto,
    })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    findByClubIdPaginated(@Param('clubId') clubId: string, @Query() query: PaginationQueryDto) {
        return this.rolesService.findByClubIdPaginated(clubId, query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un rol por ID' })
    @ApiParam({ name: 'id', description: 'ID del rol' })
    @ApiResponse({
        status: 200,
        description: 'Rol encontrado exitosamente',
        type: RoleEntity,
    })
    @ApiResponse({ status: 404, description: 'Rol no encontrado' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    findOne(@Param('id') id: string) {
        return this.rolesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un rol' })
    @ApiParam({ name: 'id', description: 'ID del rol' })
    @ApiResponse({
        status: 200,
        description: 'Rol actualizado exitosamente',
        type: RoleEntity,
    })
    @ApiResponse({ status: 404, description: 'Rol no encontrado' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    @ApiResponse({ status: 409, description: 'El rol ya existe en este club' })
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(id, updateRoleDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un rol' })
    @ApiParam({ name: 'id', description: 'ID del rol' })
    @ApiResponse({
        status: 200,
        description: 'Rol eliminado exitosamente',
        type: RoleEntity,
    })
    @ApiResponse({ status: 404, description: 'Rol no encontrado' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    remove(@Param('id') id: string) {
        return this.rolesService.remove(id);
    }

    @Post('assign-user')
    @ApiOperation({ summary: 'Asignar un usuario a un rol' })
    @ApiResponse({
        status: 201,
        description: 'Usuario asignado al rol exitosamente',
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    @ApiResponse({ status: 404, description: 'Usuario o rol no encontrado' })
    @ApiResponse({ status: 409, description: 'El usuario ya tiene un rol en este club' })
    assignUserToRole(@Body() assignUserRoleDto: AssignUserRoleDto) {
        return this.rolesService.assignUserToRole(assignUserRoleDto);
    }
} 