import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Crear permisos CRUD para todas las entidades
    const permissions = [
        // Permisos para Users
        { name: 'users.read', description: 'Leer usuarios' },
        { name: 'users.create', description: 'Crear usuarios' },
        { name: 'users.update', description: 'Actualizar usuarios' },
        { name: 'users.delete', description: 'Eliminar usuarios' },

        // Permisos para Members
        { name: 'members.read', description: 'Leer miembros' },
        { name: 'members.create', description: 'Crear miembros' },
        { name: 'members.update', description: 'Actualizar miembros' },
        { name: 'members.delete', description: 'Eliminar miembros' },

        // Permisos para Sponsors
        { name: 'sponsors.read', description: 'Leer sponsors' },
        { name: 'sponsors.create', description: 'Crear sponsors' },
        { name: 'sponsors.update', description: 'Actualizar sponsors' },
        { name: 'sponsors.delete', description: 'Eliminar sponsors' },

        // Permisos para Payments
        { name: 'payments.read', description: 'Leer pagos' },
        { name: 'payments.create', description: 'Crear pagos' },
        { name: 'payments.update', description: 'Actualizar pagos' },
        { name: 'payments.delete', description: 'Eliminar pagos' },

        // Permisos para Roles
        { name: 'roles.read', description: 'Leer roles' },
        { name: 'roles.create', description: 'Crear roles' },
        { name: 'roles.update', description: 'Actualizar roles' },
        { name: 'roles.delete', description: 'Eliminar roles' },

        // Permisos para Permissions
        { name: 'permissions.read', description: 'Leer permisos' },
        { name: 'permissions.create', description: 'Crear permisos' },
        { name: 'permissions.update', description: 'Actualizar permisos' },
        { name: 'permissions.delete', description: 'Eliminar permisos' },

        // Permisos para Club
        { name: 'club.read', description: 'Leer información del club' },
        { name: 'club.update', description: 'Actualizar información del club' },
        { name: 'clubs.read', description: 'Leer clubs' },

        // Permisos para Properties
        { name: 'properties.read', description: 'Leer propiedades' },
        { name: 'properties.create', description: 'Crear propiedades' },
        { name: 'properties.update', description: 'Actualizar propiedades' },
        { name: 'properties.delete', description: 'Eliminar propiedades' },

        // Permisos para Activities
        { name: 'activities.read', description: 'Leer actividades' },
        { name: 'activities.create', description: 'Crear actividades' },
        { name: 'activities.update', description: 'Actualizar actividades' },
        { name: 'activities.delete', description: 'Eliminar actividades' },
    ];

    console.log('📝 Creating permissions...');
    const createdPermissions: any[] = [];
    for (const permission of permissions) {
        const created = await prisma.permission.upsert({
            where: { name: permission.name },
            update: {},
            create: permission,
        });
        createdPermissions.push(created);
    }
    console.log(`✅ Created ${createdPermissions.length} permissions`);

    // Crear club por defecto
    console.log('🏢 Creating default club...');
    const defaultClub = await prisma.club.upsert({
        where: { id: 'default-club' },
        update: {},
        create: {
            id: 'default-club',
            name: 'Club Deportivo',
        },
    });
    console.log(`✅ Created default club: ${defaultClub.name}`);

    // Crear rol Admin con todos los permisos
    console.log('👑 Creating Admin role...');
    const adminRole = await prisma.role.upsert({
        where: { id: 'admin-role' },
        update: {},
        create: {
            id: 'admin-role',
            name: 'ADMIN',
            clubId: defaultClub.id,
        },
    });
    console.log(`✅ Created admin role: ${adminRole.name}`);

    // Asignar todos los permisos al rol Admin
    console.log('🔗 Assigning all permissions to Admin role...');
    for (const permission of createdPermissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: adminRole.id,
                    permissionId: permission.id,
                },
            },
            update: {},
            create: {
                roleId: adminRole.id,
                permissionId: permission.id,
            },
        });
    }
    console.log(`✅ Assigned ${createdPermissions.length} permissions to Admin role`);

    // Crear usuario admin por defecto
    console.log('👤 Creating default admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@club.com' },
        update: {},
        create: {
            email: 'admin@club.com',
            password: hashedPassword,
            name: 'Administrador',
        },
    });
    console.log(`✅ Created admin user: ${adminUser.email}`);

    // Asignar rol Admin al usuario admin
    console.log('🔗 Assigning Admin role to admin user...');
    await prisma.userClub.upsert({
        where: {
            userId_clubId: {
                userId: adminUser.id,
                clubId: defaultClub.id,
            },
        },
        update: {},
        create: {
            userId: adminUser.id,
            clubId: defaultClub.id,
            roleId: adminRole.id,
        },
    });
    console.log(`✅ Assigned Admin role to admin user`);

    console.log('🎉 Database seed completed successfully!');
    console.log('');
    console.log('📋 Summary:');
    console.log(`- ${createdPermissions.length} permissions created`);
    console.log(`- 1 default club created`);
    console.log(`- 1 admin role created with all permissions`);
    console.log(`- 1 admin user created (admin@club.com / admin123)`);
    console.log('');
    console.log('🔑 Default login credentials:');
    console.log('Email: admin@club.com');
    console.log('Password: admin123');
}

main()
    .catch((e) => {
        console.error('❌ Error during seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 