import { IsOptional, IsString, IsEnum, IsUUID, IsDateString, IsNumber, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PaymentType } from '@prisma/client';

export class PaymentSummaryDto {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    monthlyBalance: number;
    incomeCount: number;
    expenseCount: number;
    totalCount: number;
}

export class PaymentFilterDto {
    @IsOptional()
    @IsUUID()
    clubId?: string;

    @IsOptional()
    @IsEnum(PaymentType)
    type?: PaymentType;

    @IsOptional()
    @IsUUID()
    memberId?: string;

    @IsOptional()
    @IsUUID()
    sponsorId?: string;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number;
}

export class PaymentStatsDto {
    category: string;
    total: number;
    count: number;
    percentage: number;
}
