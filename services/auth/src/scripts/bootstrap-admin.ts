import * as bcrypt from 'bcrypt';
import { PrismaClient, Role, AccountStatus } from '../generated/prisma-client';

async function bootstrapAdmin(): Promise<void> {
  const prisma = new PrismaClient();

  try {
    const admins = [
      {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: 'Platform Admin',
        roleName: 'ADMIN'
      },
      {
        email: process.env.SUPERADMIN_EMAIL,
        password: process.env.SUPERADMIN_PASSWORD,
        name: 'Super Admin',
        roleName: 'SUPERADMIN'
      }
    ].filter(a => a.email && a.password);

    if (admins.length === 0) {
      throw new Error('No admin credentials found in .env (ADMIN_EMAIL/PASSWORD or SUPERADMIN_EMAIL/PASSWORD)');
    }

    for (const admin of admins) {
      const passwordHash = await bcrypt.hash(admin.password!, 12);

      await prisma.user.upsert({
        where: { email: admin.email },
        update: {
          name: admin.name,
          password: passwordHash,
          role: { connect: { name: admin.roleName } },
          status: AccountStatus.ACTIVE,
        },
        create: {
          email: admin.email!,
          name: admin.name,
          password: passwordHash,
          role: { connect: { name: admin.roleName } },
          status: AccountStatus.ACTIVE,
        },
      });

      console.log(`Admin account is ready: ${admin.email}`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

bootstrapAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
