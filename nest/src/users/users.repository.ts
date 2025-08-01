import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationQueryDto } from '../common';

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export interface IUsersRepository {
    create(data: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, data: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
    findByClubId(clubId: string): Promise<User[]>;
    findAllPaginated(query: PaginationQueryDto): Promise<{ data: User[]; total: number }>;
    findByClubIdPaginated(clubId: string, query: PaginationQueryDto): Promise<{ data: User[]; total: number }>;
}

@Injectable()
export class UsersRepository implements IUsersRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateUserDto): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findOne(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async update(id: string, data: UpdateUserDto): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async remove(id: string): Promise<User> {
        return this.prisma.user.delete({
            where: { id },
        });
    }

    async findByClubId(clubId: string): Promise<User[]> {
        return this.prisma.user.findMany({
            where: { clubId },
        });
    }

    async findAllPaginated(query: PaginationQueryDto): Promise<{ data: User[]; total: number }> {
        const { skip, take } = this.parsePagination(query);

        const [data, total] = await Promise.all([
            this.prisma.user.findMany({
                skip,
                take,
            }),
            this.prisma.user.count(),
        ]);

        return { data, total };
    }

    async findByClubIdPaginated(clubId: string, query: PaginationQueryDto): Promise<{ data: User[]; total: number }> {
        const { skip, take } = this.parsePagination(query);

        const [data, total] = await Promise.all([
            this.prisma.user.findMany({
                where: { clubId },
                skip,
                take,
            }),
            this.prisma.user.count({
                where: { clubId },
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