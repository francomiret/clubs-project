import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateClubDto {
    @ApiProperty({
        description: 'Nombre del club',
        example: 'Club Deportivo Ejemplo',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
} 