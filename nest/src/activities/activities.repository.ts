import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActivityDto, UpdateActivityDto } from './dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivitiesRepository {
    constructor(private prisma: PrismaService) { }

    async create(createActivityDto: CreateActivityDto): Promise<Activity> {
        return this.prisma.activity.create({
            data: createActivityDto,
        });
    }

    async findAll(clubId?: string): Promise<Activity[]> {
        const where = clubId ? { clubId } : {};
        return this.prisma.activity.findMany({
            where,
            orderBy: { startDate: 'asc' },
        });
    }

    async findOne(id: string): Promise<Activity> {
        return this.prisma.activity.findUniqueOrThrow({
            where: { id },
        });
    }

    async update(id: string, updateActivityDto: UpdateActivityDto): Promise<Activity> {
        return this.prisma.activity.update({
            where: { id },
            data: updateActivityDto,
        });
    }

    async remove(id: string): Promise<Activity> {
        return this.prisma.activity.delete({
            where: { id },
        });
    }
}
