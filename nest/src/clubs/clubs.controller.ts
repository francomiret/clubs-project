import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ClubsService } from './clubs.service';
import { CreateClubDto, UpdateClubDto } from './dto';
import { ClubEntity } from './entities/club.entity';
import { PaginationQueryDto, PaginationResponseDto, Paginated } from '../common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUserRequest } from '../auth/decorators/current-user-request.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@ApiTags('clubs')
@Controller('clubs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ClubsController {
    constructor(private readonly clubsService: ClubsService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo club', description: 'Crea un nuevo club con los datos proporcionados', })
    @ApiResponse({
        status: 201,
        description: 'Club creado exitosamente',
        type: ClubEntity,
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    create(@Body() createClubDto: CreateClubDto, @CurrentUserRequest() user: any) {
        return this.clubsService.create(createClubDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los clubs' })
    @ApiResponse({
        status: 200,
        description: 'Lista de clubs obtenida exitosamente',
        type: [ClubEntity],
    })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    findAll() {
        return this.clubsService.findAll();
    }

    @Get('paginated')
    @Paginated()
    @ApiOperation({ summary: 'Obtener todos los clubs con paginación' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de clubs obtenida exitosamente',
        type: PaginationResponseDto,
    })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    findAllPaginated(@Query() query: PaginationQueryDto) {
        return this.clubsService.findAllPaginated(query);
    }

    @Get('my-club')
    @ApiOperation({ summary: 'Obtener el club del usuario actual' })
    @ApiResponse({
        status: 200,
        description: 'Club del usuario obtenido exitosamente',
        type: ClubEntity,
    })
    @ApiResponse({ status: 404, description: 'Club no encontrado' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    async getMyClub(@CurrentUser() user: UserEntity) {
        // Obtener el primer club del usuario (asumiendo que un usuario solo puede estar en un club)
        const userClub = user.clubs?.[0];
        if (!userClub) {
            throw new Error('Usuario no pertenece a ningún club');
        }
        return this.clubsService.findOne(userClub.clubId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un club por ID' })
    @ApiParam({ name: 'id', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Club encontrado exitosamente',
        type: ClubEntity,
    })
    @ApiResponse({ status: 404, description: 'Club no encontrado' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    findOne(@Param('id') id: string) {
        return this.clubsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un club' })
    @ApiParam({ name: 'id', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Club actualizado exitosamente',
        type: ClubEntity,
    })
    @ApiResponse({ status: 404, description: 'Club no encontrado' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
        return this.clubsService.update(id, updateClubDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un club' })
    @ApiParam({ name: 'id', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Club eliminado exitosamente',
        type: ClubEntity,
    })
    @ApiResponse({ status: 404, description: 'Club no encontrado' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    remove(@Param('id') id: string) {
        return this.clubsService.remove(id);
    }
} 