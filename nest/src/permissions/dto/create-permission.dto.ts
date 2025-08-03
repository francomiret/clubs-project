import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePermissionDto {
    @ApiProperty({
        description: 'Nombre del permiso (debe ser único)',
        example: 'users.create',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Descripción del permiso',
        example: 'Permite crear nuevos usuarios en el sistema',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;
} 