import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto, UpdateMemberDto } from './dto';
import { MemberEntity } from './entities/member.entity';
import { PaginationQueryDto, PaginationResponseDto, Paginated } from '../common';
import { AuthorizationGuard, RequirePermission } from '../auth/guards/authorization.guard';
import { CurrentUserRequest } from '../auth/decorators/current-user-request.decorator';

@ApiTags('members')
@UseGuards(AuthorizationGuard)
@ApiBearerAuth()
@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) { }

    @Post()
    @RequirePermission('members', 'read')
    @ApiOperation({ summary: 'Crear un nuevo miembro' })
    @ApiResponse({
        status: 201,
        description: 'Miembro creado exitosamente',
        type: MemberEntity,
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    create(@Body() createMemberDto: CreateMemberDto) {
        return this.membersService.create(createMemberDto);
    }

    @Get()
    @RequirePermission('members', 'read')
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
    @RequirePermission('members', 'read')
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
    @RequirePermission('members', 'read')
    @ApiOperation({ summary: 'Obtener un miembro por ID' })
    @ApiParam({ name: 'id', description: 'ID del miembro' })
    @ApiResponse({
        status: 200,
        description: 'Miembro encontrado exitosamente',
        type: MemberEntity,
    })
    @ApiResponse({ status: 404, description: 'Miembro no encontrado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    findOne(@Param('id') id: string) {
        return this.membersService.findOne(id);
    }

    @Patch(':id')
    @RequirePermission('members', 'read')
    @ApiOperation({ summary: 'Actualizar un miembro' })
    @ApiParam({ name: 'id', description: 'ID del miembro' })
    @ApiResponse({
        status: 200,
        description: 'Miembro actualizado exitosamente',
        type: MemberEntity,
    })
    @ApiResponse({ status: 404, description: 'Miembro no encontrado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
        return this.membersService.update(id, updateMemberDto);
    }

    @Delete(':id')
    @RequirePermission('members', 'read')
    @ApiOperation({ summary: 'Eliminar un miembro' })
    @ApiParam({ name: 'id', description: 'ID del miembro' })
    @ApiResponse({
        status: 200,
        description: 'Miembro eliminado exitosamente',
        type: MemberEntity,
    })
    @ApiResponse({ status: 404, description: 'Miembro no encontrado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    remove(@Param('id') id: string) {
        return this.membersService.remove(id);
    }
} 