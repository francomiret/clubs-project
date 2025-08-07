import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto';
import { JwtPayload, JwtRefreshPayload } from './interfaces/jwt-payload.interface';
import { PrismaService } from '../prisma/prisma.service';

export interface UserResponse {
    user: {
        id: string;
        email: string;
        name: string;
        clubId?: string;
        role?: string;
        permissions: string[];
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
    ) { }

    async validateUser(email: string, password: string) {
        try {
            const user = await this.usersService.findByEmail(email);

            if (user && await bcrypt.compare(password, user.password)) {
                const { password, ...result } = user;

                // Obtener roles y permisos del usuario
                const userWithRoles = await this.prisma.user.findUnique({
                    where: { id: user.id },
                    include: {
                        clubs: {
                            include: {
                                role: {
                                    include: {
                                        permissions: {
                                            include: {
                                                permission: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });

                const permissions = userWithRoles?.clubs?.flatMap(userClub =>
                    userClub.role.permissions.map(rp => rp.permission.name)
                ) || [];

                return {
                    ...result,
                    permissions: [...new Set(permissions)] // Eliminar duplicados
                };
            }

            return null;
        } catch (error) {
            return null;
        }
    }

    async login(loginDto: LoginDto): Promise<UserResponse> {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Obtener información del club y rol del usuario
        const userClub = await this.prisma.userClub.findFirst({
            where: { userId: user.id },
            include: {
                club: true,
                role: {
                    include: {
                        permissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
            },
        });

        const permissions = userClub?.role?.permissions?.map(rp => rp.permission.name) || [];

        const tokens = await this.generateTokens({
            ...user,
            permissions,
        });

        const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            clubId: userClub?.clubId,
            role: userClub?.role?.name,
            permissions,
        };

        return {
            ...tokens,
            user: userData
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
            email: registerDto.email,
            password: hashedPassword,
            name: registerDto.name,
        });

        // Crear el club
        const club = await this.prisma.club.create({
            data: {
                name: registerDto.clubName,
            },
        });

        // Crear roles básicos para el club
        const adminRole = await this.prisma.role.create({
            data: {
                name: 'ADMIN',
                clubId: club.id,
            },
        });

        const managerRole = await this.prisma.role.create({
            data: {
                name: 'MANAGER',
                clubId: club.id,
            },
        });

        const memberRole = await this.prisma.role.create({
            data: {
                name: 'MEMBER',
                clubId: club.id,
            },
        });

        // Asignar permisos básicos a los roles
        const basicPermissions = await this.prisma.permission.findMany({
            where: {
                name: {
                    in: ['users.read', 'users.create', 'users.update', 'users.delete']
                }
            }
        });

        // Asignar todos los permisos al rol ADMIN
        await Promise.all(
            basicPermissions.map(permission =>
                this.prisma.rolePermission.create({
                    data: {
                        roleId: adminRole.id,
                        permissionId: permission.id,
                    },
                })
            )
        );

        // Asignar permisos limitados al rol MANAGER
        const managerPermissions = basicPermissions.filter(p =>
            ['users.read', 'users.create', 'users.update'].includes(p.name)
        );
        await Promise.all(
            managerPermissions.map(permission =>
                this.prisma.rolePermission.create({
                    data: {
                        roleId: managerRole.id,
                        permissionId: permission.id,
                    },
                })
            )
        );

        // Asignar permisos básicos al rol MEMBER
        const memberPermissions = basicPermissions.filter(p =>
            ['users.read'].includes(p.name)
        );
        await Promise.all(
            memberPermissions.map(permission =>
                this.prisma.rolePermission.create({
                    data: {
                        roleId: memberRole.id,
                        permissionId: permission.id,
                    },
                })
            )
        );

        // Crear relación UserClub con rol de ADMIN
        await this.prisma.userClub.create({
            data: {
                userId: user.id,
                clubId: club.id,
                roleId: adminRole.id,
            },
        });

        const { password, ...userWithoutPassword } = user;
        const tokens = await this.generateTokens(userWithoutPassword);

        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                clubId: club.id,
                role: 'ADMIN',
                permissions: basicPermissions.map(p => p.name),
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
            permissions: user.permissions || [],
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

    async getProfile(userId: string) {
        const userClub = await this.prisma.userClub.findFirst({
            where: { userId },
            include: {
                club: true,
                role: {
                    include: {
                        permissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
            },
        });

        const permissions = userClub?.role?.permissions?.map(rp => rp.permission.name) || [];

        return {
            clubId: userClub?.clubId,
            role: userClub?.role?.name,
            permissions,
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