import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Permission } from '@prisma/client';
import { CreatePermissionDto, UpdatePermissionDto } from './dto';
import { PaginationQueryDto } from '../common';

export const PERMISSIONS_REPOSITORY = 'PERMISSIONS_REPOSITORY';

export interface IPermissionsRepository {
    create(data: CreatePermissionDto): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findOne(id: string): Promise<Permission | null>;
    findByName(name: string): Promise<Permission | null>;
    update(id: string, data: UpdatePermissionDto): Promise<Permission>;
    remove(id: string): Promise<Permission>;
    findAllPaginated(query: PaginationQueryDto): Promise<{ data: Permission[]; total: number }>;
}

@Injectable()
export class PermissionsRepository implements IPermissionsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreatePermissionDto): Promise<Permission> {
        return this.prisma.permission.create({
            data,
        });
    }

    async findAll(): Promise<Permission[]> {
        return this.prisma.permission.findMany({
            orderBy: { name: 'asc' },
        });
    }

    async findOne(id: string): Promise<Permission | null> {
        return this.prisma.permission.findUnique({
            where: { id },
        });
    }

    async findByName(name: string): Promise<Permission | null> {
        return this.prisma.permission.findUnique({
            where: { name },
        });
    }

    async update(id: string, data: UpdatePermissionDto): Promise<Permission> {
        return this.prisma.permission.update({
            where: { id },
            data,
        });
    }

    async remove(id: string): Promise<Permission> {
        return this.prisma.permission.delete({
            where: { id },
        });
    }

    async findAllPaginated(query: PaginationQueryDto): Promise<{ data: Permission[]; total: number }> {
        const { skip, take } = this.parsePagination(query);

        const [data, total] = await Promise.all([
            this.prisma.permission.findMany({
                skip,
                take,
                orderBy: { name: 'asc' },
            }),
            this.prisma.permission.count(),
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