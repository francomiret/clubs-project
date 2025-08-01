import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreatePaymentDto {
    @ApiProperty({
        description: 'Monto del pago',
        example: 50.0,
    })
    @IsNumber()
    amount: number;

    @ApiPropertyOptional({
        description: 'Descripción del pago',
        example: 'Cuota mensual',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'Fecha del pago',
        example: '2025-08-01T02:51:32.533Z',
    })
    @IsDateString()
    date: string;

    @ApiPropertyOptional({
        description: 'ID del miembro (opcional si es pago de patrocinador)',
        example: '8153cff2-ccdb-447b-b7dd-c6d3ac9fa0d2',
    })
    @IsOptional()
    @IsString()
    memberId?: string;

    @ApiPropertyOptional({
        description: 'ID del patrocinador (opcional si es pago de miembro)',
        example: '06d6dcb9-9d85-4ead-b9da-910321777312',
    })
    @IsOptional()
    @IsString()
    sponsorId?: string;

    @ApiProperty({
        description: 'ID del club',
        example: 'c02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    @IsString()
    @IsNotEmpty()
    clubId: string;
} 