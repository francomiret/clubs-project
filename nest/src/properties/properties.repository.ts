import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto, UpdatePropertyDto } from './dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesRepository {
    constructor(private prisma: PrismaService) { }

    async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
        return this.prisma.property.create({
            data: createPropertyDto,
        });
    }

    async findAll(clubId?: string): Promise<Property[]> {
        const where = clubId ? { clubId } : {};
        return this.prisma.property.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string): Promise<Property> {
        return this.prisma.property.findUniqueOrThrow({
            where: { id },
        });
    }

    async update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<Property> {
        return this.prisma.property.update({
            where: { id },
            data: updatePropertyDto,
        });
    }

    async remove(id: string): Promise<Property> {
        return this.prisma.property.delete({
            where: { id },
        });
    }
}
