import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';
import { PaymentsRepository } from './payments.repository';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentType } from '@prisma/client';
import { PaymentFilterDto, PaymentSummaryDto, PaymentStatsDto } from './dto/payment-dashboard.dto';

@Injectable()
export class PaymentsService {
    constructor(private readonly paymentsRepository: PaymentsRepository) { }

    async create(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
        return this.paymentsRepository.create(createPaymentDto);
    }

    async findAll(filters: PaymentFilterDto = {}): Promise<PaymentEntity[]> {
        return this.paymentsRepository.findAll(filters);
    }

    async findOne(id: string): Promise<PaymentEntity> {
        try {
            return await this.paymentsRepository.findOne(id);
        } catch (error) {
            throw new NotFoundException(`Pago con ID ${id} no encontrado`);
        }
    }

    async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<PaymentEntity> {
        try {
            return await this.paymentsRepository.update(id, updatePaymentDto);
        } catch (error) {
            throw new NotFoundException(`Pago con ID ${id} no encontrado`);
        }
    }

    async remove(id: string): Promise<PaymentEntity> {
        try {
            return await this.paymentsRepository.remove(id);
        } catch (error) {
            throw new NotFoundException(`Pago con ID ${id} no encontrado`);
        }
    }

    async getDashboardSummary(clubId: string): Promise<PaymentSummaryDto> {
        return this.paymentsRepository.getDashboardSummary(clubId);
    }

    async getPaymentsByMember(clubId: string, memberId?: string): Promise<PaymentEntity[]> {
        return this.paymentsRepository.getPaymentsByMember(clubId, memberId);
    }

    async getPaymentsBySponsor(clubId: string, sponsorId?: string): Promise<PaymentEntity[]> {
        return this.paymentsRepository.getPaymentsBySponsor(clubId, sponsorId);
    }

    async getCategoryStats(clubId: string, type: PaymentType): Promise<PaymentStatsDto[]> {
        return this.paymentsRepository.getCategoryStats(clubId, type);
    }

    async getRecentTransactions(clubId: string, limit: number = 10): Promise<PaymentEntity[]> {
        return this.paymentsRepository.findAll({ clubId, limit });
    }

    async getIncomeVsExpenses(clubId: string, startDate: string, endDate: string): Promise<{
        income: number;
        expenses: number;
        balance: number;
    }> {
        const filters: PaymentFilterDto = { clubId, startDate, endDate };

        const [incomePayments, expensePayments] = await Promise.all([
            this.paymentsRepository.findAll({ ...filters, type: PaymentType.INCOME }),
            this.paymentsRepository.findAll({ ...filters, type: PaymentType.EXPENSE }),
        ]);

        const income = incomePayments.reduce((sum, payment) => sum + payment.amount, 0);
        const expenses = expensePayments.reduce((sum, payment) => sum + payment.amount, 0);

        return {
            income,
            expenses,
            balance: income - expenses,
        };
    }
} 