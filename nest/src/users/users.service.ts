import { Injectable, Inject } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto';
import { IUsersRepository, USERS_REPOSITORY } from './users.repository';
import { PaginationQueryDto, PaginationService } from '../common';

@Injectable()
export class UsersService {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: IUsersRepository,
        private readonly paginationService: PaginationService,
    ) { }

    async create(data: CreateUserDto): Promise<User> {
        return this.usersRepository.create(data);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.findAll();
    }

    async findAllPaginated(query: PaginationQueryDto) {
        const { data, total } = await this.usersRepository.findAllPaginated(query);
        const { page, limit } = this.paginationService.parsePagination(query);

        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }

    async findOne(id: string): Promise<User | null> {
        return this.usersRepository.findOne(id);
    }

    async update(id: string, data: UpdateUserDto): Promise<User> {
        return this.usersRepository.update(id, data);
    }

    async remove(id: string): Promise<User> {
        return this.usersRepository.remove(id);
    }

    async findByClubId(clubId: string): Promise<User[]> {
        return this.usersRepository.findByClubId(clubId);
    }

    async findByClubIdPaginated(clubId: string, query: PaginationQueryDto) {
        const { data, total } = await this.usersRepository.findByClubIdPaginated(clubId, query);
        const { page, limit } = this.paginationService.parsePagination(query);

        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }
} 