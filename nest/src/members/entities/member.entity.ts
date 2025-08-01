import { ApiProperty } from '@nestjs/swagger';

export class MemberEntity {
    @ApiProperty({
        description: 'ID único del miembro',
        example: '8153cff2-ccdb-447b-b7dd-c6d3ac9fa0d2',
    })
    id: string;

    @ApiProperty({
        description: 'Nombre del miembro',
        example: 'Juan Pérez',
    })
    name: string;

    @ApiProperty({
        description: 'Email del miembro',
        example: 'juan@example.com',
    })
    email: string;

    @ApiProperty({
        description: 'ID del club al que pertenece',
        example: 'c02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    clubId: string;

    @ApiProperty({
        description: 'Fecha de creación',
        example: '2025-08-01T02:51:32.528Z',
    })
    createdAt: Date;
} 