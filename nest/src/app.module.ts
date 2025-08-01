import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { ClubsModule } from './clubs/clubs.module';
import { UsersModule } from './users/users.module';
import { MembersModule } from './members/members.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CommonModule,
    ClubsModule,
    UsersModule,
    MembersModule,
    SponsorsModule,
    PaymentsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
