import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PermissionsGuard } from './guards/permissions.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        PrismaModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1h'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy, PermissionsGuard, AuthorizationGuard],
    exports: [AuthService, PermissionsGuard, AuthorizationGuard, JwtModule],
})
export class AuthModule { } 