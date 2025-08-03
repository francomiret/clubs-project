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

        return this.rolesRepository.create(data);
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

        return this.rolesRepository.update(id, data);
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
            include: {
                user: true,
                role: {
                    include: {
                        permissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
                club: true,
            },
        });
    }
} 