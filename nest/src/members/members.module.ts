import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MembersRepository, MEMBERS_REPOSITORY } from './members.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
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