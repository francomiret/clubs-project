import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ClubsModule } from './clubs/clubs.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [PrismaModule, CommonModule, ClubsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
