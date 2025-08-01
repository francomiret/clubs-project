import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity } from './entities/user.entity';
import { PaginationQueryDto, PaginationResponseDto, Paginated } from '../common';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({
        status: 201,
        description: 'Usuario creado exitosamente',
        type: UserEntity,
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({
        status: 200,
        description: 'Lista de usuarios obtenida exitosamente',
        type: [UserEntity],
    })
    findAll() {
        return this.usersService.findAll();
    }

    @Get('paginated')
    @Paginated()
    @ApiOperation({ summary: 'Obtener todos los usuarios con paginación' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de usuarios obtenida exitosamente',
        type: PaginationResponseDto,
    })
    findAllPaginated(@Query() query: PaginationQueryDto) {
        return this.usersService.findAllPaginated(query);
    }

    @Get('club/:clubId')
    @ApiOperation({ summary: 'Obtener usuarios por club' })
    @ApiParam({ name: 'clubId', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Usuarios del club obtenidos exitosamente',
        type: [UserEntity],
    })
    findByClubId(@Param('clubId') clubId: string) {
        return this.usersService.findByClubId(clubId);
    }

    @Get('club/:clubId/paginated')
    @Paginated()
    @ApiOperation({ summary: 'Obtener usuarios por club con paginación' })
    @ApiParam({ name: 'clubId', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de usuarios del club obtenida exitosamente',
        type: PaginationResponseDto,
    })
    findByClubIdPaginated(@Param('clubId') clubId: string, @Query() query: PaginationQueryDto) {
        return this.usersService.findByClubIdPaginated(clubId, query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    @ApiResponse({
        status: 200,
        description: 'Usuario encontrado exitosamente',
        type: UserEntity,
    })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un usuario' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    @ApiResponse({
        status: 200,
        description: 'Usuario actualizado exitosamente',
        type: UserEntity,
    })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    @ApiResponse({
        status: 200,
        description: 'Usuario eliminado exitosamente',
        type: UserEntity,
    })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
} 