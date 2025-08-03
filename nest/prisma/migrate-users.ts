import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Migrando usuarios existentes...');

    // Obtener todos los usuarios existentes
    const existingUsers = await prisma.user.findMany({
        include: {
            clubs: {
                include: {
                    club: true,
                    role: true,
                },
            },
        },
    });

    console.log(`Encontrados ${existingUsers.length} usuarios para migrar`);

    for (const user of existingUsers) {
        console.log(`Migrando usuario: ${user.email}`);

        // Procesar cada club del usuario
        for (const userClub of user.clubs) {
            // Crear roles básicos si no existen
            const adminRole = await prisma.role.upsert({
                where: {
                    name_clubId: {
                        name: 'ADMIN',
                        clubId: userClub.clubId,
                    }
                },
                update: {},
                create: {
                    name: 'ADMIN',
                    clubId: userClub.clubId,
                },
            });

            const memberRole = await prisma.role.upsert({
                where: {
                    name_clubId: {
                        name: 'MEMBER',
                        clubId: userClub.clubId,
                    }
                },
                update: {},
                create: {
                    name: 'MEMBER',
                    clubId: userClub.clubId,
                },
            });

            // Asignar rol basado en el rol anterior
            const roleToAssign = userClub.role.name === 'ADMIN' ? adminRole : memberRole;

            // Crear relación UserClub
            await prisma.userClub.upsert({
                where: {
                    userId_clubId: {
                        userId: user.id,
                        clubId: userClub.clubId,
                    },
                },
                update: {
                    roleId: roleToAssign.id,
                },
                create: {
                    userId: user.id,
                    clubId: userClub.clubId,
                    roleId: roleToAssign.id,
                },
            });
        }

        console.log(`✅ Usuario ${user.email} migrado con ${user.clubs.length} clubs`);
    }

    console.log('✅ Migración de usuarios completada');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 