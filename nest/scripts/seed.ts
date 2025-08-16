import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Configuración externalizada
const SEED_CONFIG = {
  CLUB: {
    name: 'Club Deportivo Ejemplo',
    alias: 'CDE',
    address: 'Av. Principal 123, Ciudad Ejemplo',
    image: null, // Base64 image placeholder
    foundationDate: new Date('2020-01-01'),
    description: 'Club deportivo dedicado al desarrollo de talentos y promoción del deporte en la comunidad.',
  },
  ROLES: [
    { name: 'ADMIN' },
    { name: 'MANAGER' },
    { name: 'MEMBER' },
  ],
  PERMISSIONS: [
    { name: 'users.read', description: 'Leer usuarios' },
    { name: 'users.write', description: 'Crear/editar usuarios' },
    { name: 'users.delete', description: 'Eliminar usuarios' },
    { name: 'clubs.read', description: 'Leer clubs' },
    { name: 'clubs.write', description: 'Crear/editar clubs' },
    { name: 'clubs.delete', description: 'Eliminar clubs' },
    { name: 'clubs.update', description: 'Actualizar clubs' },
    { name: 'members.read', description: 'Leer miembros' },
    { name: 'members.write', description: 'Crear/editar miembros' },
    { name: 'members.delete', description: 'Eliminar miembros' },
    { name: 'sponsors.read', description: 'Leer patrocinadores' },
    { name: 'sponsors.write', description: 'Crear/editar patrocinadores' },
    { name: 'sponsors.delete', description: 'Eliminar patrocinadores' },
    { name: 'payments.read', description: 'Leer pagos' },
    { name: 'payments.write', description: 'Crear/editar pagos' },
    { name: 'payments.delete', description: 'Eliminar pagos' },
    { name: 'properties.read', description: 'Leer propiedades' },
    { name: 'properties.write', description: 'Crear/editar propiedades' },
    { name: 'properties.delete', description: 'Eliminar propiedades' },
    { name: 'activities.read', description: 'Leer actividades' },
    { name: 'activities.write', description: 'Crear/editar actividades' },
    { name: 'activities.delete', description: 'Eliminar actividades' },
  ],
  USERS: [
    {
      email: 'admin@club.com',
      password: 'admin123',
      name: 'Administrador',
      role: 'ADMIN',
    },
    {
      email: 'manager@club.com',
      password: 'manager123',
      name: 'Gerente',
      role: 'MANAGER',
    },
    {
      email: 'member@club.com',
      password: 'member123',
      name: 'Miembro',
      role: 'MEMBER',
    },
  ],
  MEMBERS: [
    { name: 'Juan Pérez', email: 'juan@example.com' },
    { name: 'María García', email: 'maria@example.com' },
    { name: 'Carlos López', email: 'carlos@example.com' },
  ],
  SPONSORS: [
    { name: 'Empresa A', email: 'contacto@empresaa.com' },
    { name: 'Empresa B', email: 'info@empresab.com' },
  ],
} as const;

async function main() {
  try {
    console.log('🌱 Iniciando proceso de seed...');

    // Crear club
    console.log('📋 Creando club...');
    const club = await prisma.club.upsert({
      where: { id: 'default-club' },
      update: {},
      create: {
        id: 'default-club',
        name: SEED_CONFIG.CLUB.name,
        alias: SEED_CONFIG.CLUB.alias,
        address: SEED_CONFIG.CLUB.address,
        image: SEED_CONFIG.CLUB.image,
        foundationDate: SEED_CONFIG.CLUB.foundationDate,
        description: SEED_CONFIG.CLUB.description,
      },
    });
    console.log(`✅ Club creado: ${club.name}`);

    // Crear roles
    console.log('👥 Creando roles...');
    const roles = await Promise.all(
      SEED_CONFIG.ROLES.map(async (roleData) => {
        return prisma.role.upsert({
          where: { name_clubId: { name: roleData.name, clubId: club.id } },
          update: {},
          create: {
            name: roleData.name,
            clubId: club.id,
          },
        });
      })
    );
    console.log(`✅ ${roles.length} roles creados`);

    // Crear permisos
    console.log('🔐 Creando permisos...');
    const permissions = await Promise.all(
      SEED_CONFIG.PERMISSIONS.map(async (permissionData) => {
        return prisma.permission.upsert({
          where: { name: permissionData.name },
          update: { description: permissionData.description },
          create: permissionData,
        });
      })
    );
    console.log(`✅ ${permissions.length} permisos creados`);

    // Asignar permisos a roles
    console.log('🔗 Asignando permisos a roles...');
    const adminRole = roles.find(r => r.name === 'ADMIN');
    const managerRole = roles.find(r => r.name === 'MANAGER');
    const memberRole = roles.find(r => r.name === 'MEMBER');

    if (adminRole) {
      // Admin tiene todos los permisos
      await Promise.all(
        permissions.map(permission =>
          prisma.rolePermission.upsert({
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
          })
        )
      );
    }

    if (managerRole) {
      // Manager tiene permisos de lectura y escritura (no eliminación)
      const managerPermissions = permissions.filter(p => !p.name.includes(':delete'));
      await Promise.all(
        managerPermissions.map(permission =>
          prisma.rolePermission.upsert({
            where: {
              roleId_permissionId: {
                roleId: managerRole.id,
                permissionId: permission.id,
              },
            },
            update: {},
            create: {
              roleId: managerRole.id,
              permissionId: permission.id,
            },
          })
        )
      );
    }

    if (memberRole) {
      // Member solo tiene permisos de lectura
      const memberPermissions = permissions.filter(p => p.name.includes(':read'));
      await Promise.all(
        memberPermissions.map(permission =>
          prisma.rolePermission.upsert({
            where: {
              roleId_permissionId: {
                roleId: memberRole.id,
                permissionId: permission.id,
              },
            },
            update: {},
            create: {
              roleId: memberRole.id,
              permissionId: permission.id,
            },
          })
        )
      );
    }
    console.log('✅ Permisos asignados a roles');

    // Crear usuarios
    console.log('👤 Creando usuarios...');
    const users = await Promise.all(
      SEED_CONFIG.USERS.map(async (userData) => {
        const role = roles.find(r => r.name === userData.role);
        if (!role) {
          throw new Error(`Rol ${userData.role} no encontrado`);
        }

        const user = await prisma.user.upsert({
          where: { email: userData.email },
          update: {},
          create: {
            email: userData.email,
            password: userData.password, // En producción esto debería estar hasheado
            name: userData.name,
          },
        });

        // Asignar rol al usuario
        await prisma.userClub.upsert({
          where: {
            userId_clubId: {
              userId: user.id,
              clubId: club.id,
            },
          },
          update: { roleId: role.id },
          create: {
            userId: user.id,
            clubId: club.id,
            roleId: role.id,
          },
        });

        return user;
      })
    );
    console.log(`✅ ${users.length} usuarios creados`);

    // Crear miembros
    console.log('🏃 Creando miembros...');
    const members = await Promise.all(
      SEED_CONFIG.MEMBERS.map(async (memberData) => {
        return prisma.member.upsert({
          where: { email: memberData.email },
          update: {},
          create: {
            ...memberData,
            clubId: club.id,
          },
        });
      })
    );
    console.log(`✅ ${members.length} miembros creados`);

    // Crear patrocinadores
    console.log('💼 Creando patrocinadores...');
    const sponsors = await Promise.all(
      SEED_CONFIG.SPONSORS.map(async (sponsorData) => {
        return prisma.sponsor.upsert({
          where: { email: sponsorData.email },
          update: {},
          create: {
            ...sponsorData,
            clubId: club.id,
          },
        });
      })
    );
    console.log(`✅ ${sponsors.length} patrocinadores creados`);

    console.log('🎉 Seed completado exitosamente!');
    console.log(`📊 Resumen:`);
    console.log(`   - Club: ${club.name}`);
    console.log(`   - Roles: ${roles.length}`);
    console.log(`   - Permisos: ${permissions.length}`);
    console.log(`   - Usuarios: ${users.length}`);
    console.log(`   - Miembros: ${members.length}`);
    console.log(`   - Patrocinadores: ${sponsors.length}`);

  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('❌ Error fatal:', e);
    process.exit(1);
  }); 