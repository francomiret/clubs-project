import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkIds() {
  try {
    console.log('🔍 Verificando IDs en la base de datos...\n');

    // Verificar clubs
    const clubs = await prisma.club.findMany({
      select: { id: true, name: true }
    });
    console.log('🏢 Clubs:');
    clubs.forEach(club => {
      console.log(`  - ID: ${club.id}, Nombre: ${club.name}`);
    });

    // Verificar roles
    const roles = await prisma.role.findMany({
      select: { id: true, name: true, clubId: true }
    });
    console.log('\n👥 Roles:');
    roles.forEach(role => {
      console.log(`  - ID: ${role.id}, Nombre: ${role.name}, ClubID: ${role.clubId}`);
    });

    // Verificar usuarios
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true }
    });
    console.log('\n👤 Usuarios:');
    users.forEach(user => {
      console.log(`  - ID: ${user.id}, Email: ${user.email}, Nombre: ${user.name}`);
    });

    // Verificar UserClubs
    const userClubs = await prisma.userClub.findMany({
      select: { userId: true, clubId: true, roleId: true }
    });
    console.log('\n🔗 UserClubs:');
    userClubs.forEach(userClub => {
      console.log(`  - UserID: ${userClub.userId}, ClubID: ${userClub.clubId}, RoleID: ${userClub.roleId}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkIds(); 