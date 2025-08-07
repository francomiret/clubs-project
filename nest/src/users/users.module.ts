import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository, USERS_REPOSITORY } from './users.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [forwardRef(() => AuthModule)],
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