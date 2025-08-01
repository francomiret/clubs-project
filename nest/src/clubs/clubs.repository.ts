import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Club } from '@prisma/client';
import { CreateClubDto, UpdateClubDto } from './dto';
import { PaginationQueryDto } from '../common';

export const CLUBS_REPOSITORY = 'CLUBS_REPOSITORY';

export interface IClubsRepository {
    create(data: CreateClubDto): Promise<Club>;
    findAll(): Promise<Club[]>;
    findOne(id: string): Promise<Club | null>;
    update(id: string, data: UpdateClubDto): Promise<Club>;
    remove(id: string): Promise<Club>;
    findByIdWithRelations(id: string): Promise<Club | null>;
    findAllWithRelations(): Promise<Club[]>;
    findAllPaginated(query: PaginationQueryDto): Promise<{ data: Club[]; total: number }>;
    findAllWithRelationsPaginated(query: PaginationQueryDto): Promise<{ data: Club[]; total: number }>;
}

@Injectable()
export class ClubsRepository implements IClubsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateClubDto): Promise<Club> {
        return this.prisma.club.create({
            data,
        });
    }

    async findAll(): Promise<Club[]> {
        return this.prisma.club.findMany();
    }

    async findOne(id: string): Promise<Club | null> {
        return this.prisma.club.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: UpdateClubDto): Promise<Club> {
        return this.prisma.club.update({
            where: { id },
            data,
        });
    }

    async remove(id: string): Promise<Club> {
        return this.prisma.club.delete({
            where: { id },
        });
    }

    async findByIdWithRelations(id: string): Promise<Club | null> {
        return this.prisma.club.findUnique({
            where: { id },
            include: {
                users: true,
                members: true,
                sponsors: true,
                payments: true,
            },
        });
    }

    async findAllWithRelations(): Promise<Club[]> {
        return this.prisma.club.findMany({
            include: {
                users: true,
                members: true,
                sponsors: true,
                payments: true,
            },
        });
    }

    async findAllPaginated(query: PaginationQueryDto): Promise<{ data: Club[]; total: number }> {
        const { skip, take } = this.parsePagination(query);
        
        const [data, total] = await Promise.all([
            this.prisma.club.findMany({
                skip,
                take,
            }),
            this.prisma.club.count(),
        ]);

        return { data, total };
    }

    async findAllWithRelationsPaginated(query: PaginationQueryDto): Promise<{ data: Club[]; total: number }> {
        const { skip, take } = this.parsePagination(query);
        
        const [data, total] = await Promise.all([
            this.prisma.club.findMany({
                skip,
                take,
                include: {
                    users: true,
                    members: true,
                    sponsors: true,
                    payments: true,
                },
            }),
            this.prisma.club.count(),
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