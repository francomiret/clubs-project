import { Injectable, Inject } from '@nestjs/common';
import { Payment } from '@prisma/client';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';
import { IPaymentsRepository, PAYMENTS_REPOSITORY } from './payments.repository';
import { PaginationQueryDto, PaginationService } from '../common';

@Injectable()
export class PaymentsService {
    constructor(
        @Inject(PAYMENTS_REPOSITORY)
        private readonly paymentsRepository: IPaymentsRepository,
        private readonly paginationService: PaginationService,
    ) { }

    async create(data: CreatePaymentDto): Promise<Payment> {
        return this.paymentsRepository.create(data);
    }

    async findAll(): Promise<Payment[]> {
        return this.paymentsRepository.findAll();
    }

    async findAllPaginated(query: PaginationQueryDto) {
        const { data, total } = await this.paymentsRepository.findAllPaginated(query);
        const { page, limit } = this.paginationService.parsePagination(query);

        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }

    async findOne(id: string): Promise<Payment | null> {
        return this.paymentsRepository.findOne(id);
    }

    async update(id: string, data: UpdatePaymentDto): Promise<Payment> {
        return this.paymentsRepository.update(id, data);
    }

    async remove(id: string): Promise<Payment> {
        return this.paymentsRepository.remove(id);
    }

    async findByClubId(clubId: string): Promise<Payment[]> {
        return this.paymentsRepository.findByClubId(clubId);
    }

    async findByClubIdPaginated(clubId: string, query: PaginationQueryDto) {
        const { data, total } = await this.paymentsRepository.findByClubIdPaginated(clubId, query);
        const { page, limit } = this.paginationService.parsePagination(query);

        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }

    async findByMemberId(memberId: string): Promise<Payment[]> {
        return this.paymentsRepository.findByMemberId(memberId);
    }

    async findByMemberIdPaginated(memberId: string, query: PaginationQueryDto) {
        const { data, total } = await this.paymentsRepository.findByMemberIdPaginated(memberId, query);
        const { page, limit } = this.paginationService.parsePagination(query);

        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }

    async findBySponsorId(sponsorId: string): Promise<Payment[]> {
        return this.paymentsRepository.findBySponsorId(sponsorId);
    }

    async findBySponsorIdPaginated(sponsorId: string, query: PaginationQueryDto) {
        const { data, total } = await this.paymentsRepository.findBySponsorIdPaginated(sponsorId, query);
        const { page, limit } = this.paginationService.parsePagination(query);

        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }
} 