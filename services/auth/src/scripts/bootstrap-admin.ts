import * as bcrypt from 'bcrypt';
import { PrismaClient, Role, AccountStatus } from '../generated/prisma-client';

async function bootstrapAdmin(): Promise<void> {
  const prisma = new PrismaClient();

  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME ?? 'Platform Admin';

    if (!email || !password) {
      throw new Error('Missing ADMIN_EMAIL or ADMIN_PASSWORD');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.upsert({
      where: { email },
      update: {
        name,
        password: passwordHash,
        role: Role.ADMIN,
        status: AccountStatus.ACTIVE,
      },
      create: {
        email,
        name,
        password: passwordHash,
        role: Role.ADMIN,
        status: AccountStatus.ACTIVE,
      },
    });

    console.log(`Admin account is ready: ${email}`);
  } finally {
    await prisma.$disconnect();
  }
}

bootstrapAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
