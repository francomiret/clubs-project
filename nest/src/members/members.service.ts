import { Injectable, Inject } from '@nestjs/common';
import { Member } from '@prisma/client';
import { CreateMemberDto, UpdateMemberDto } from './dto';
import { IMembersRepository, MEMBERS_REPOSITORY } from './members.repository';
import { PaginationQueryDto, PaginationService } from '../common';

@Injectable()
export class MembersService {
    constructor(
        @Inject(MEMBERS_REPOSITORY)
        private readonly membersRepository: IMembersRepository,
        private readonly paginationService: PaginationService,
    ) { }

    async create(data: CreateMemberDto): Promise<Member> {
        return this.membersRepository.create(data);
    }

    async findAll(): Promise<Member[]> {
        return this.membersRepository.findAll();
    }

    async findAllPaginated(query: PaginationQueryDto) {
        const { data, total } = await this.membersRepository.findAllPaginated(query);
        const { page, limit } = this.paginationService.parsePagination(query);

        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }

    async findOne(id: string): Promise<Member | null> {
        return this.membersRepository.findOne(id);
    }

    async update(id: string, data: UpdateMemberDto): Promise<Member> {
        return this.membersRepository.update(id, data);
    }

    async remove(id: string): Promise<Member> {
        return this.membersRepository.remove(id);
    }

    async findByClubId(clubId: string): Promise<Member[]> {
        return this.membersRepository.findByClubId(clubId);
    }

    async findByClubIdPaginated(clubId: string, query: PaginationQueryDto) {
        const { data, total } = await this.membersRepository.findByClubIdPaginated(clubId, query);
        const { page, limit } = this.paginationService.parsePagination(query);

        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }
} 