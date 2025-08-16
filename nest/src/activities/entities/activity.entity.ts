import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ActivityType } from '@prisma/client';

export class ActivityEntity {
  @ApiProperty({
    description: 'ID único de la actividad',
    example: '9b150bcc-ea18-434a-a6be-b403aae5465f',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre de la actividad',
    example: 'Entrenamiento de Fútbol',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción de la actividad',
    example: 'Entrenamiento técnico y táctico para jugadores de fútbol',
  })
  description: string | null;

  @ApiProperty({
    description: 'Tipo de actividad',
    enum: ActivityType,
    example: ActivityType.TRAINING,
  })
  type: ActivityType;

  @ApiProperty({
    description: 'Fecha de inicio',
    example: '2025-08-01T18:00:00.000Z',
  })
  startDate: Date;

  @ApiProperty({
    description: 'Fecha de fin',
    example: '2025-08-01T20:00:00.000Z',
  })
  endDate: Date;

  @ApiProperty({
    description: 'Ubicación de la actividad',
    example: 'Cancha de Fútbol Principal',
  })
  location: string;

  @ApiPropertyOptional({
    description: 'Número máximo de participantes',
    example: 22,
  })
  maxParticipants: number | null;

  @ApiProperty({
    description: 'Número actual de participantes',
    example: 18,
  })
  currentParticipants: number;

  @ApiProperty({
    description: 'ID del club',
    example: 'c02c6a05-eb28-48cf-96a4-7327832c0338',
  })
  clubId: string;

  @ApiProperty({
    description: 'Estado activo de la actividad',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2025-08-01T02:51:32.533Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2025-08-01T02:51:32.533Z',
  })
  updatedAt: Date;
}
