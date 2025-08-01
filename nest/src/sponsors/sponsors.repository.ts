import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Sponsor } from '@prisma/client';
import { CreateSponsorDto, UpdateSponsorDto } from './dto';
import { PaginationQueryDto } from '../common';

export const SPONSORS_REPOSITORY = 'SPONSORS_REPOSITORY';

export interface ISponsorsRepository {
    create(data: CreateSponsorDto): Promise<Sponsor>;
    findAll(): Promise<Sponsor[]>;
    findOne(id: string): Promise<Sponsor | null>;
    update(id: string, data: UpdateSponsorDto): Promise<Sponsor>;
    remove(id: string): Promise<Sponsor>;
    findByClubId(clubId: string): Promise<Sponsor[]>;
    findAllPaginated(query: PaginationQueryDto): Promise<{ data: Sponsor[]; total: number }>;
    findByClubIdPaginated(clubId: string, query: PaginationQueryDto): Promise<{ data: Sponsor[]; total: number }>;
}

@Injectable()
export class SponsorsRepository implements ISponsorsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateSponsorDto): Promise<Sponsor> {
        return this.prisma.sponsor.create({
            data,
        });
    }

    async findAll(): Promise<Sponsor[]> {
        return this.prisma.sponsor.findMany();
    }

    async findOne(id: string): Promise<Sponsor | null> {
        return this.prisma.sponsor.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: UpdateSponsorDto): Promise<Sponsor> {
        return this.prisma.sponsor.update({
            where: { id },
            data,
        });
    }

    async remove(id: string): Promise<Sponsor> {
        return this.prisma.sponsor.delete({
            where: { id },
        });
    }

    async findByClubId(clubId: string): Promise<Sponsor[]> {
        return this.prisma.sponsor.findMany({
            where: { clubId },
        });
    }

    async findAllPaginated(query: PaginationQueryDto): Promise<{ data: Sponsor[]; total: number }> {
        const { skip, take } = this.parsePagination(query);

        const [data, total] = await Promise.all([
            this.prisma.sponsor.findMany({
                skip,
                take,
            }),
            this.prisma.sponsor.count(),
        ]);

        return { data, total };
    }

    async findByClubIdPaginated(clubId: string, query: PaginationQueryDto): Promise<{ data: Sponsor[]; total: number }> {
        const { skip, take } = this.parsePagination(query);

        const [data, total] = await Promise.all([
            this.prisma.sponsor.findMany({
                where: { clubId },
                skip,
                take,
            }),
            this.prisma.sponsor.count({
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