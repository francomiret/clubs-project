import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseEntity {
    @ApiProperty({
        description: 'Token de acceso JWT',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    accessToken: string;

    @ApiProperty({
        description: 'Refresh token para renovar el acceso',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    refreshToken: string;

    @ApiProperty({
        description: 'Tiempo de expiración del token de acceso (en segundos)',
        example: 3600,
    })
    expiresIn: number;

    @ApiProperty({
        description: 'Información del usuario autenticado',
    })
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
        clubId: string;
    };
}

export class RefreshTokenResponseEntity {
    @ApiProperty({
        description: 'Nuevo token de acceso JWT',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    accessToken: string;

    @ApiProperty({
        description: 'Nuevo refresh token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    refreshToken: string;

    @ApiProperty({
        description: 'Tiempo de expiración del nuevo token (en segundos)',
        example: 3600,
    })
    expiresIn: number;
} 