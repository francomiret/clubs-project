import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Club } from '@prisma/client';
import { CreateClubDto, UpdateClubDto } from './dto';

@Injectable()
export class ClubsService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateClubDto): Promise<Club> {
        return this.prisma.club.create({
            data,
        });
    }

    async findAll(): Promise<Club[]> {
        return this.prisma.club.findMany({
            include: {
                users: true,
                members: true,
                sponsors: true,
                payments: true,
            },
        });
    }

    async findOne(id: string): Promise<Club | null> {
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
} 