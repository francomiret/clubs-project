import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Member } from '@prisma/client';
import { CreateMemberDto, UpdateMemberDto } from './dto';
import { PaginationQueryDto } from '../common';

export const MEMBERS_REPOSITORY = 'MEMBERS_REPOSITORY';

export interface IMembersRepository {
    create(data: CreateMemberDto): Promise<Member>;
    findAll(): Promise<Member[]>;
    findOne(id: string): Promise<Member | null>;
    update(id: string, data: UpdateMemberDto): Promise<Member>;
    remove(id: string): Promise<Member>;
    findByClubId(clubId: string): Promise<Member[]>;
    findAllPaginated(query: PaginationQueryDto): Promise<{ data: Member[]; total: number }>;
    findByClubIdPaginated(clubId: string, query: PaginationQueryDto): Promise<{ data: Member[]; total: number }>;
}

@Injectable()
export class MembersRepository implements IMembersRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateMemberDto): Promise<Member> {
        return this.prisma.member.create({
            data,
        });
    }

    async findAll(): Promise<Member[]> {
        return this.prisma.member.findMany();
    }

    async findOne(id: string): Promise<Member | null> {
        return this.prisma.member.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: UpdateMemberDto): Promise<Member> {
        return this.prisma.member.update({
            where: { id },
            data,
        });
    }

    async remove(id: string): Promise<Member> {
        return this.prisma.member.delete({
            where: { id },
        });
    }

    async findByClubId(clubId: string): Promise<Member[]> {
        return this.prisma.member.findMany({
            where: { clubId },
        });
    }

    async findAllPaginated(query: PaginationQueryDto): Promise<{ data: Member[]; total: number }> {
        const { skip, take } = this.parsePagination(query);

        const [data, total] = await Promise.all([
            this.prisma.member.findMany({
                skip,
                take,
            }),
            this.prisma.member.count(),
        ]);

        return { data, total };
    }

    async findByClubIdPaginated(clubId: string, query: PaginationQueryDto): Promise<{ data: Member[]; total: number }> {
        const { skip, take } = this.parsePagination(query);

        const [data, total] = await Promise.all([
            this.prisma.member.findMany({
                where: { clubId },
                skip,
                take,
            }),
            this.prisma.member.count({
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