import { ApiProperty } from '@nestjs/swagger';

export class PermissionEntity {
    @ApiProperty({
        description: 'ID único del permiso',
        example: 'ec5fcfc5-9435-422d-9278-62e25ef1b92a',
    })
    id: string;

    @ApiProperty({
        description: 'Nombre del permiso',
        example: 'users.create',
    })
    name: string;

    @ApiProperty({
        description: 'Descripción del permiso',
        example: 'Permite crear nuevos usuarios en el sistema',
        required: false,
    })
    description?: string;
} 