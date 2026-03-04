import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../app.module';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

/**
 * End-to-End Tests for MentorProfileController
 *
 * Tests full request/response cycle including:
 * - Validation pipes
 * - Guards (JWT, Roles)
 * - Database operations
 * - Error handling
 *
 * Run: cd services/mentor-service && npm test mentor-profile.e2e-spec.ts
 */
describe('MentorProfileController (E2E Tests)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  // Mock JWT tokens
  const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
  
  const generateToken = (userId: number, role: string) => {
    return jwt.sign(
      { sub: userId, userId, role, email: `user${userId}@test.com` },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  };

  const createMockHeaders = (userId: number, role: string = 'MENTOR') => ({
    authorization: `Bearer ${generateToken(userId, role)}`,
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );

    await app.init();
    prisma = new PrismaClient();
  });

  // Cleanup before each test
  beforeEach(async () => {
    await prisma.mentorProfile.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  // ============================================================================
  // GET MY PROFILE TESTS
  // ============================================================================
  describe('GET /mentor-profiles/me (Get Current User Profile)', () => {
    it('should return mentor profile when authenticated', async () => {
      const userId = 1;
      
      // Create a mentor profile
      await prisma.mentorProfile.create({
        data: {
          userId,
          cvUrl: 'https://example.com/cv.pdf',
          linkedinUrl: 'https://linkedin.com/in/user1',
          industry: 'TECHNOLOGY',
          skills: ['Node.js', 'TypeScript', 'React'],
          bio: { text: 'Experienced full-stack developer' },
        },
      });

      const response = await request(app.getHttpServer())
        .get('/mentor-profiles/me')
        .set(createMockHeaders(userId, 'MENTOR'))
        .expect(200);

      expect(response.body).toMatchObject({
        userId,
        cvUrl: 'https://example.com/cv.pdf',
        linkedinUrl: 'https://linkedin.com/in/user1',
        industry: 'TECHNOLOGY',
        skills: expect.arrayContaining(['Node.js', 'TypeScript', 'React']),
      });
    });

    it('should return 401 when not authenticated', async () => {
      await request(app.getHttpServer())
        .get('/mentor-profiles/me')
        .expect(401);
    });

    it('should return 403 when user is not a mentor', async () => {
      const response = await request(app.getHttpServer())
        .get('/mentor-profiles/me')
        .set(createMockHeaders(1, 'STUDENT')) // Wrong role
        .expect(403);

      expect(response.body.message).toContain('Insufficient permissions');
    });

    it('should return 404 when profile does not exist', async () => {
      const userId = 999;

      const response = await request(app.getHttpServer())
        .get('/mentor-profiles/me')
        .set(createMockHeaders(userId, 'MENTOR'))
        .expect(404);

      expect(response.body.message).toContain('not found');
    });

    it('should return profile with minimal data', async () => {
      const userId = 2;

      // Create a profile with minimal data
      await prisma.mentorProfile.create({
        data: {
          userId,
          // Only userId is required, rest are optional
        },
      });

      const response = await request(app.getHttpServer())
        .get('/mentor-profiles/me')
        .set(createMockHeaders(userId, 'MENTOR'))
        .expect(200);

      expect(response.body).toMatchObject({
        userId,
        skills: [],
      });
    });
  });

  // ============================================================================
  // UPDATE PROFILE TESTS
  // ============================================================================
  describe('PUT /mentor-profiles/me (Update Current User Profile)', () => {
    it('should update mentor profile with all fields', async () => {
      const userId = 10;

      // Create initial profile
      await prisma.mentorProfile.create({
        data: {
          userId,
          cvUrl: null,
          linkedinUrl: null,
          industry: null,
          skills: [],
        },
      });

      const updateDto = {
        cvUrl: 'https://example.com/updated-cv.pdf',
        linkedinUrl: 'https://linkedin.com/in/updated',
        industry: 'FINTECH',
        skills: ['TypeScript', 'Solidity', 'Web3'],
        bio: 'Blockchain expert',
      };

      const response = await request(app.getHttpServer())
        .put('/mentor-profiles/me')
        .set(createMockHeaders(userId, 'MENTOR'))
        .send(updateDto)
        .expect(200);

      expect(response.body).toMatchObject({
        userId,
        cvUrl: 'https://example.com/updated-cv.pdf',
        linkedinUrl: 'https://linkedin.com/in/updated',
        industry: 'FINTECH',
        skills: expect.arrayContaining(['TypeScript', 'Solidity']),
      });
    });

    it('should update only specific fields (PATCH-style)', async () => {
      const userId = 11;

      // Create initial profile
      await prisma.mentorProfile.create({
        data: {
          userId,
          cvUrl: 'https://old-cv.com',
          industry: 'MARKETING',
          skills: ['SEO', 'Content Writing'],
        },
      });

      const updateDto = {
        skills: ['SEO', 'Content Writing', 'Analytics'],
      };

      const response = await request(app.getHttpServer())
        .put('/mentor-profiles/me')
        .set(createMockHeaders(userId, 'MENTOR'))
        .send(updateDto)
        .expect(200);

      expect(response.body).toMatchObject({
        userId,
        cvUrl: 'https://old-cv.com', // Unchanged
        industry: 'MARKETING', // Unchanged
        skills: expect.arrayContaining(['Analytics']),
      });
    });

    it('should validate URL fields', async () => {
      const userId = 12;

      await prisma.mentorProfile.create({
        data: { userId },
      });

      const updateDto = {
        cvUrl: 'not-a-valid-url', // Invalid URL
      };

      const response = await request(app.getHttpServer())
        .put('/mentor-profiles/me')
        .set(createMockHeaders(userId, 'MENTOR'))
        .send(updateDto)
        .expect(400);

      expect(response.body.message).toContainEqual(
        expect.stringContaining('cvUrl')
      );
    });

    it('should return 401 when not authenticated', async () => {
      await request(app.getHttpServer())
        .put('/mentor-profiles/me')
        .send({ skills: ['Node.js'] })
        .expect(401);
    });

    it('should return 404 when profile does not exist', async () => {
      const userId = 777;

      const response = await request(app.getHttpServer())
        .put('/mentor-profiles/me')
        .set(createMockHeaders(userId, 'MENTOR'))
        .send({ cvUrl: 'https://example.com/cv.pdf' })
        .expect(404);

      expect(response.body.message).toContain('not found');
    });

    it('should reject non-mentor users', async () => {
      await request(app.getHttpServer())
        .put('/mentor-profiles/me')
        .set(createMockHeaders(1, 'STUDENT')) // Wrong role
        .send({ skills: ['Node.js'] })
        .expect(403);
    });
  });

  // ============================================================================
  // LIST PROFILES TESTS (Admin only)
  // ============================================================================
  describe('GET /mentor-profiles (List All Profiles - Admin Only)', () => {
    it('should list all profiles with default pagination (admin)', async () => {
      // Create test profiles
      const userIds = [20, 21, 22];
      for (const userId of userIds) {
        await prisma.mentorProfile.create({
          data: {
            userId,
            industry: 'TECHNOLOGY',
            skills: ['Node.js'],
          },
        });
      }

      const response = await request(app.getHttpServer())
        .get('/mentor-profiles')
        .set(createMockHeaders(100, 'ADMIN')) // Admin access
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should handle pagination parameters', async () => {
      // Create multiple profiles
      for (let i = 0; i < 15; i++) {
        await prisma.mentorProfile.create({
          data: {
            userId: 50 + i,
            industry: 'TECHNOLOGY',
          },
        });
      }

      const response = await request(app.getHttpServer())
        .get('/mentor-profiles')
        .query({ skip: '5', take: '5' })
        .set(createMockHeaders(100, 'ADMIN'))
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 401 when not authenticated', async () => {
      await request(app.getHttpServer())
        .get('/mentor-profiles')
        .expect(401);
    });

    it('should return 403 when user is not admin', async () => {
      await request(app.getHttpServer())
        .get('/mentor-profiles')
        .set(createMockHeaders(1, 'MENTOR')) // Mentor, not admin
        .expect(403);
    });

    it('should return empty list when no profiles exist', async () => {
      // Profiles already cleaned up by beforeEach
      const response = await request(app.getHttpServer())
        .get('/mentor-profiles')
        .set(createMockHeaders(100, 'ADMIN'))
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });
  });

  // ============================================================================
  // DELETE PROFILE TESTS (Admin only)
  // ============================================================================
  describe('DELETE /mentor-profiles/:id (Delete Profile - Admin Only)', () => {
    it('should delete mentor profile (admin)', async () => {
      const userId = 30;

      // Create a profile
      await prisma.mentorProfile.create({
        data: {
          userId,
          cvUrl: 'https://example.com/cv.pdf',
          skills: ['Node.js'],
        },
      });

      // Delete it
      await request(app.getHttpServer())
        .delete(`/mentor-profiles/${userId}`)
        .set(createMockHeaders(100, 'ADMIN'))
        .expect(204);

      // Verify it's deleted
      const profile = await prisma.mentorProfile.findUnique({
        where: { userId },
      });
      expect(profile).toBeNull();
    });

    it('should return 401 when not authenticated', async () => {
      await request(app.getHttpServer())
        .delete('/mentor-profiles/999')
        .expect(401);
    });

    it('should return 403 when user is not admin', async () => {
      const userId = 35;

      await prisma.mentorProfile.create({
        data: { userId },
      });

      await request(app.getHttpServer())
        .delete(`/mentor-profiles/${userId}`)
        .set(createMockHeaders(1, 'MENTOR')) // Not admin
        .expect(403);
    });

    it('should return 404 when profile does not exist', async () => {
      const response = await request(app.getHttpServer())
        .delete('/mentor-profiles/999')
        .set(createMockHeaders(100, 'ADMIN'))
        .expect(404);

      expect(response.body.message).toContain('not found');
    });

    it('should delete only the specified profile', async () => {
      // Create two profiles
      await prisma.mentorProfile.create({ data: { userId: 40 } });
      await prisma.mentorProfile.create({ data: { userId: 41 } });

      // Delete one
      await request(app.getHttpServer())
        .delete('/mentor-profiles/40')
        .set(createMockHeaders(100, 'ADMIN'))
        .expect(204);

      // Verify only one is deleted
      const deleted = await prisma.mentorProfile.findUnique({
        where: { userId: 40 },
      });
      const remaining = await prisma.mentorProfile.findUnique({
        where: { userId: 41 },
      });

      expect(deleted).toBeNull();
      expect(remaining).not.toBeNull();
    });
  });

  // ============================================================================
  // VALIDATION TESTS
  // ============================================================================
  describe('Input Validation', () => {
    it('should reject invalid email in request', async () => {
      const response = await request(app.getHttpServer())
        .put('/mentor-profiles/me')
        .set(createMockHeaders(1, 'MENTOR'))
        .send({
          cvUrl: 'not-a-url',
        });

      expect(response.status).toBe(400);
    });

    it('should reject skills if not an array', async () => {
      const userId = 45;

      await prisma.mentorProfile.create({
        data: { userId },
      });

      const response = await request(app.getHttpServer())
        .put('/mentor-profiles/me')
        .set(createMockHeaders(userId, 'MENTOR'))
        .send({
          skills: 'not-an-array', // Should be array
        })
        .expect(400);

      expect(response.body.message).toBeDefined();
    });

    it('should accept valid string input for industry', async () => {
      const userId = 46;

      await prisma.mentorProfile.create({
        data: { userId },
      });

      const response = await request(app.getHttpServer())
        .put('/mentor-profiles/me')
        .set(createMockHeaders(userId, 'MENTOR'))
        .send({
          industry: 'TECHNOLOGY',
        })
        .expect(200);

      expect(response.body.industry).toBe('TECHNOLOGY');
    });
  });

  // ============================================================================
  // EDGE CASES
  // ============================================================================
  describe('Edge Cases and Error Handling', () => {
    it('should handle concurrent requests properly', async () => {
      const userId = 50;

      await prisma.mentorProfile.create({
        data: { userId },
      });

      // Make multiple concurrent requests
      const requests = [
        request(app.getHttpServer())
          .put('/mentor-profiles/me')
          .set(createMockHeaders(userId, 'MENTOR'))
          .send({ cvUrl: 'https://cv1.com' }),
        request(app.getHttpServer())
          .put('/mentor-profiles/me')
          .set(createMockHeaders(userId, 'MENTOR'))
          .send({ cvUrl: 'https://cv2.com' }),
        request(app.getHttpServer())
          .get('/mentor-profiles/me')
          .set(createMockHeaders(userId, 'MENTOR')),
      ];

      const results = await Promise.all(requests);

      // All should succeed
      expect(results[0].status).toBe(200);
      expect(results[1].status).toBe(200);
      expect(results[2].status).toBe(200);
    });

    it('should preserve existing data when updating partial fields', async () => {
      const userId = 51;

      // Create profile with full data
      const originalData = {
        userId,
        cvUrl: 'https://original-cv.com',
        linkedinUrl: 'https://linkedin.com/original',
        industry: 'TECHNOLOGY',
        skills: ['Node.js', 'Python'],
        bio: { text: 'Original bio' },
      };

      await prisma.mentorProfile.create({ data: originalData });

      // Update only bio
      await request(app.getHttpServer())
        .put('/mentor-profiles/me')
        .set(createMockHeaders(userId, 'MENTOR'))
        .send({ bio: 'Updated bio' })
        .expect(200);

      // Verify other fields are intact
      const response = await request(app.getHttpServer())
        .get('/mentor-profiles/me')
        .set(createMockHeaders(userId, 'MENTOR'))
        .expect(200);

      expect(response.body.cvUrl).toBe('https://original-cv.com');
      expect(response.body.linkedinUrl).toBe('https://linkedin.com/original');
      expect(response.body.industry).toBe('TECHNOLOGY');
      expect(response.body.skills).toEqual(['Node.js', 'Python']);
    });

    it('should handle large skill arrays', async () => {
      const userId = 52;

      await prisma.mentorProfile.create({
        data: { userId },
      });

      const largeSkillArray = Array.from({ length: 100 }, (_, i) => `Skill${i}`);

      const response = await request(app.getHttpServer())
        .put('/mentor-profiles/me')
        .set(createMockHeaders(userId, 'MENTOR'))
        .send({ skills: largeSkillArray })
        .expect(200);

      expect(response.body.skills).toEqual(largeSkillArray);
    });
  });
});
