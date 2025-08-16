import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto, UpdatePropertyDto } from './dto';
import { PropertiesRepository } from './properties.repository';
import { PropertyEntity } from './entities/property.entity';

@Injectable()
export class PropertiesService {
    constructor(private readonly propertiesRepository: PropertiesRepository) { }

    async create(createPropertyDto: CreatePropertyDto): Promise<PropertyEntity> {
        return this.propertiesRepository.create(createPropertyDto);
    }

    async findAll(clubId?: string): Promise<PropertyEntity[]> {
        return this.propertiesRepository.findAll(clubId);
    }

    async findOne(id: string): Promise<PropertyEntity> {
        try {
            return await this.propertiesRepository.findOne(id);
        } catch (error) {
            throw new NotFoundException(`Propiedad con ID ${id} no encontrada`);
        }
    }

    async update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<PropertyEntity> {
        try {
            return await this.propertiesRepository.update(id, updatePropertyDto);
        } catch (error) {
            throw new NotFoundException(`Propiedad con ID ${id} no encontrada`);
        }
    }

    async remove(id: string): Promise<PropertyEntity> {
        try {
            return await this.propertiesRepository.remove(id);
        } catch (error) {
            throw new NotFoundException(`Propiedad con ID ${id} no encontrada`);
        }
    }
}
