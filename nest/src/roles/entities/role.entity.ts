import { ApiProperty } from '@nestjs/swagger';

export class RoleEntity {
    @ApiProperty({
        description: 'ID único del rol',
        example: 'ec5fcfc5-9435-422d-9278-62e25ef1b92a',
    })
    id: string;

    @ApiProperty({
        description: 'Nombre del rol',
        example: 'ADMIN',
    })
    name: string;

    @ApiProperty({
        description: 'ID del club al que pertenece',
        example: 'c02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    clubId: string;

    @ApiProperty({
        description: 'Permisos asignados al rol',
        example: [
            {
                id: 'p1',
                name: 'users.read',
                description: 'Leer usuarios',
            },
        ],
    })
    permissions?: Array<{
        id: string;
        name: string;
        description?: string;
    }>;
} 