import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando seed de la base de datos...');

    // 1. Crear permisos básicos del sistema
    console.log('📋 Creando permisos básicos...');

    const permissions = await Promise.all([
        // Permisos de usuarios
        prisma.permission.upsert({
            where: { name: 'users.read' },
            update: {},
            create: {
                name: 'users.read',
                description: 'Leer información de usuarios',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'users.create' },
            update: {},
            create: {
                name: 'users.create',
                description: 'Crear nuevos usuarios',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'users.update' },
            update: {},
            create: {
                name: 'users.update',
                description: 'Actualizar información de usuarios',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'users.delete' },
            update: {},
            create: {
                name: 'users.delete',
                description: 'Eliminar usuarios',
            },
        }),

        // Permisos de miembros
        prisma.permission.upsert({
            where: { name: 'members.read' },
            update: {},
            create: {
                name: 'members.read',
                description: 'Leer información de miembros',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'members.create' },
            update: {},
            create: {
                name: 'members.create',
                description: 'Crear nuevos miembros',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'members.update' },
            update: {},
            create: {
                name: 'members.update',
                description: 'Actualizar información de miembros',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'members.delete' },
            update: {},
            create: {
                name: 'members.delete',
                description: 'Eliminar miembros',
            },
        }),

        // Permisos de sponsors
        prisma.permission.upsert({
            where: { name: 'sponsors.read' },
            update: {},
            create: {
                name: 'sponsors.read',
                description: 'Leer información de sponsors',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'sponsors.create' },
            update: {},
            create: {
                name: 'sponsors.create',
                description: 'Crear nuevos sponsors',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'sponsors.update' },
            update: {},
            create: {
                name: 'sponsors.update',
                description: 'Actualizar información de sponsors',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'sponsors.delete' },
            update: {},
            create: {
                name: 'sponsors.delete',
                description: 'Eliminar sponsors',
            },
        }),

        // Permisos de pagos
        prisma.permission.upsert({
            where: { name: 'payments.read' },
            update: {},
            create: {
                name: 'payments.read',
                description: 'Leer información de pagos',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'payments.create' },
            update: {},
            create: {
                name: 'payments.create',
                description: 'Crear nuevos pagos',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'payments.update' },
            update: {},
            create: {
                name: 'payments.update',
                description: 'Actualizar información de pagos',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'payments.delete' },
            update: {},
            create: {
                name: 'payments.delete',
                description: 'Eliminar pagos',
            },
        }),

        // Permisos de roles
        prisma.permission.upsert({
            where: { name: 'roles.read' },
            update: {},
            create: {
                name: 'roles.read',
                description: 'Leer información de roles',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'roles.create' },
            update: {},
            create: {
                name: 'roles.create',
                description: 'Crear nuevos roles',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'roles.update' },
            update: {},
            create: {
                name: 'roles.update',
                description: 'Actualizar información de roles',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'roles.delete' },
            update: {},
            create: {
                name: 'roles.delete',
                description: 'Eliminar roles',
            },
        }),

        // Permisos de permisos
        prisma.permission.upsert({
            where: { name: 'permissions.read' },
            update: {},
            create: {
                name: 'permissions.read',
                description: 'Leer información de permisos',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'permissions.create' },
            update: {},
            create: {
                name: 'permissions.create',
                description: 'Crear nuevos permisos',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'permissions.update' },
            update: {},
            create: {
                name: 'permissions.update',
                description: 'Actualizar información de permisos',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'permissions.delete' },
            update: {},
            create: {
                name: 'permissions.delete',
                description: 'Eliminar permisos',
            },
        }),

        // Permisos de clubs
        prisma.permission.upsert({
            where: { name: 'clubs.read' },
            update: {},
            create: {
                name: 'clubs.read',
                description: 'Leer información de clubs',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'clubs.create' },
            update: {},
            create: {
                name: 'clubs.create',
                description: 'Crear nuevos clubs',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'clubs.update' },
            update: {},
            create: {
                name: 'clubs.update',
                description: 'Actualizar información de clubs',
            },
        }),
        prisma.permission.upsert({
            where: { name: 'clubs.delete' },
            update: {},
            create: {
                name: 'clubs.delete',
                description: 'Eliminar clubs',
            },
        }),
    ]);

    console.log(`✅ ${permissions.length} permisos creados/actualizados`);

    // 2. Crear club de ejemplo
    console.log('🏢 Creando club de ejemplo...');

    const club = await prisma.club.upsert({
        where: { id: 'club-example-id' },
        update: {},
        create: {
            id: 'club-example-id',
            name: 'Club Deportivo Ejemplo',
        },
    });

    console.log(`✅ Club creado: ${club.name}`);

    // 3. Crear roles para el club
    console.log('👥 Creando roles para el club...');

    // Obtener todos los permisos para asignarlos a los roles
    const allPermissions = await prisma.permission.findMany();
    const permissionIds = allPermissions.map(p => p.id);

    // Rol ADMIN con todos los permisos
    const adminRole = await prisma.role.upsert({
        where: {
            name_clubId: {
                name: 'ADMIN',
                clubId: club.id,
            }
        },
        update: {},
        create: {
            name: 'ADMIN',
            clubId: club.id,
            permissions: {
                create: permissionIds.map(permissionId => ({
                    permissionId,
                })),
            },
        },
    });

    // Rol MANAGER con permisos limitados
    const managerPermissions = allPermissions.filter(p =>
        !p.name.includes('delete') &&
        !p.name.includes('permissions.') &&
        !p.name.includes('roles.')
    );

    const managerRole = await prisma.role.upsert({
        where: {
            name_clubId: {
                name: 'MANAGER',
                clubId: club.id,
            }
        },
        update: {},
        create: {
            name: 'MANAGER',
            clubId: club.id,
            permissions: {
                create: managerPermissions.map(p => ({
                    permissionId: p.id,
                })),
            },
        },
    });

    // Rol MEMBER con permisos básicos
    const memberPermissions = allPermissions.filter(p =>
        p.name.includes('read') &&
        !p.name.includes('permissions.') &&
        !p.name.includes('roles.')
    );

    const memberRole = await prisma.role.upsert({
        where: {
            name_clubId: {
                name: 'MEMBER',
                clubId: club.id,
            }
        },
        update: {},
        create: {
            name: 'MEMBER',
            clubId: club.id,
            permissions: {
                create: memberPermissions.map(p => ({
                    permissionId: p.id,
                })),
            },
        },
    });

    console.log(`✅ Roles creados: ADMIN, MANAGER, MEMBER`);

    // 4. Crear usuarios de ejemplo
    console.log('👤 Creando usuarios de ejemplo...');

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Usuario admin
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@clubdeportivo.com' },
        update: {},
        create: {
            email: 'admin@clubdeportivo.com',
            password: hashedPassword,
            name: 'Administrador',
        },
    });

    // Usuario manager
    const managerUser = await prisma.user.upsert({
        where: { email: 'manager@clubdeportivo.com' },
        update: {},
        create: {
            email: 'manager@clubdeportivo.com',
            password: hashedPassword,
            name: 'Gerente',
        },
    });

    // Usuario member
    const memberUser = await prisma.user.upsert({
        where: { email: 'member@clubdeportivo.com' },
        update: {},
        create: {
            email: 'member@clubdeportivo.com',
            password: hashedPassword,
            name: 'Miembro',
        },
    });

    console.log(`✅ Usuarios creados: admin, manager, member`);

    // 5. Asignar usuarios a roles en el club
    console.log('🔗 Asignando usuarios a roles...');

    await Promise.all([
        // Admin con rol ADMIN
        prisma.userClub.upsert({
            where: {
                userId_clubId: {
                    userId: adminUser.id,
                    clubId: club.id,
                },
            },
            update: { roleId: adminRole.id },
            create: {
                userId: adminUser.id,
                clubId: club.id,
                roleId: adminRole.id,
            },
        }),

        // Manager con rol MANAGER
        prisma.userClub.upsert({
            where: {
                userId_clubId: {
                    userId: managerUser.id,
                    clubId: club.id,
                },
            },
            update: { roleId: managerRole.id },
            create: {
                userId: managerUser.id,
                clubId: club.id,
                roleId: managerRole.id,
            },
        }),

        // Member con rol MEMBER
        prisma.userClub.upsert({
            where: {
                userId_clubId: {
                    userId: memberUser.id,
                    clubId: club.id,
                },
            },
            update: { roleId: memberRole.id },
            create: {
                userId: memberUser.id,
                clubId: club.id,
                roleId: memberRole.id,
            },
        }),
    ]);

    console.log('✅ Usuarios asignados a roles');

    // 6. Crear datos de ejemplo adicionales
    console.log('📊 Creando datos de ejemplo adicionales...');

    // Miembros de ejemplo
    const members = await Promise.all([
        prisma.member.create({
            data: {
                name: 'Juan Pérez',
                email: 'juan.perez@email.com',
                clubId: club.id,
            },
        }),
        prisma.member.create({
            data: {
                name: 'María García',
                email: 'maria.garcia@email.com',
                clubId: club.id,
            },
        }),
        prisma.member.create({
            data: {
                name: 'Carlos López',
                email: 'carlos.lopez@email.com',
                clubId: club.id,
            },
        }),
    ]);

    // Sponsors de ejemplo
    const sponsors = await Promise.all([
        prisma.sponsor.create({
            data: {
                name: 'Empresa Deportiva ABC',
                email: 'ana.martinez@empresaabc.com',
                clubId: club.id,
            },
        }),
        prisma.sponsor.create({
            data: {
                name: 'Tienda Deportiva XYZ',
                email: 'roberto.silva@tiendaxyz.com',
                clubId: club.id,
            },
        }),
    ]);

    // Pagos de ejemplo
    const payments = await Promise.all([
        prisma.payment.create({
            data: {
                memberId: members[0].id,
                amount: 50.00,
                date: new Date('2024-08-01'),
                description: 'Mensualidad agosto 2024',
                clubId: club.id,
            },
        }),
        prisma.payment.create({
            data: {
                memberId: members[1].id,
                amount: 50.00,
                date: new Date('2024-08-01'),
                description: 'Mensualidad agosto 2024',
                clubId: club.id,
            },
        }),
        prisma.payment.create({
            data: {
                memberId: members[0].id,
                amount: 50.00,
                date: new Date('2024-09-01'),
                description: 'Mensualidad septiembre 2024',
                clubId: club.id,
            },
        }),
    ]);

    console.log(`✅ Datos de ejemplo creados:`);
    console.log(`   - ${members.length} miembros`);
    console.log(`   - ${sponsors.length} sponsors`);
    console.log(`   - ${payments.length} pagos`);

    // 7. Mostrar resumen final
    console.log('\n🎉 Seed completado exitosamente!');
    console.log('\n📋 Resumen de datos creados:');
    console.log(`   - ${permissions.length} permisos`);
    console.log(`   - 1 club: ${club.name}`);
    console.log(`   - 3 roles: ADMIN, MANAGER, MEMBER`);
    console.log(`   - 3 usuarios con contraseña: password123`);
    console.log(`   - ${members.length} miembros de ejemplo`);
    console.log(`   - ${sponsors.length} sponsors de ejemplo`);
    console.log(`   - ${payments.length} pagos de ejemplo`);

    console.log('\n🔑 Credenciales de acceso:');
    console.log('   Admin: admin@clubdeportivo.com / password123');
    console.log('   Manager: manager@clubdeportivo.com / password123');
    console.log('   Member: member@clubdeportivo.com / password123');

    console.log('\n🚀 El sistema está listo para usar!');
}

main()
    .catch((e) => {
        console.error('❌ Error durante el seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 