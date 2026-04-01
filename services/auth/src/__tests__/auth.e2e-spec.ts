import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaClient } from '../generated/client';
import { MentorClientService } from '../external/mentor-client/mentor-client.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient; // Declare but don't instantiate

  beforeAll(async () => {
    // 1. Create PrismaClient FIRST (before app init)
    prisma = new PrismaClient();
    
    try {
      await prisma.$connect();
    } catch (error) {
      console.error('❌ Database connection failed. Make sure PostgreSQL is running.');
      throw error;
    }

    // 2. Boot up the application
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MentorClientService)
      .useValue({
        createMentorProfile: jest.fn().mockResolvedValue({ success: true }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    
    await app.init();
  });

  beforeEach(async () => {
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  // =========================================================================
  // LEARNER REGISTRATION TESTS
  // =========================================================================
  describe('/auth/register/learner (POST)', () => {
    
    it('1. [Success] should register a learner and return 201 Created', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register/learner')
        .send({
          email: 'learner@gupjob.com',
          password: 'Password123!',
          name: 'Tan Khanh',
          role: 'STUDENT',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe('learner@gupjob.com');
      expect(response.body.status).toBe('ACTIVE');
      expect(response.body).not.toHaveProperty('password'); // Security check
    });

    it('2. [DB Test] should return 409 Conflict if email already exists', async () => {
      const payload = {
        email: 'duplicate@gupjob.com',
        password: 'Password123!',
        name: 'Tan Khanh',
        role: 'STUDENT',
      };

      // Send first request (Success)
      await request(app.getHttpServer()).post('/auth/register/learner').send(payload);

      // Send exact same request again (Should fail at the Prisma level)
      const response = await request(app.getHttpServer())
        .post('/auth/register/learner')
        .send(payload);

      expect(response.status).toBe(409); // Conflict
      expect(response.body.message).toContain('already exists');
    });

    it('3. [Validation Test] should return 400 Bad Request for invalid email format', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register/learner')
        .send({
          email: 'not-an-email', // This should trigger @IsEmail()
          password: 'Password123!',
          name: 'Tan Khanh',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(expect.arrayContaining([expect.stringContaining('email format')]));
    });
  });

  // =========================================================================
  // MENTOR REGISTRATION TESTS
  // =========================================================================
  describe('/auth/register/mentor (POST)', () => {
    
    it('1. [Success] should register a mentor as PENDING_APPROVAL', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register/mentor')
        .send({
          email: 'mentor@gupjob.com',
          password: 'Password123!',
          name: 'Pro Mentor',
          role: 'MENTOR',
          cvUrl: 'https://linkedin.com/in/mentor',
          industry: 'SOFTWARE_ENGINEERING',
          skills: ['NestJS', 'React']
        });

      expect(response.status).toBe(201);
      expect(response.body.email).toBe('mentor@gupjob.com');
      expect(response.body.status).toBe('PENDING_APPROVAL'); // Admin must approve later
    });

    it('2. [Validation Test] should return 400 Bad Request if CV URL is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register/mentor')
        .send({
          email: 'badmentor@gupjob.com',
          password: 'Password123!',
          name: 'Bad Mentor',
          // cvUrl is missing!
          industry: 'MARKETING',
          skills: ['SEO']
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(expect.arrayContaining([expect.stringContaining('CV')]));
    });
  });

  // =========================================================================
  // LOGIN TESTS
  // =========================================================================
  describe('/auth/login (POST)', () => {
    
    it('1. [Success] should log in an existing user and return JWTs', async () => {
      // 1. Seed a user into the DB first
      await request(app.getHttpServer())
        .post('/auth/register/learner')
        .send({
          email: 'login@gupjob.com',
          password: 'MySecretPassword!',
          name: 'Login User',
          role: 'STUDENT',
        });

      // 2. Attempt to log in with those credentials
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'login@gupjob.com',
          password: 'MySecretPassword!',
        });

      expect(response.status).toBe(200); // or 201 depending on your controller
      expect(response.body).toHaveProperty('access_token');
      expect(response.body).toHaveProperty('refresh_token');
    });

    it('2. [Auth Test] should return 401 Unauthorized for wrong password', async () => {
      // 1. Seed the user
      await request(app.getHttpServer())
        .post('/auth/register/learner')
        .send({
          email: 'wrongpass@gupjob.com',
          password: 'RealPassword!',
          name: 'User',
          role: 'STUDENT',
        });

      // 2. Send the wrong password
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'wrongpass@gupjob.com',
          password: 'FakePassword!', // WRONG
        });

      expect(response.status).toBe(401); // Unauthorized
    });
  });
});