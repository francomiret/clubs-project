import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClubDto {
    @ApiProperty({
        description: 'Nombre del club',
        example: 'Club Deportivo Ejemplo',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Alias del club',
        example: 'CDE',
    })
    @IsString()
    alias: string;

    @ApiPropertyOptional({
        description: 'Dirección del club',
        example: 'Av. Principal 123, Ciudad Ejemplo',
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({
        description: 'Imagen del club en base64',
        example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
    })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiPropertyOptional({
        description: 'Fecha de fundación del club',
        example: '2020-01-01T00:00:00.000Z',
    })
    @IsOptional()
    @IsDateString()
    foundationDate?: string;

    @ApiPropertyOptional({
        description: 'Descripción del club',
        example: 'Club deportivo dedicado al desarrollo de talentos...',
    })
    @IsOptional()
    @IsString()
    description?: string;
} 