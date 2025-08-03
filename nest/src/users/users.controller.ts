import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity } from './entities/user.entity';
import { PaginationQueryDto, PaginationResponseDto, Paginated } from '../common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @RequirePermissions('users.create')
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({
        status: 201,
        description: 'Usuario creado exitosamente',
        type: UserEntity,
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 403, description: 'Sin permisos para crear usuarios' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @RequirePermissions('users.read')
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({
        status: 200,
        description: 'Lista de usuarios obtenida exitosamente',
        type: [UserEntity],
    })
    @ApiResponse({ status: 403, description: 'Sin permisos para leer usuarios' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get('paginated')
    @RequirePermissions('users.read')
    @Paginated()
    @ApiOperation({ summary: 'Obtener todos los usuarios con paginación' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de usuarios obtenida exitosamente',
        type: PaginationResponseDto,
    })
    @ApiResponse({ status: 403, description: 'Sin permisos para leer usuarios' })
    findAllPaginated(@Query() query: PaginationQueryDto) {
        return this.usersService.findAllPaginated(query);
    }

    @Get('club/:clubId')
    @RequirePermissions('users.read')
    @ApiOperation({ summary: 'Obtener usuarios por club' })
    @ApiParam({ name: 'clubId', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Usuarios del club obtenidos exitosamente',
        type: [UserEntity],
    })
    @ApiResponse({ status: 403, description: 'Sin permisos para leer usuarios' })
    findByClubId(@Param('clubId') clubId: string) {
        return this.usersService.findByClubId(clubId);
    }

    @Get('club/:clubId/paginated')
    @RequirePermissions('users.read')
    @Paginated()
    @ApiOperation({ summary: 'Obtener usuarios por club con paginación' })
    @ApiParam({ name: 'clubId', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de usuarios del club obtenida exitosamente',
        type: PaginationResponseDto,
    })
    @ApiResponse({ status: 403, description: 'Sin permisos para leer usuarios' })
    findByClubIdPaginated(@Param('clubId') clubId: string, @Query() query: PaginationQueryDto) {
        return this.usersService.findAllPaginated(query);
    }

    @Get(':id')
    @RequirePermissions('users.read')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    @ApiResponse({
        status: 200,
        description: 'Usuario encontrado exitosamente',
        type: UserEntity,
    })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiResponse({ status: 403, description: 'Sin permisos para leer usuarios' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @RequirePermissions('users.update')
    @ApiOperation({ summary: 'Actualizar un usuario' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    @ApiResponse({
        status: 200,
        description: 'Usuario actualizado exitosamente',
        type: UserEntity,
    })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiResponse({ status: 403, description: 'Sin permisos para actualizar usuarios' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @RequirePermissions('users.delete')
    @ApiOperation({ summary: 'Eliminar un usuario' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    @ApiResponse({
        status: 200,
        description: 'Usuario eliminado exitosamente',
        type: UserEntity,
    })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiResponse({ status: 403, description: 'Sin permisos para eliminar usuarios' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
} 