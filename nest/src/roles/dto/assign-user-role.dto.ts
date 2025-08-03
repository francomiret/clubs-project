import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AssignUserRoleDto {
    @ApiProperty({
        description: 'ID del usuario',
        example: 'u02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'ID del club',
        example: 'c02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    @IsString()
    @IsNotEmpty()
    clubId: string;

    @ApiProperty({
        description: 'ID del rol',
        example: 'r02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    @IsString()
    @IsNotEmpty()
    roleId: string;
} 