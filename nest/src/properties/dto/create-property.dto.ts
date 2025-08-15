import { IsString, IsOptional, IsNumber, IsArray, IsBoolean, IsUUID } from 'class-validator';

export class CreatePropertyDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    address: string;

    @IsString()
    type: string;

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
