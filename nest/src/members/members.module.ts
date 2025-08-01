import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MembersRepository, MEMBERS_REPOSITORY } from './members.repository';

@Module({
    controllers: [MembersController],
    providers: [
        MembersService,
        {
            provide: MEMBERS_REPOSITORY,
            useClass: MembersRepository,
        },
    ],
    exports: [MembersService],
})
export class MembersModule { } 