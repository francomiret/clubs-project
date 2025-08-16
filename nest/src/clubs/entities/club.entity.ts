import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ClubEntity {
    @ApiProperty({
        description: 'ID único del club',
        example: '9b150bcc-ea18-434a-a6be-b403aae5465f',
    })
    id: string;

    @ApiProperty({
        description: 'Nombre del club',
        example: 'Club Deportivo Ejemplo',
    })
    name: string;

    @ApiProperty({
        description: 'Alias del club',
        example: 'CDE',
    })
    alias: string;

    @ApiPropertyOptional({
        description: 'Dirección del club',
        example: 'Av. Principal 123, Ciudad Ejemplo',
    })
    address?: string;

    @ApiPropertyOptional({
        description: 'Imagen del club en base64',
        example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
    })
    image?: string;

    @ApiPropertyOptional({
        description: 'Fecha de fundación del club',
        example: '2020-01-01T00:00:00.000Z',
    })
    foundationDate?: Date;

    @ApiPropertyOptional({
        description: 'Descripción del club',
        example: 'Club deportivo dedicado al desarrollo de talentos...',
    })
    description?: string;

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