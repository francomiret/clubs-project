import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Crear un club
    const club = await prisma.club.create({
        data: {
            name: 'Club Deportivo Ejemplo',
        },
    });

    console.log('Club creado:', club);

    // Crear un usuario administrador
    const admin = await prisma.user.create({
        data: {
            email: 'admin@club.com',
            password: 'password123',
            name: 'Administrador',
            role: 'ADMIN',
            clubId: club.id,
        },
    });

    console.log('Usuario administrador creado:', admin);

    // Crear un miembro
    const member = await prisma.member.create({
        data: {
            name: 'Juan Pérez',
            email: 'juan@example.com',
            clubId: club.id,
        },
    });

    console.log('Miembro creado:', member);

    // Crear un patrocinador
    const sponsor = await prisma.sponsor.create({
        data: {
            name: 'Empresa Patrocinadora',
            email: 'contacto@empresa.com',
            clubId: club.id,
        },
    });

    console.log('Patrocinador creado:', sponsor);

    // Crear un pago de miembro
    const memberPayment = await prisma.payment.create({
        data: {
            amount: 50.0,
            description: 'Cuota mensual',
            date: new Date(),
            memberId: member.id,
            clubId: club.id,
        },
    });

    console.log('Pago de miembro creado:', memberPayment);

    // Crear un pago de patrocinador
    const sponsorPayment = await prisma.payment.create({
        data: {
            amount: 1000.0,
            description: 'Patrocinio anual',
            date: new Date(),
            sponsorId: sponsor.id,
            clubId: club.id,
        },
    });

    console.log('Pago de patrocinador creado:', sponsorPayment);

    // Obtener el club con todas sus relaciones
    const clubWithRelations = await prisma.club.findUnique({
        where: { id: club.id },
        include: {
            users: true,
            members: true,
            sponsors: true,
            payments: true,
        },
    });

    console.log('Club con relaciones:', JSON.stringify(clubWithRelations, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 