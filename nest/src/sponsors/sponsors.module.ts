import { Module } from '@nestjs/common';
import { SponsorsService } from './sponsors.service';
import { SponsorsController } from './sponsors.controller';
import { SponsorsRepository, SPONSORS_REPOSITORY } from './sponsors.repository';

@Module({
    controllers: [SponsorsController],
    providers: [
        SponsorsService,
        {
            provide: SPONSORS_REPOSITORY,
            useClass: SponsorsRepository,
        },
    ],
    exports: [SponsorsService],
})
export class SponsorsModule { } 