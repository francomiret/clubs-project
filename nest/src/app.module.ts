import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ClubsModule } from './clubs/clubs.module';

@Module({
  imports: [PrismaModule, ClubsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
