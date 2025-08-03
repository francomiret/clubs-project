import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { PaginationQueryDto } from '../common';

export const ROLES_REPOSITORY = 'ROLES_REPOSITORY';

export interface IRolesRepository {
    create(data: CreateRoleDto): Promise<Role>;
    findAll(): Promise<Role[]>;
    findByClubId(clubId: string): Promise<Role[]>;
    findOne(id: string): Promise<Role | null>;
    findByNameAndClubId(name: string, clubId: string): Promise<Role | null>;
    update(id: string, data: UpdateRoleDto): Promise<Role>;
    remove(id: string): Promise<Role>;
    findAllPaginated(query: PaginationQueryDto): Promise<{ data: Role[]; total: number }>;
    findByClubIdPaginated(clubId: string, query: PaginationQueryDto): Promise<{ data: Role[]; total: number }>;
}

@Injectable()
export class RolesRepository implements IRolesRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateRoleDto): Promise<Role> {
        const { permissionIds, ...roleData } = data;

        return this.prisma.role.create({
            data: {
                ...roleData,
                permissions: permissionIds ? {
                    create: permissionIds.map(permissionId => ({
                        permissionId,
                    })),
                } : undefined,
            },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
        });
    }

    async findAll(): Promise<Role[]> {
        return this.prisma.role.findMany({
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
        });
    }

    async findByClubId(clubId: string): Promise<Role[]> {
        return this.prisma.role.findMany({
            where: { clubId },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
        });
    }

    async findOne(id: string): Promise<Role | null> {
        return this.prisma.role.findUnique({
            where: { id },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
        });
    }

    async findByNameAndClubId(name: string, clubId: string): Promise<Role | null> {
        return this.prisma.role.findFirst({
            where: {
                name,
                clubId,
            },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
        });
    }

    async update(id: string, data: UpdateRoleDto): Promise<Role> {
        const { permissionIds, ...roleData } = data;

        // Si se están actualizando los permisos, primero eliminar los existentes
        if (permissionIds !== undefined) {
            await this.prisma.rolePermission.deleteMany({
                where: { roleId: id },
            });
        }

        return this.prisma.role.update({
            where: { id },
            data: {
                ...roleData,
                permissions: permissionIds ? {
                    create: permissionIds.map(permissionId => ({
                        permissionId,
                    })),
                } : undefined,
            },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
        });
    }

    async remove(id: string): Promise<Role> {
        // Eliminar primero las relaciones de permisos
        await this.prisma.rolePermission.deleteMany({
            where: { roleId: id },
        });

        // Eliminar las relaciones de usuarios
        await this.prisma.userClub.deleteMany({
            where: { roleId: id },
        });

        return this.prisma.role.delete({
            where: { id },
        });
    }

    async findAllPaginated(query: PaginationQueryDto): Promise<{ data: Role[]; total: number }> {
        const { skip, take } = this.parsePagination(query);

        const [data, total] = await Promise.all([
            this.prisma.role.findMany({
                skip,
                take,
                include: {
                    permissions: {
                        include: {
                            permission: true,
                        },
                    },
                },
                orderBy: { name: 'asc' },
            }),
            this.prisma.role.count(),
        ]);

        return { data, total };
    }

    async findByClubIdPaginated(clubId: string, query: PaginationQueryDto): Promise<{ data: Role[]; total: number }> {
        const { skip, take } = this.parsePagination(query);

        const [data, total] = await Promise.all([
            this.prisma.role.findMany({
                where: { clubId },
                skip,
                take,
                include: {
                    permissions: {
                        include: {
                            permission: true,
                        },
                    },
                },
                orderBy: { name: 'asc' },
            }),
            this.prisma.role.count({
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