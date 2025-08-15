import { IsString, IsOptional, IsNumber, IsDateString, IsBoolean, IsUUID } from 'class-validator';

export class CreateActivityDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    type: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsString()
    location: string;

    @IsOptional()
    @IsNumber()
    maxParticipants?: number;

    @IsOptional()
    @IsNumber()
    currentParticipants?: number;

    @IsUUID()
    clubId: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
