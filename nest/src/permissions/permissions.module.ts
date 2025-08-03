import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionsRepository, PERMISSIONS_REPOSITORY } from './permissions.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [PrismaModule, CommonModule],
  controllers: [PermissionsController],
  providers: [
    PermissionsService,
    {
      provide: PERMISSIONS_REPOSITORY,
      useClass: PermissionsRepository,
    },
  ],
  exports: [PermissionsService],
})
export class PermissionsModule { } 