import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';
import { PaymentEntity } from './entities/payment.entity';
import { PaginationQueryDto, PaginationResponseDto, Paginated } from '../common';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo pago' })
    @ApiResponse({
        status: 201,
        description: 'Pago creado exitosamente',
        type: PaymentEntity,
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentsService.create(createPaymentDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los pagos' })
    @ApiResponse({
        status: 200,
        description: 'Lista de pagos obtenida exitosamente',
        type: [PaymentEntity],
    })
    findAll() {
        return this.paymentsService.findAll();
    }

    @Get('paginated')
    @Paginated()
    @ApiOperation({ summary: 'Obtener todos los pagos con paginación' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de pagos obtenida exitosamente',
        type: PaginationResponseDto,
    })
    findAllPaginated(@Query() query: PaginationQueryDto) {
        return this.paymentsService.findAllPaginated(query);
    }

    @Get('club/:clubId')
    @ApiOperation({ summary: 'Obtener pagos por club' })
    @ApiParam({ name: 'clubId', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Pagos del club obtenidos exitosamente',
        type: [PaymentEntity],
    })
    findByClubId(@Param('clubId') clubId: string) {
        return this.paymentsService.findByClubId(clubId);
    }

    @Get('club/:clubId/paginated')
    @Paginated()
    @ApiOperation({ summary: 'Obtener pagos por club con paginación' })
    @ApiParam({ name: 'clubId', description: 'ID del club' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de pagos del club obtenida exitosamente',
        type: PaginationResponseDto,
    })
    findByClubIdPaginated(@Param('clubId') clubId: string, @Query() query: PaginationQueryDto) {
        return this.paymentsService.findByClubIdPaginated(clubId, query);
    }

    @Get('member/:memberId')
    @ApiOperation({ summary: 'Obtener pagos por miembro' })
    @ApiParam({ name: 'memberId', description: 'ID del miembro' })
    @ApiResponse({
        status: 200,
        description: 'Pagos del miembro obtenidos exitosamente',
        type: [PaymentEntity],
    })
    findByMemberId(@Param('memberId') memberId: string) {
        return this.paymentsService.findByMemberId(memberId);
    }

    @Get('member/:memberId/paginated')
    @Paginated()
    @ApiOperation({ summary: 'Obtener pagos por miembro con paginación' })
    @ApiParam({ name: 'memberId', description: 'ID del miembro' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de pagos del miembro obtenida exitosamente',
        type: PaginationResponseDto,
    })
    findByMemberIdPaginated(@Param('memberId') memberId: string, @Query() query: PaginationQueryDto) {
        return this.paymentsService.findByMemberIdPaginated(memberId, query);
    }

    @Get('sponsor/:sponsorId')
    @ApiOperation({ summary: 'Obtener pagos por patrocinador' })
    @ApiParam({ name: 'sponsorId', description: 'ID del patrocinador' })
    @ApiResponse({
        status: 200,
        description: 'Pagos del patrocinador obtenidos exitosamente',
        type: [PaymentEntity],
    })
    findBySponsorId(@Param('sponsorId') sponsorId: string) {
        return this.paymentsService.findBySponsorId(sponsorId);
    }

    @Get('sponsor/:sponsorId/paginated')
    @Paginated()
    @ApiOperation({ summary: 'Obtener pagos por patrocinador con paginación' })
    @ApiParam({ name: 'sponsorId', description: 'ID del patrocinador' })
    @ApiResponse({
        status: 200,
        description: 'Lista paginada de pagos del patrocinador obtenida exitosamente',
        type: PaginationResponseDto,
    })
    findBySponsorIdPaginated(@Param('sponsorId') sponsorId: string, @Query() query: PaginationQueryDto) {
        return this.paymentsService.findBySponsorIdPaginated(sponsorId, query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un pago por ID' })
    @ApiParam({ name: 'id', description: 'ID del pago' })
    @ApiResponse({
        status: 200,
        description: 'Pago encontrado exitosamente',
        type: PaymentEntity,
    })
    @ApiResponse({ status: 404, description: 'Pago no encontrado' })
    findOne(@Param('id') id: string) {
        return this.paymentsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un pago' })
    @ApiParam({ name: 'id', description: 'ID del pago' })
    @ApiResponse({
        status: 200,
        description: 'Pago actualizado exitosamente',
        type: PaymentEntity,
    })
    @ApiResponse({ status: 404, description: 'Pago no encontrado' })
    update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
        return this.paymentsService.update(id, updatePaymentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un pago' })
    @ApiParam({ name: 'id', description: 'ID del pago' })
    @ApiResponse({
        status: 200,
        description: 'Pago eliminado exitosamente',
        type: PaymentEntity,
    })
    @ApiResponse({ status: 404, description: 'Pago no encontrado' })
    remove(@Param('id') id: string) {
        return this.paymentsService.remove(id);
    }
} 