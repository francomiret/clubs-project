import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { CreatePermissionDto, UpdatePermissionDto } from './dto';
import { IPermissionsRepository, PERMISSIONS_REPOSITORY } from './permissions.repository';
import { PaginationQueryDto, PaginationService, EntityNotFoundException } from '../common';

@Injectable()
export class PermissionsService {
    constructor(
        @Inject(PERMISSIONS_REPOSITORY)
        private readonly permissionsRepository: IPermissionsRepository,
        private readonly paginationService: PaginationService,
    ) { }

    async create(data: CreatePermissionDto): Promise<Permission> {
        // Verificar si el permiso ya existe
        const existingPermission = await this.permissionsRepository.findByName(data.name);
        if (existingPermission) {
            throw new ConflictException(`El permiso "${data.name}" ya existe`);
        }

        return this.permissionsRepository.create(data);
    }

    async findAll(): Promise<Permission[]> {
        return this.permissionsRepository.findAll();
    }

    async findAllPaginated(query: PaginationQueryDto) {
        const { data, total } = await this.permissionsRepository.findAllPaginated(query);
        const { page, limit } = this.paginationService.parsePagination(query);

        return this.paginationService.createPaginationResponse(data, total, page, limit);
    }

    async findOne(id: string): Promise<Permission> {
        const permission = await this.permissionsRepository.findOne(id);
        if (!permission) {
            throw new EntityNotFoundException('Permiso', id);
        }
        return permission;
    }

    async update(id: string, data: UpdatePermissionDto): Promise<Permission> {
        const permission = await this.permissionsRepository.findOne(id);
        if (!permission) {
            throw new EntityNotFoundException('Permiso', id);
        }

        // Si se está actualizando el nombre, verificar que no exista otro con el mismo nombre
        if (data.name && data.name !== permission.name) {
            const existingPermission = await this.permissionsRepository.findByName(data.name);
            if (existingPermission) {
                throw new ConflictException(`El permiso "${data.name}" ya existe`);
            }
        }

        return this.permissionsRepository.update(id, data);
    }

    async remove(id: string): Promise<Permission> {
        const permission = await this.permissionsRepository.findOne(id);
        if (!permission) {
            throw new EntityNotFoundException('Permiso', id);
        }
        return this.permissionsRepository.remove(id);
    }
} 