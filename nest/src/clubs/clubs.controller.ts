import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ClubsService } from './clubs.service';
import { CreateClubDto, UpdateClubDto } from './dto';
import { ClubEntity } from './entities/club.entity';
import { PaginationQueryDto, PaginationResponseDto, Paginated } from '../common';
import { AuthorizationGuard, RequirePermission } from '../auth/guards/authorization.guard';
import { CurrentUserRequest } from '../auth/decorators/current-user-request.decorator';

@ApiTags('clubs')
@Controller('clubs')
@UseGuards(AuthorizationGuard)
@ApiBearerAuth()
export class ClubsController {
    constructor(private readonly clubsService: ClubsService) { }

    @Post()
    @RequirePermission('clubs', 'create')
    @ApiOperation({ summary: 'Crear un nuevo club', description: 'Crea un nuevo club con los datos proporcionados', })
    @ApiResponse({
        status: 201,
        description: 'Club creado exitosamente',
        type: ClubEntity,
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    create(@Body() createClubDto: CreateClubDto, @CurrentUserRequest() user: any) {
        return this.clubsService.create(createClubDto);
    }

    @Get()
    @RequirePermission('clubs', 'read')
    @ApiOperation({ summary: 'Obtener todos los clubs' })
    @ApiResponse({
        status: 200,
        description: 'Lista de clubs obtenida exitosamente',
        type: [ClubEntity],
    })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    findAll() {
        return this.clubsService.findAll();
    }

    @Get('paginated')
    @RequirePermission('clubs', 'read')
    @Paginated()
    @ApiOperation({ summary: 'Obtener todos los clubs con paginación' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de clubs obtenida exitosamente',
        type: PaginationResponseDto,
    })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    findAllPaginated(@Query() query: PaginationQueryDto) {
        return this.clubsService.findAllPaginated(query);
    }

    @Get(':id')
    @RequirePermission('clubs', 'read')
    @ApiOperation({ summary: 'Obtener un club por ID' })
    @ApiParam({ name: 'id', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Club encontrado exitosamente',
        type: ClubEntity,
    })
    @ApiResponse({ status: 404, description: 'Club no encontrado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    findOne(@Param('id') id: string) {
        return this.clubsService.findOne(id);
    }

    @Patch(':id')
    @RequirePermission('clubs', 'update')
    @ApiOperation({ summary: 'Actualizar un club' })
    @ApiParam({ name: 'id', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Club actualizado exitosamente',
        type: ClubEntity,
    })
    @ApiResponse({ status: 404, description: 'Club no encontrado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
        return this.clubsService.update(id, updateClubDto);
    }

    @Delete(':id')
    @RequirePermission('clubs', 'delete')
    @ApiOperation({ summary: 'Eliminar un club' })
    @ApiParam({ name: 'id', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Club eliminado exitosamente',
        type: ClubEntity,
    })
    @ApiResponse({ status: 404, description: 'Club no encontrado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    remove(@Param('id') id: string) {
        return this.clubsService.remove(id);
    }
} 