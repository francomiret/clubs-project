import { IsString, IsOptional, IsNumber, IsDateString, IsEnum, IsUUID, IsBoolean } from 'class-validator';
import { PaymentType } from '@prisma/client';

export class CreatePaymentDto {
    @IsNumber()
    amount: number;

    @IsEnum(PaymentType)
    type: PaymentType;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDateString()
    date: string;

    @IsOptional()
    @IsUUID()
    memberId?: string;

    @IsOptional()
    @IsUUID()
    sponsorId?: string;

    @IsUUID()
    clubId: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
} 