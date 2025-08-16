import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PropertyType } from '@prisma/client';

export class PropertyEntity {
    @ApiProperty({
        description: 'ID único de la propiedad',
        example: '9b150bcc-ea18-434a-a6be-b403aae5465f',
    })
    id: string;

    @ApiProperty({
        description: 'Nombre de la propiedad',
        example: 'Cancha de Fútbol',
    })
    name: string;

    @ApiPropertyOptional({
        description: 'Descripción de la propiedad',
        example: 'Cancha de fútbol 11 con césped sintético',
    })
    description: string | null;

    @ApiProperty({
        description: 'Dirección de la propiedad',
        example: 'Av. Principal 123',
    })
    address: string;

    @ApiProperty({
        description: 'Tipo de propiedad',
        enum: PropertyType,
        example: PropertyType.SPORTS_FIELD,
    })
    type: PropertyType;

    @ApiPropertyOptional({
        description: 'Capacidad de la propiedad',
        example: 22,
    })
    capacity: number | null;

    @ApiPropertyOptional({
        description: 'Amenities de la propiedad',
        example: ['Vestuarios', 'Estacionamiento', 'Iluminación'],
    })
    amenities: string[];

    @ApiProperty({
        description: 'ID del club',
        example: 'c02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    clubId: string;

    @ApiProperty({
        description: 'Estado activo de la propiedad',
        example: true,
    })
    isActive: boolean;

    @ApiProperty({
        description: 'Fecha de creación',
        example: '2025-08-01T02:51:32.533Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Fecha de última actualización',
        example: '2025-08-01T02:51:32.533Z',
    })
    updatedAt: Date;
}
