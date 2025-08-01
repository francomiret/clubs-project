import { Injectable, Inject } from '@nestjs/common';
import { Sponsor } from '@prisma/client';
import { CreateSponsorDto, UpdateSponsorDto } from './dto';
import { ISponsorsRepository, SPONSORS_REPOSITORY } from './sponsors.repository';
import { PaginationQueryDto, PaginationService } from '../common';

@Injectable()
export class SponsorsService {
    constructor(
        @Inject(SPONSORS_REPOSITORY)
        private readonly sponsorsRepository: ISponsorsRepository,
        private readonly paginationService: PaginationService,
    ) { }

    async create(data: CreateSponsorDto): Promise<Sponsor> {
        return this.sponsorsRepository.create(data);
    }

    async findAll(): Promise<Sponsor[]> {
        return this.sponsorsRepository.findAll();
    }

    async findAllPaginated(query: PaginationQueryDto) {
        const { data, total } = await this.sponsorsRepository.findAllPaginated(query);
        const { page, limit } = this.paginationService.parsePagination(query);

        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }

    async findOne(id: string): Promise<Sponsor | null> {
        return this.sponsorsRepository.findOne(id);
    }

    async update(id: string, data: UpdateSponsorDto): Promise<Sponsor> {
        return this.sponsorsRepository.update(id, data);
    }

    async remove(id: string): Promise<Sponsor> {
        return this.sponsorsRepository.remove(id);
    }

    async findByClubId(clubId: string): Promise<Sponsor[]> {
        return this.sponsorsRepository.findByClubId(clubId);
    }

    async findByClubIdPaginated(clubId: string, query: PaginationQueryDto) {
        const { data, total } = await this.sponsorsRepository.findByClubIdPaginated(clubId, query);
        const { page, limit } = this.paginationService.parsePagination(query);

        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }
} 