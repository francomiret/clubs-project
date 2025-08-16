import { IsString, IsOptional, IsNumber, IsDateString, IsBoolean, IsUUID, IsEnum } from 'class-validator';
import { ActivityType } from '@prisma/client';

export class CreateActivityDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ActivityType)
  type: ActivityType;

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
