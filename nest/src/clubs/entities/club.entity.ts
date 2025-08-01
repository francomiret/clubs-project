import { ApiProperty } from '@nestjs/swagger';

export class ClubEntity {
    @ApiProperty({
        description: 'ID único del club',
        example: 'c02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    id: string;

    @ApiProperty({
        description: 'Nombre del club',
        example: 'Club Deportivo Ejemplo',
    })
    name: string;

    @ApiProperty({
        description: 'Fecha de creación',
        example: '2025-08-01T02:51:32.516Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Fecha de última actualización',
        example: '2025-08-01T02:51:32.516Z',
    })
    updatedAt: Date;
} 