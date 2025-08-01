import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaymentEntity {
    @ApiProperty({
        description: 'ID único del pago',
        example: '9b150bcc-ea18-434a-a6be-b403aae5465f',
    })
    id: string;

    @ApiProperty({
        description: 'Monto del pago',
        example: 50.0,
    })
    amount: number;

    @ApiPropertyOptional({
        description: 'Descripción del pago',
        example: 'Cuota mensual',
    })
    description?: string;

    @ApiProperty({
        description: 'Fecha del pago',
        example: '2025-08-01T02:51:32.533Z',
    })
    date: Date;

    @ApiPropertyOptional({
        description: 'ID del miembro (opcional si es pago de patrocinador)',
        example: '8153cff2-ccdb-447b-b7dd-c6d3ac9fa0d2',
    })
    memberId?: string;

    @ApiPropertyOptional({
        description: 'ID del patrocinador (opcional si es pago de miembro)',
        example: '06d6dcb9-9d85-4ead-b9da-910321777312',
    })
    sponsorId?: string;

    @ApiProperty({
        description: 'ID del club',
        example: 'c02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    clubId: string;
} 