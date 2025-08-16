import { Injectable, Inject } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto';
import { IUsersRepository, USERS_REPOSITORY } from './users.repository';
import { PaginationQueryDto, PaginationService, EntityNotFoundException } from '../common';

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

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOne(id);
        if (!user) {
            throw new EntityNotFoundException('Usuario', id);
        }
        return user;
    }

    async update(id: string, data: UpdateUserDto): Promise<User> {
        const user = await this.usersRepository.findOne(id);
        if (!user) {
            throw new EntityNotFoundException('Usuario', id);
        }
        return this.usersRepository.update(id, data);
    }

    async remove(id: string): Promise<User> {
        const user = await this.usersRepository.findOne(id);
        if (!user) {
            throw new EntityNotFoundException('Usuario', id);
        }
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

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findByEmail(email);
    }

    async findOneWithRoles(id: string) {
        return this.usersRepository.findOneWithRoles(id);
    }
} 