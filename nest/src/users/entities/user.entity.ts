import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserEntity {
    @ApiProperty({
        description: 'ID único del usuario',
        example: 'ec5fcfc5-9435-422d-9278-62e25ef1b92a',
    })
    id: string;

    @ApiProperty({
        description: 'Email del usuario',
        example: 'user@example.com',
    })
    email: string;

    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Juan Pérez',
    })
    name: string;

    @ApiProperty({
        description: 'Rol del usuario',
        enum: Role,
        example: 'MEMBER',
    })
    role: Role;

    @ApiProperty({
        description: 'ID del club al que pertenece',
        example: 'c02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    clubId: string;

    @ApiProperty({
        description: 'Fecha de creación',
        example: '2025-08-01T02:51:32.523Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Fecha de última actualización',
        example: '2025-08-01T02:51:32.523Z',
    })
    updatedAt: Date;
} 