import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto, UpdateMemberDto } from './dto';
import { MemberEntity } from './entities/member.entity';
import { PaginationQueryDto, PaginationResponseDto, Paginated } from '../common';

@ApiTags('members')
@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo miembro' })
    @ApiResponse({
        status: 201,
        description: 'Miembro creado exitosamente',
        type: MemberEntity,
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    create(@Body() createMemberDto: CreateMemberDto) {
        return this.membersService.create(createMemberDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los miembros' })
    @ApiResponse({
        status: 200,
        description: 'Lista de miembros obtenida exitosamente',
        type: [MemberEntity],
    })
    findAll() {
        return this.membersService.findAll();
    }

    @Get('paginated')
    @Paginated()
    @ApiOperation({ summary: 'Obtener todos los miembros con paginación' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de miembros obtenida exitosamente',
        type: PaginationResponseDto,
    })
    findAllPaginated(@Query() query: PaginationQueryDto) {
        return this.membersService.findAllPaginated(query);
    }

    @Get('club/:clubId')
    @ApiOperation({ summary: 'Obtener miembros por club' })
    @ApiParam({ name: 'clubId', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Miembros del club obtenidos exitosamente',
        type: [MemberEntity],
    })
    findByClubId(@Param('clubId') clubId: string) {
        return this.membersService.findByClubId(clubId);
    }

    @Get('club/:clubId/paginated')
    @Paginated()
    @ApiOperation({ summary: 'Obtener miembros por club con paginación' })
    @ApiParam({ name: 'clubId', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de miembros del club obtenida exitosamente',
        type: PaginationResponseDto,
    })
    findByClubIdPaginated(@Param('clubId') clubId: string, @Query() query: PaginationQueryDto) {
        return this.membersService.findByClubIdPaginated(clubId, query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un miembro por ID' })
    @ApiParam({ name: 'id', description: 'ID del miembro' })
    @ApiResponse({
        status: 200,
        description: 'Miembro encontrado exitosamente',
        type: MemberEntity,
    })
    @ApiResponse({ status: 404, description: 'Miembro no encontrado' })
    findOne(@Param('id') id: string) {
        return this.membersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un miembro' })
    @ApiParam({ name: 'id', description: 'ID del miembro' })
    @ApiResponse({
        status: 200,
        description: 'Miembro actualizado exitosamente',
        type: MemberEntity,
    })
    @ApiResponse({ status: 404, description: 'Miembro no encontrado' })
    update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
        return this.membersService.update(id, updateMemberDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un miembro' })
    @ApiParam({ name: 'id', description: 'ID del miembro' })
    @ApiResponse({
        status: 200,
        description: 'Miembro eliminado exitosamente',
        type: MemberEntity,
    })
    @ApiResponse({ status: 404, description: 'Miembro no encontrado' })
    remove(@Param('id') id: string) {
        return this.membersService.remove(id);
    }
} 