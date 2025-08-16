import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentType } from '@prisma/client';

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

    @ApiProperty({
        description: 'Tipo de transacción',
        enum: PaymentType,
        example: PaymentType.INCOME,
    })
    type: PaymentType;

    @ApiPropertyOptional({
        description: 'Categoría del pago',
        example: 'Cuota mensual',
    })
    category?: string;

    @ApiPropertyOptional({
        description: 'Descripción del pago',
        example: 'Cuota mensual de enero',
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

    @ApiProperty({
        description: 'Estado activo del pago',
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