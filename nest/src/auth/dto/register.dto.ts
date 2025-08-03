import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        description: 'Email del usuario',
        example: 'user@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario (mínimo 6 caracteres)',
        example: 'password123',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Juan Pérez',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'ID del club al que pertenece',
        example: 'c02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    @IsString()
    @IsNotEmpty()
    clubId: string;

    @ApiProperty({
        description: 'ID del rol en el club',
        example: 'r02c6a05-eb28-48cf-96a4-7327832c0338',
    })
    @IsString()
    @IsNotEmpty()
    roleId: string;
} 