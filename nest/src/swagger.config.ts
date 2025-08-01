import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Clubs API')
    .setDescription(`
        API REST para la gestión de clubs deportivos.
    `)
    .setVersion('1.0')
    .addTag('clubs', 'Operaciones relacionadas con clubs')
    .addTag('users', 'Operaciones relacionadas con usuarios')
    .addTag('members', 'Operaciones relacionadas con miembros')
    .addTag('sponsors', 'Operaciones relacionadas con patrocinadores')
    .addTag('payments', 'Operaciones relacionadas con pagos')
    .addBearerAuth()
    .build();