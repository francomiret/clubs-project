import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Payment } from '@prisma/client';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';
import { PaginationQueryDto } from '../common';

export const PAYMENTS_REPOSITORY = 'PAYMENTS_REPOSITORY';

export interface IPaymentsRepository {
    create(data: CreatePaymentDto): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    findOne(id: string): Promise<Payment | null>;
    update(id: string, data: UpdatePaymentDto): Promise<Payment>;
    remove(id: string): Promise<Payment>;
    findByClubId(clubId: string): Promise<Payment[]>;
    findByMemberId(memberId: string): Promise<Payment[]>;
    findBySponsorId(sponsorId: string): Promise<Payment[]>;
    findAllPaginated(query: PaginationQueryDto): Promise<{ data: Payment[]; total: number }>;
    findByClubIdPaginated(clubId: string, query: PaginationQueryDto): Promise<{ data: Payment[]; total: number }>;
    findByMemberIdPaginated(memberId: string, query: PaginationQueryDto): Promise<{ data: Payment[]; total: number }>;
    findBySponsorIdPaginated(sponsorId: string, query: PaginationQueryDto): Promise<{ data: Payment[]; total: number }>;
}

@Injectable()
export class PaymentsRepository implements IPaymentsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreatePaymentDto): Promise<Payment> {
        return this.prisma.payment.create({
            data,
        });
    }

    async findAll(): Promise<Payment[]> {
        return this.prisma.payment.findMany();
    }

    async findOne(id: string): Promise<Payment | null> {
        return this.prisma.payment.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: UpdatePaymentDto): Promise<Payment> {
        return this.prisma.payment.update({
            where: { id },
            data,
        });
    }

    async remove(id: string): Promise<Payment> {
        return this.prisma.payment.delete({
            where: { id },
        });
    }

    async findByClubId(clubId: string): Promise<Payment[]> {
        return this.prisma.payment.findMany({
            where: { clubId },
        });
    }

    async findByMemberId(memberId: string): Promise<Payment[]> {
        return this.prisma.payment.findMany({
            where: { memberId },
        });
    }

    async findBySponsorId(sponsorId: string): Promise<Payment[]> {
        return this.prisma.payment.findMany({
            where: { sponsorId },
        });
    }

    async findAllPaginated(query: PaginationQueryDto): Promise<{ data: Payment[]; total: number }> {
        const { skip, take } = this.parsePagination(query);

        const [data, total] = await Promise.all([
            this.prisma.payment.findMany({
                skip,
                take,
            }),
            this.prisma.payment.count(),
        ]);

        return { data, total };
    }

    async findByClubIdPaginated(clubId: string, query: PaginationQueryDto): Promise<{ data: Payment[]; total: number }> {
        const { skip, take } = this.parsePagination(query);

        const [data, total] = await Promise.all([
            this.prisma.payment.findMany({
                where: { clubId },
                skip,
                take,
            }),
            this.prisma.payment.count({
                where: { clubId },
            }),
        ]);

        return { data, total };
    }

    async findByMemberIdPaginated(memberId: string, query: PaginationQueryDto): Promise<{ data: Payment[]; total: number }> {
        const { skip, take } = this.parsePagination(query);

        const [data, total] = await Promise.all([
            this.prisma.payment.findMany({
                where: { memberId },
                skip,
                take,
            }),
            this.prisma.payment.count({
                where: { memberId },
            }),
        ]);

        return { data, total };
    }

    async findBySponsorIdPaginated(sponsorId: string, query: PaginationQueryDto): Promise<{ data: Payment[]; total: number }> {
        const { skip, take } = this.parsePagination(query);

        const [data, total] = await Promise.all([
            this.prisma.payment.findMany({
                where: { sponsorId },
                skip,
                take,
            }),
            this.prisma.payment.count({
                where: { sponsorId },
            }),
        ]);

        return { data, total };
    }

    private parsePagination(query: PaginationQueryDto) {
        const page = parseInt(query.page?.toString() || '1');
        const limit = parseInt(query.limit?.toString() || '10');
        const skip = (page - 1) * limit;

        return { skip, take: limit };
    }
} 