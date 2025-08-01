import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ClubsService } from './clubs.service';
import { CreateClubDto, UpdateClubDto } from './dto';
import { ClubEntity } from './entities/club.entity';

@ApiTags('clubs')
@Controller('clubs')
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
    create(@Body() createClubDto: CreateClubDto) {
        return this.clubsService.create(createClubDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los clubs' })
    @ApiResponse({
        status: 200,
        description: 'Lista de clubs obtenida exitosamente',
        type: [ClubEntity],
    })
    findAll() {
        return this.clubsService.findAll();
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
    remove(@Param('id') id: string) {
        return this.clubsService.remove(id);
    }
} 