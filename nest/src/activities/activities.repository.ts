import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActivityDto, UpdateActivityDto } from './dto';
import { ActivityEntity } from './entities/activity.entity';

@Injectable()
export class ActivitiesRepository {
    constructor(private prisma: PrismaService) { }

    async create(createActivityDto: CreateActivityDto): Promise<ActivityEntity> {
        return this.prisma.activity.create({
            data: createActivityDto,
        });
    }

    async findAll(clubId?: string): Promise<ActivityEntity[]> {
        const where = clubId ? { clubId } : {};
        return this.prisma.activity.findMany({
            where,
            orderBy: { startDate: 'asc' },
        });
    }

    async findOne(id: string): Promise<ActivityEntity> {
        return this.prisma.activity.findUniqueOrThrow({
            where: { id },
        });
    }

    async update(id: string, updateActivityDto: UpdateActivityDto): Promise<ActivityEntity> {
        return this.prisma.activity.update({
            where: { id },
            data: updateActivityDto,
        });
    }

    async remove(id: string): Promise<ActivityEntity> {
        return this.prisma.activity.delete({
            where: { id },
        });
    }
}
