import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { ClubsModule } from './clubs/clubs.module';
import { UsersModule } from './users/users.module';
import { MembersModule } from './members/members.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    PrismaModule,
    CommonModule,
    ClubsModule,
    UsersModule,
    MembersModule,
    SponsorsModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
