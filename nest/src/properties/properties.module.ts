import { Module, OnModuleInit } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { PropertiesRepository } from './properties.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PropertiesController],
    providers: [PropertiesService, PropertiesRepository],
    exports: [PropertiesService],
})
export class PropertiesModule implements OnModuleInit {
    onModuleInit() {
        console.log('PropertiesModule initialized');
    }
}
