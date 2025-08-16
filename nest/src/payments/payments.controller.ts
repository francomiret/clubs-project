import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';
import { PaymentFilterDto } from './dto/payment-dashboard.dto';
import { PaymentType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post()
    @Roles('ADMIN', 'MANAGER')
    create(@Body() createPaymentDto: CreatePaymentDto, @CurrentUser() user: UserEntity) {
        return this.paymentsService.create(createPaymentDto);
    }

    @Get()
    findAll(@Query() filters: PaymentFilterDto) {
        return this.paymentsService.findAll(filters);
    }

    @Get('dashboard/:clubId')
    getDashboardSummary(@Param('clubId') clubId: string) {
        return this.paymentsService.getDashboardSummary(clubId);
    }

    @Get('members/:clubId')
    getPaymentsByMember(
        @Param('clubId') clubId: string,
        @Query('memberId') memberId?: string,
    ) {
        return this.paymentsService.getPaymentsByMember(clubId, memberId);
    }

    @Get('sponsors/:clubId')
    getPaymentsBySponsor(
        @Param('clubId') clubId: string,
        @Query('sponsorId') sponsorId?: string,
    ) {
        return this.paymentsService.getPaymentsBySponsor(clubId, sponsorId);
    }

    @Get('stats/:clubId/:type')
    getCategoryStats(
        @Param('clubId') clubId: string,
        @Param('type') type: PaymentType,
    ) {
        return this.paymentsService.getCategoryStats(clubId, type);
    }

    @Get('recent/:clubId')
    getRecentTransactions(
        @Param('clubId') clubId: string,
        @Query('limit') limit?: number,
    ) {
        return this.paymentsService.getRecentTransactions(clubId, limit);
    }

    @Get('income-vs-expenses/:clubId')
    getIncomeVsExpenses(
        @Param('clubId') clubId: string,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.paymentsService.getIncomeVsExpenses(clubId, startDate, endDate);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.paymentsService.findOne(id);
    }

    @Patch(':id')
    @Roles('ADMIN', 'MANAGER')
    update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
        return this.paymentsService.update(id, updatePaymentDto);
    }

    @Delete(':id')
    @Roles('ADMIN')
    remove(@Param('id') id: string) {
        return this.paymentsService.remove(id);
    }
} 