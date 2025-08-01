import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository, USERS_REPOSITORY } from './users.repository';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        {
            provide: USERS_REPOSITORY,
            useClass: UsersRepository,
        },
    ],
    exports: [UsersService],
})
export class UsersModule { } 