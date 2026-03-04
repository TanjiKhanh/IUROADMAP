import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv'; 

dotenv.config(); 

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding admin user...');

  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  if (!adminEmail) {
    throw new Error('SEED_ADMIN_EMAIL environment variable is required');
  }
  // prefer to set SEED_ADMIN_PASSWORD in CI/secret manager. If missing, generate one.
  let adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!adminPassword) {
    adminPassword = crypto.randomBytes(12).toString('base64'); // secure random password
    console.warn('No SEED_ADMIN_PASSWORD provided. Generated password (store it in your secret manager):', adminPassword);
  }

  const hashed = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashed,
      name: 'System Administrator',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
    create: {
      email: adminEmail,
      password: hashed,
      name: 'System Administrator',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  console.log(`Upserted admin user: ${admin.email}`);
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Seed error', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });