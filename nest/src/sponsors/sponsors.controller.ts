import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { SponsorsService } from './sponsors.service';
import { CreateSponsorDto, UpdateSponsorDto } from './dto';
import { SponsorEntity } from './entities/sponsor.entity';
import { PaginationQueryDto, PaginationResponseDto, Paginated } from '../common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUserRequest } from '../auth/decorators/current-user-request.decorator';

@ApiTags('sponsors')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('sponsors')
export class SponsorsController {
    constructor(private readonly sponsorsService: SponsorsService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo patrocinador' })
    @ApiResponse({
        status: 201,
        description: 'Patrocinador creado exitosamente',
        type: SponsorEntity,
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    create(@Body() createSponsorDto: CreateSponsorDto) {
        return this.sponsorsService.create(createSponsorDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los patrocinadores' })
    @ApiResponse({
        status: 200,
        description: 'Lista de patrocinadores obtenida exitosamente',
        type: [SponsorEntity],
    })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    findAll() {
        return this.sponsorsService.findAll();
    }

    @Get('paginated')
    @Paginated()
    @ApiOperation({ summary: 'Obtener todos los patrocinadores con paginación' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de patrocinadores obtenida exitosamente',
        type: PaginationResponseDto,
    })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    findAllPaginated(@Query() query: PaginationQueryDto) {
        return this.sponsorsService.findAllPaginated(query);
    }

    @Get('club/:clubId')
    @ApiOperation({ summary: 'Obtener patrocinadores por club' })
    @ApiParam({ name: 'clubId', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Patrocinadores del club obtenidos exitosamente',
        type: [SponsorEntity],
    })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    findByClubId(@Param('clubId') clubId: string) {
        return this.sponsorsService.findByClubId(clubId);
    }

    @Get('club/:clubId/paginated')
    @Paginated()
    @ApiOperation({ summary: 'Obtener patrocinadores por club con paginación' })
    @ApiParam({ name: 'clubId', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de patrocinadores del club obtenida exitosamente',
        type: PaginationResponseDto,
    })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    findByClubIdPaginated(@Param('clubId') clubId: string, @Query() query: PaginationQueryDto) {
        return this.sponsorsService.findByClubIdPaginated(clubId, query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un patrocinador por ID' })
    @ApiParam({ name: 'id', description: 'ID del patrocinador' })
    @ApiResponse({
        status: 200,
        description: 'Patrocinador encontrado exitosamente',
        type: SponsorEntity,
    })
    @ApiResponse({ status: 404, description: 'Patrocinador no encontrado' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    findOne(@Param('id') id: string) {
        return this.sponsorsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un patrocinador' })
    @ApiParam({ name: 'id', description: 'ID del patrocinador' })
    @ApiResponse({
        status: 200,
        description: 'Patrocinador actualizado exitosamente',
        type: SponsorEntity,
    })
    @ApiResponse({ status: 404, description: 'Patrocinador no encontrado' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    update(@Param('id') id: string, @Body() updateSponsorDto: UpdateSponsorDto) {
        return this.sponsorsService.update(id, updateSponsorDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un patrocinador' })
    @ApiParam({ name: 'id', description: 'ID del patrocinador' })
    @ApiResponse({
        status: 200,
        description: 'Patrocinador eliminado exitosamente',
        type: SponsorEntity,
    })
    @ApiResponse({ status: 404, description: 'Patrocinador no encontrado' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    remove(@Param('id') id: string) {
        return this.sponsorsService.remove(id);
    }
} 