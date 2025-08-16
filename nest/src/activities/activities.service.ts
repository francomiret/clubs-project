import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto, UpdateActivityDto } from './dto';
import { ActivitiesRepository } from './activities.repository';
import { ActivityEntity } from './entities/activity.entity';

@Injectable()
export class ActivitiesService {
    constructor(private readonly activitiesRepository: ActivitiesRepository) { }

    async create(createActivityDto: CreateActivityDto): Promise<ActivityEntity> {
        return this.activitiesRepository.create(createActivityDto);
    }

    async findAll(clubId?: string): Promise<ActivityEntity[]> {
        return this.activitiesRepository.findAll(clubId);
    }

    async findOne(id: string): Promise<ActivityEntity> {
        try {
            return await this.activitiesRepository.findOne(id);
        } catch (error) {
            throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
        }
    }

    async update(id: string, updateActivityDto: UpdateActivityDto): Promise<ActivityEntity> {
        try {
            return await this.activitiesRepository.update(id, updateActivityDto);
        } catch (error) {
            throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
        }
    }

    async remove(id: string): Promise<ActivityEntity> {
        try {
            return await this.activitiesRepository.remove(id);
        } catch (error) {
            throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
        }
    }
}
