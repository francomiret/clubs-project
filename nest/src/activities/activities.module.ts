import { Module, OnModuleInit } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { ActivitiesRepository } from './activities.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ActivitiesController],
    providers: [ActivitiesService, ActivitiesRepository],
    exports: [ActivitiesService],
})
export class ActivitiesModule implements OnModuleInit {
    onModuleInit() {
        console.log('ActivitiesModule initialized');
    }
}
