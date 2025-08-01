import { Injectable, Inject } from '@nestjs/common';
import { Club } from '@prisma/client';
import { CreateClubDto, UpdateClubDto } from './dto';
import { IClubsRepository, CLUBS_REPOSITORY } from './clubs.repository';
import { PaginationQueryDto, PaginationService, EntityNotFoundException } from '../common';

@Injectable()
export class ClubsService {
    constructor(
        @Inject(CLUBS_REPOSITORY)
        private readonly clubsRepository: IClubsRepository,
        private readonly paginationService: PaginationService,
    ) { }

    async create(data: CreateClubDto): Promise<Club> {
        return this.clubsRepository.create(data);
    }

    async findAll(): Promise<Club[]> {
        return this.clubsRepository.findAllWithRelations();
    }

    async findAllPaginated(query: PaginationQueryDto) {
        const { data, total } = await this.clubsRepository.findAllWithRelationsPaginated(query);
        const { page, limit } = this.paginationService.parsePagination(query);

        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }

    async findOne(id: string): Promise<Club> {
        const club = await this.clubsRepository.findByIdWithRelations(id);
        if (!club) {
            throw new EntityNotFoundException('Club', id);
        }
        return club;
    }

    async update(id: string, data: UpdateClubDto): Promise<Club> {
        const club = await this.clubsRepository.findByIdWithRelations(id);
        if (!club) {
            throw new EntityNotFoundException('Club', id);
        }
        return this.clubsRepository.update(id, data);
    }

    async remove(id: string): Promise<Club> {
        const club = await this.clubsRepository.findByIdWithRelations(id);
        if (!club) {
            throw new EntityNotFoundException('Club', id);
        }
        return this.clubsRepository.remove(id);
    }
} 