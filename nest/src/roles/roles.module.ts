import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesRepository, ROLES_REPOSITORY } from './roles.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [PrismaModule, CommonModule],
  controllers: [RolesController],
  providers: [
    RolesService,
    {
      provide: ROLES_REPOSITORY,
      useClass: RolesRepository,
    },
  ],
  exports: [RolesService],
})
export class RolesModule { } 