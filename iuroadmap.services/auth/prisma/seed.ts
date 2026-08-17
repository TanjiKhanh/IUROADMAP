
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv'; 

dotenv.config(); 

import { PrismaClient } from '../src/generated/prisma-client';
import { APP_PERMISSIONS, PMS, AppConstant } from '@iuroadmap/shared';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding permission groups and permissions...');
  for (const perm of APP_PERMISSIONS) {
    const group = await prisma.permissionGroup.upsert({
      where: { name: perm.groupId },
      update: {},
      create: { name: perm.groupId },
    });

    await prisma.permission.upsert({
      where: { name: perm.code },
      update: { 
        displayName: perm.displayName,
        description: perm.displayName,
        groupId: group.id
      },
      create: { 
        name: perm.code, 
        displayName: perm.displayName,
        description: perm.displayName,
        groupId: group.id
      },
    });
  }
  console.log(`Seeded ${APP_PERMISSIONS.length} permissions with groups.`);

  console.log('Seeding roles...');
  const roles = [
    AppConstant.RoleName.Learner, 
    AppConstant.RoleName.Mentor, 
    AppConstant.RoleName.Admin, 
    AppConstant.RoleName.SuperAdmin
  ];
  
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }
  
  // Assign all permissions to SUPERADMIN and ADMIN
  console.log('Assigning permissions to roles...');
  const allPermissions = await prisma.permission.findMany();
  
  await prisma.role.update({
    where: { name: AppConstant.RoleName.SuperAdmin },
    data: { permissions: { set: allPermissions.map(p => ({ id: p.id })) } }
  });

  await prisma.role.update({
    where: { name: AppConstant.RoleName.Admin },
    data: { permissions: { set: allPermissions.map(p => ({ id: p.id })) } }
  });

  // Assign specific permissions to LEARNER and MENTOR
  const learnerPerms = allPermissions.filter(p => [PMS.RM_USER, PMS.LR_USER].includes(p.name as PMS));
  
  await prisma.role.update({
    where: { name: AppConstant.RoleName.Learner },
    data: { permissions: { set: learnerPerms.map(p => ({ id: p.id })) } }
  });

  await prisma.role.update({
    where: { name: AppConstant.RoleName.Mentor },
    data: { permissions: { set: learnerPerms.map(p => ({ id: p.id })) } }
  });

  console.log('Roles and Permissions seeded.');

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@iuroadmap.com';
  let adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!adminPassword) {
    adminPassword = 'password123'; 
    console.warn('No SEED_ADMIN_PASSWORD provided. Using default password: password123');
  }

  const hashed = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashed,
      name: 'System Administrator',
      role: { connect: { name: AppConstant.RoleName.Admin } },
      status: 'ACTIVE',
    },
    create: {
      email: adminEmail,
      password: hashed,
      name: 'System Administrator',
      role: { connect: { name: AppConstant.RoleName.Admin } },
      status: 'ACTIVE',
    },
  });
  console.log(`Upserted admin user: ${admin.email}`);

  const superadmin = await prisma.user.upsert({
    where: { email: 'superadmin@iuroadmap.com' },
    update: { password: hashed, name: 'System Superadmin', role: { connect: { name: AppConstant.RoleName.SuperAdmin } }, status: 'ACTIVE' },
    create: { email: 'superadmin@iuroadmap.com', password: hashed, name: 'System Superadmin', role: { connect: { name: AppConstant.RoleName.SuperAdmin } }, status: 'ACTIVE' },
  });
  console.log(`Upserted superadmin user: ${superadmin.email}`);

  const learner = await prisma.user.upsert({
    where: { email: 'learner@iuroadmap.com' },
    update: { password: hashed, name: 'Test Learner', role: { connect: { name: AppConstant.RoleName.Learner } }, status: 'ACTIVE' },
    create: { email: 'learner@iuroadmap.com', password: hashed, name: 'Test Learner', role: { connect: { name: AppConstant.RoleName.Learner } }, status: 'ACTIVE' },
  });
  console.log(`Upserted learner user: ${learner.email}`);

  const mentor = await prisma.user.upsert({
    where: { email: 'mentor@iuroadmap.com' },
    update: { password: hashed, name: 'Test Mentor', role: { connect: { name: AppConstant.RoleName.Mentor } }, status: 'ACTIVE' },
    create: { email: 'mentor@iuroadmap.com', password: hashed, name: 'Test Mentor', role: { connect: { name: AppConstant.RoleName.Mentor } }, status: 'ACTIVE' },
  });
  console.log(`Upserted mentor user: ${mentor.email}`);

  console.log('Seeding bulk random users for testing...');
  const statuses = ['ACTIVE', 'BANNED', 'PENDING_APPROVAL', 'REJECTED'];
  const tiers = ['FREE', 'VIP', 'PRO'];
  
  const bulkUsers = [];
  
  for (let i = 1; i <= 50; i++) {
    const isMentor = i % 5 === 0;
    const roleName = isMentor ? AppConstant.RoleName.Mentor : AppConstant.RoleName.Learner;
    const status = statuses[i % statuses.length];
    const tier = tiers[i % tiers.length];
    const email = `testuser${i}@iuroadmap.com`;
    
    // Set expiration date 30 days in the future for non-free tiers
    const expiresAt = tier !== 'FREE' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null;

    bulkUsers.push(
      prisma.user.upsert({
        where: { email },
        update: { 
          password: hashed, 
          name: `Test User ${i}`, 
          role: { connect: { name: roleName } }, 
          status: status as any, 
          subscriptionTier: tier as any,
          subscriptionExpiresAt: expiresAt
        },
        create: { 
          email, 
          password: hashed, 
          name: `Test User ${i}`, 
          role: { connect: { name: roleName } }, 
          status: status as any,
          subscriptionTier: tier as any,
          subscriptionExpiresAt: expiresAt
        },
      })
    );
  }

  await Promise.all(bulkUsers);
  console.log(`Seeded 50 random bulk users.`);

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