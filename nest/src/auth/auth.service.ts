import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto';
import { JwtPayload, JwtRefreshPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async validateUser(email: string, password: string) {
        try {
            const user = await this.usersService.findByEmail(email);

            if (user && await bcrypt.compare(password, user.password)) {
                const { password, ...result } = user;
                return result;
            }

            return null;
        } catch (error) {
            return null;
        }
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const tokens = await this.generateTokens(user);

        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                clubId: user.clubId,
            },
        };
    }

    async register(registerDto: RegisterDto) {
        // Verificar si el usuario ya existe
        try {
            const existingUser = await this.usersService.findByEmail(registerDto.email);
            if (existingUser) {
                throw new ConflictException('El usuario ya existe con este email');
            }
        } catch (error) {
            // Si no existe, continuar con el registro
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        // Crear usuario
        const user = await this.usersService.create({
            ...registerDto,
            password: hashedPassword,
        });

        const { password, ...userWithoutPassword } = user;
        const tokens = await this.generateTokens(userWithoutPassword);

        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                clubId: user.clubId,
            },
        };
    }

    async refreshToken(refreshTokenDto: RefreshTokenDto) {
        try {
            const payload = await this.jwtService.verifyAsync<JwtRefreshPayload>(
                refreshTokenDto.refreshToken,
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                },
            );

            const user = await this.usersService.findOne(payload.sub);

            if (!user) {
                throw new UnauthorizedException('Usuario no encontrado');
            }

            const { password, ...userWithoutPassword } = user;
            const tokens = await this.generateTokens(userWithoutPassword);

            return tokens;
        } catch (error) {
            throw new UnauthorizedException('Refresh token inválido');
        }
    }

    private async generateTokens(user: any) {
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            clubId: user.clubId,
        };

        const refreshPayload: JwtRefreshPayload = {
            sub: user.id,
            tokenId: this.generateTokenId(),
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '1h'),
            }),
            this.jwtService.signAsync(refreshPayload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
            }),
        ]);

        return {
            accessToken,
            refreshToken,
            expiresIn: this.getExpirationTime(this.configService.get<string>('JWT_EXPIRES_IN', '1h')),
        };
    }

    private generateTokenId(): string {
        return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private getExpirationTime(expiresIn: string): number {
        const unit = expiresIn.slice(-1);
        const value = parseInt(expiresIn.slice(0, -1));

        switch (unit) {
            case 's':
                return value;
            case 'm':
                return value * 60;
            case 'h':
                return value * 3600;
            case 'd':
                return value * 86400;
            default:
                return 3600; // 1 hora por defecto
        }
    }
} 