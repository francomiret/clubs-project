import { ApiProperty } from '@nestjs/swagger';

export class SponsorEntity {
    @ApiProperty({
        description: 'ID único del patrocinador',
        example: '06d6dcb9-9d85-4ead-b9da-910321777312',
    })
    id: string;

    @ApiProperty({
        description: 'Nombre del patrocinador',
        example: 'Empresa Patrocinadora',
    })
    name: string;

    @ApiProperty({
        description: 'Email del patrocinador',
        example: 'contacto@empresa.com',
    })
    email: string;

    @ApiProperty({
        description: 'ID del club al que patrocina',
        example: 'c02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    clubId: string;

    @ApiProperty({
        description: 'Fecha de creación',
        example: '2025-08-01T02:51:32.531Z',
    })
    createdAt: Date;
} 