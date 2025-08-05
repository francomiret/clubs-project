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
        description: 'Nombre del club a crear',
        example: 'Club Deportivo Central',
    })
    @IsString()
    @IsNotEmpty()
    clubName: string;
} 