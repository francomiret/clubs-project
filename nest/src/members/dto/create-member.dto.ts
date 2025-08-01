import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateMemberDto {
    @ApiProperty({
        description: 'Nombre del miembro',
        example: 'Juan Pérez',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Email del miembro',
        example: 'juan@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'ID del club al que pertenece',
        example: 'c02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    @IsString()
    @IsNotEmpty()
    clubId: string;
} 