import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateRoleDto, UpdateRoleDto, AssignUserRoleDto } from './dto';
import { IRolesRepository, ROLES_REPOSITORY } from './roles.repository';
import { PaginationQueryDto, PaginationService, EntityNotFoundException } from '../common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
    constructor(
        @Inject(ROLES_REPOSITORY)
        private readonly rolesRepository: IRolesRepository,
        private readonly paginationService: PaginationService,
        private readonly prisma: PrismaService,
    ) { }

    async create(data: CreateRoleDto): Promise<Role> {
        // Verificar si el rol ya existe en el club
        const existingRole = await this.rolesRepository.findByNameAndClubId(data.name, data.clubId);
        if (existingRole) {
            throw new ConflictException(`El rol "${data.name}" ya existe en este club`);
        }

        // Crear el rol con transacción para manejar permisos
        const result = await this.prisma.$transaction(async (prisma) => {
            // Crear el rol
            const role = await prisma.role.create({
                data: {
                    name: data.name,
                    clubId: data.clubId,
                },
            });

            // Si se proporcionan permisos, crearlos en RolePermission
            if (data.permissionIds && data.permissionIds.length > 0) {
                const rolePermissions = data.permissionIds.map(permissionId => ({
                    roleId: role.id,
                    permissionId: permissionId,
                }));

                await prisma.rolePermission.createMany({
                    data: rolePermissions,
                });
            }

            // Retornar el rol con permisos
            return prisma.role.findUnique({
                where: { id: role.id },
                include: {
                    permissions: {
                        include: {
                            permission: true,
                        },
                    },
                },
            });
        });

        // Verificar que el resultado no sea null
        if (!result) {
            throw new Error('Error al crear el rol');
        }

        return result;
    }

    async findAll(): Promise<Role[]> {
        return this.rolesRepository.findAll();
    }

    async findByClubId(clubId: string): Promise<Role[]> {
        return this.rolesRepository.findByClubId(clubId);
    }

    async findAllPaginated(query: PaginationQueryDto) {
        const { data, total } = await this.rolesRepository.findAllPaginated(query);
        const { page, limit } = this.paginationService.parsePagination(query);

        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }

    async findByClubIdPaginated(clubId: string, query: PaginationQueryDto) {
        const { data, total } = await this.rolesRepository.findByClubIdPaginated(clubId, query);
        const { page, limit } = this.paginationService.parsePagination(query);

        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }

    async findOne(id: string): Promise<Role> {
        const role = await this.rolesRepository.findOne(id);
        if (!role) {
            throw new EntityNotFoundException('Rol', id);
        }
        return role;
    }

    async update(id: string, data: UpdateRoleDto): Promise<Role> {
        const role = await this.rolesRepository.findOne(id);
        if (!role) {
            throw new EntityNotFoundException('Rol', id);
        }

        // Si se está actualizando el nombre, verificar que no exista otro con el mismo nombre en el club
        if (data.name && data.name !== role.name) {
            const clubId = data.clubId || role.clubId;
            const existingRole = await this.rolesRepository.findByNameAndClubId(data.name, clubId);
            if (existingRole) {
                throw new ConflictException(`El rol "${data.name}" ya existe en este club`);
            }
        }

        // Actualizar el rol con transacción para manejar permisos
        const result = await this.prisma.$transaction(async (prisma) => {
            // Actualizar el rol
            const updatedRole = await prisma.role.update({
                where: { id },
                data: {
                    name: data.name,
                    clubId: data.clubId,
                },
            });

            // Si se proporcionan permisos, actualizar RolePermission
            if (data.permissionIds !== undefined) {
                // Eliminar permisos existentes
                await prisma.rolePermission.deleteMany({
                    where: { roleId: id },
                });

                // Crear nuevos permisos si se proporcionan
                if (data.permissionIds.length > 0) {
                    const rolePermissions = data.permissionIds.map(permissionId => ({
                        roleId: id,
                        permissionId: permissionId,
                    }));

                    await prisma.rolePermission.createMany({
                        data: rolePermissions,
                    });
                }
            }

            // Retornar el rol actualizado con permisos
            return prisma.role.findUnique({
                where: { id },
                include: {
                    permissions: {
                        include: {
                            permission: true,
                        },
                    },
                },
            });
        });

        // Verificar que el resultado no sea null
        if (!result) {
            throw new Error('Error al actualizar el rol');
        }

        return result;
    }

    async remove(id: string): Promise<Role> {
        const role = await this.rolesRepository.findOne(id);
        if (!role) {
            throw new EntityNotFoundException('Rol', id);
        }
        return this.rolesRepository.remove(id);
    }

    async assignUserToRole(data: AssignUserRoleDto) {
        // Verificar que el rol existe y pertenece al club
        const role = await this.rolesRepository.findOne(data.roleId);
        if (!role) {
            throw new EntityNotFoundException('Rol', data.roleId);
        }

        if (role.clubId !== data.clubId) {
            throw new ConflictException('El rol no pertenece al club especificado');
        }

        // Crear o actualizar la relación UserClub
        return this.prisma.userClub.upsert({
            where: {
                userId_clubId: {
                    userId: data.userId,
                    clubId: data.clubId,
                },
            },
            update: {
                roleId: data.roleId,
            },
            create: {
                userId: data.userId,
                clubId: data.clubId,
                roleId: data.roleId,
            },
        });
    }
} 