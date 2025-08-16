import { IsString, IsOptional, IsNumber, IsArray, IsBoolean, IsUUID, IsEnum } from 'class-validator';
import { PropertyType } from '@prisma/client';

export class CreatePropertyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  address: string;

  @IsEnum(PropertyType)
  type: PropertyType;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsUUID()
  clubId: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
