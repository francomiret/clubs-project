import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentFilterDto, PaymentSummaryDto, PaymentStatsDto } from './dto/payment-dashboard.dto';
import { PaymentType } from '@prisma/client';

@Injectable()
export class PaymentsRepository {
    constructor(private prisma: PrismaService) { }

    async create(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
        const payment = await this.prisma.payment.create({
            data: createPaymentDto,
            include: {
                member: true,
                sponsor: true,
            },
        });

        return this.mapToEntity(payment);
    }

    async findAll(filters: PaymentFilterDto = {}): Promise<PaymentEntity[]> {
        const where: any = {};

        if (filters.clubId) where.clubId = filters.clubId;
        if (filters.type) where.type = filters.type;
        if (filters.memberId) where.memberId = filters.memberId;
        if (filters.sponsorId) where.sponsorId = filters.sponsorId;
        if (filters.category) where.category = filters.category;
        if (filters.startDate || filters.endDate) {
            where.date = {};
            if (filters.startDate) where.date.gte = new Date(filters.startDate);
            if (filters.endDate) where.date.lte = new Date(filters.endDate);
        }

        const payments = await this.prisma.payment.findMany({
            where,
            include: {
                member: true,
                sponsor: true,
            },
            orderBy: { date: 'desc' },
            skip: filters.page && filters.limit ? (filters.page - 1) * filters.limit : 0,
            take: filters.limit,
        });

        return payments.map(payment => this.mapToEntity(payment));
    }

    async findOne(id: string): Promise<PaymentEntity> {
        const payment = await this.prisma.payment.findUniqueOrThrow({
            where: { id },
            include: {
                member: true,
                sponsor: true,
            },
        });

        return this.mapToEntity(payment);
    }

    async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<PaymentEntity> {
        const payment = await this.prisma.payment.update({
            where: { id },
            data: updatePaymentDto,
            include: {
                member: true,
                sponsor: true,
            },
        });

        return this.mapToEntity(payment);
    }

    async remove(id: string): Promise<PaymentEntity> {
        const payment = await this.prisma.payment.delete({
            where: { id },
        });

        return this.mapToEntity(payment);
    }

    async getDashboardSummary(clubId: string): Promise<PaymentSummaryDto> {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const [
            totalIncome,
            totalExpenses,
            monthlyIncome,
            monthlyExpenses,
            incomeCount,
            expenseCount,
            totalCount
        ] = await Promise.all([
            this.prisma.payment.aggregate({
                where: { clubId, type: PaymentType.INCOME, isActive: true },
                _sum: { amount: true },
            }),
            this.prisma.payment.aggregate({
                where: { clubId, type: PaymentType.EXPENSE, isActive: true },
                _sum: { amount: true },
            }),
            this.prisma.payment.aggregate({
                where: {
                    clubId,
                    type: PaymentType.INCOME,
                    isActive: true,
                    date: { gte: startOfMonth, lte: endOfMonth }
                },
                _sum: { amount: true },
            }),
            this.prisma.payment.aggregate({
                where: {
                    clubId,
                    type: PaymentType.EXPENSE,
                    isActive: true,
                    date: { gte: startOfMonth, lte: endOfMonth }
                },
                _sum: { amount: true },
            }),
            this.prisma.payment.count({
                where: { clubId, type: PaymentType.INCOME, isActive: true },
            }),
            this.prisma.payment.count({
                where: { clubId, type: PaymentType.EXPENSE, isActive: true },
            }),
            this.prisma.payment.count({
                where: { clubId, isActive: true },
            }),
        ]);

        const totalIncomeAmount = totalIncome._sum.amount || 0;
        const totalExpensesAmount = totalExpenses._sum.amount || 0;
        const monthlyIncomeAmount = monthlyIncome._sum.amount || 0;
        const monthlyExpensesAmount = monthlyExpenses._sum.amount || 0;

        return {
            totalIncome: totalIncomeAmount,
            totalExpenses: totalExpensesAmount,
            balance: totalIncomeAmount - totalExpensesAmount,
            monthlyIncome: monthlyIncomeAmount,
            monthlyExpenses: monthlyExpensesAmount,
            monthlyBalance: monthlyIncomeAmount - monthlyExpensesAmount,
            incomeCount,
            expenseCount,
            totalCount,
        };
    }

    async getPaymentsByMember(clubId: string, memberId?: string): Promise<PaymentEntity[]> {
        const where: any = { clubId, type: PaymentType.INCOME, isActive: true };
        if (memberId) where.memberId = memberId;

        const payments = await this.prisma.payment.findMany({
            where,
            include: {
                member: true,
                sponsor: true,
            },
            orderBy: { date: 'desc' },
        });

        return payments.map(payment => this.mapToEntity(payment));
    }

    async getPaymentsBySponsor(clubId: string, sponsorId?: string): Promise<PaymentEntity[]> {
        const where: any = { clubId, type: PaymentType.INCOME, isActive: true };
        if (sponsorId) where.sponsorId = sponsorId;

        const payments = await this.prisma.payment.findMany({
            where,
            include: {
                member: true,
                sponsor: true,
            },
            orderBy: { date: 'desc' },
        });

        return payments.map(payment => this.mapToEntity(payment));
    }

    async getCategoryStats(clubId: string, type: PaymentType): Promise<PaymentStatsDto[]> {
        const payments = await this.prisma.payment.findMany({
            where: { clubId, type, isActive: true },
            select: { category: true, amount: true },
        });

        const categoryMap = new Map<string, { total: number; count: number }>();

        payments.forEach(payment => {
            const category = payment.category || 'Sin categoría';
            const current = categoryMap.get(category) || { total: 0, count: 0 };
            current.total += payment.amount;
            current.count += 1;
            categoryMap.set(category, current);
        });

        const totalAmount = Array.from(categoryMap.values()).reduce((sum, item) => sum + item.total, 0);

        return Array.from(categoryMap.entries()).map(([category, stats]) => ({
            category,
            total: stats.total,
            count: stats.count,
            percentage: totalAmount > 0 ? (stats.total / totalAmount) * 100 : 0,
        })).sort((a, b) => b.total - a.total);
    }

    private mapToEntity(payment: any): PaymentEntity {
        return {
            id: payment.id,
            amount: payment.amount,
            type: payment.type as PaymentType,
            category: payment.category,
            description: payment.description,
            date: payment.date,
            memberId: payment.memberId,
            sponsorId: payment.sponsorId,
            clubId: payment.clubId,
            isActive: payment.isActive,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
        };
    }
} 