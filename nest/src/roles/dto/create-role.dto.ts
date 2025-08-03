import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({
        description: 'Nombre del rol',
        example: 'ADMIN',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'ID del club al que pertenece el rol',
        example: 'c02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    @IsString()
    @IsNotEmpty()
    clubId: string;

    @ApiProperty({
        description: 'IDs de los permisos asignados al rol',
        example: ['p1', 'p2', 'p3'],
        required: false,
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    permissionIds?: string[];
} 