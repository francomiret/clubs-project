import { Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';
import { ClubsRepository, CLUBS_REPOSITORY } from './clubs.repository';

@Module({
    controllers: [ClubsController],
    providers: [
        ClubsService,
        {
            provide: CLUBS_REPOSITORY,
            useClass: ClubsRepository,
        },
    ],
})
export class ClubsModule { } 