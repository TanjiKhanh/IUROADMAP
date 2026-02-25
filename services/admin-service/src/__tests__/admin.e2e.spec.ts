import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module'; // adjust if path differs
import { PrismaService } from '../prisma/prisma.service'; // adjust if your PrismaService path differs
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

/**
 * Admin service e2e-style tests (unit-testing controllers + service wiring)
 *
 * This testing file:
 * - boots a TestingModule with AppModule
 * - overrides PrismaService with a jest mock object
 * - disables global guards by injecting a permissive guard (or using app.useGlobalGuards)
 * - runs HTTP requests against the in-memory Nest server (supertest)
 *
 * Adapt the mock return values to match your actual DTOs and controller expectations.
 */

describe('Admin Service (controllers) - e2e (mocked Prisma)', () => {
  let app: INestApplication;

  // create an in-memory mock for PrismaService used by modules/controllers
  const mockPrisma = {
    // Departments
    department: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    // Courses
    course: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn?.(), // if delete exists
    },
    // Roadmaps (master data)
    roadmap: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
    },
    // any other model methods used by controllers
    $transaction: jest.fn(async (fn: any) => {
      // if passed a function, call it with the mock itself
      if (typeof fn === 'function') return fn(mockPrisma);
      return Promise.resolve();
    }),
  } as any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // override PrismaService provider used by PrismaModule
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      // override auth and roles guards to always allow
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();

    // enable validation pipe same as production to exercise DTO validation
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //
  // Departments
  //
  describe('Departments Controller', () => {
    it('POST /admin/departments -> creates a department', async () => {
      const payload = { name: 'Computer Science', slug: 'computer-science', code: 'CS' };
      // mock Prisma return value for department.create
      mockPrisma.department.create.mockResolvedValue({ id: 1, ...payload, createdAt: new Date() });

      const res = await request(app.getHttpServer()).post('/admin/departments').send(payload).expect(201);
      expect(res.body).toMatchObject({ id: 1, name: 'Computer Science', code: 'CS' });
      expect(mockPrisma.department.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ name: 'Computer Science', slug: 'computer-science' }) }));
    });

    it('GET /admin/departments -> returns list', async () => {
      const rows = [{ id: 1, name: 'CS' }, { id: 2, name: 'Math' }];
      mockPrisma.department.findMany.mockResolvedValue(rows);

      const res = await request(app.getHttpServer()).get('/admin/departments').expect(200);
      expect(res.body).toEqual(rows);
      expect(mockPrisma.department.findMany).toHaveBeenCalled();
    });

    it('GET /admin/departments/:id -> returns department', async () => {
      const row = { id: 7, name: 'Physics' };
      mockPrisma.department.findUnique.mockResolvedValue(row);

      const res = await request(app.getHttpServer()).get('/admin/departments/7').expect(200);
      expect(res.body).toEqual(row);
      expect(mockPrisma.department.findUnique).toHaveBeenCalledWith(expect.objectContaining({ where: { slug: '7' } }));
    });

    it('PUT /admin/departments/:id -> updates department', async () => {
      const update = { name: 'CS & Engineering' };
      // service verifies existence via findOneById
      mockPrisma.department.findUnique.mockResolvedValue({ id: 1, name: 'CS' });
      mockPrisma.department.update.mockResolvedValue({ id: 1, ...update });

      const res = await request(app.getHttpServer()).patch('/admin/departments/1').send(update).expect(200);
      expect(res.body).toMatchObject({ id: 1, name: 'CS & Engineering' });
      expect(mockPrisma.department.update).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 1 }, data: update }));
    });

    it('DELETE /admin/departments/:id -> deletes department', async () => {
      mockPrisma.department.delete.mockResolvedValue({ id: 5, name: 'Obsolete' });

      const res = await request(app.getHttpServer()).delete('/admin/departments/5').expect(200);
      expect(res.body).toMatchObject({ id: 5 });
      expect(mockPrisma.department.delete).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 5 } }));
    });
  });

  //
  // Courses
  //
  describe('Courses Controller', () => {
    it('POST /admin/courses -> creates a course', async () => {
      const payload = { title: 'Intro to JS', type: 'JOB', departmentId: 1 };
      mockPrisma.course.create.mockResolvedValue({ id: 11, ...payload });

      const res = await request(app.getHttpServer()).post('/admin/courses').send(payload).expect(201);
      expect(res.body).toMatchObject({ id: 11, title: 'Intro to JS' });
      // we only assert that a create call happened; service transforms payload internally
      expect(mockPrisma.course.create).toHaveBeenCalled();
    });

    it('GET /admin/courses -> returns list', async () => {
      const rows = [{ id: 11, title: 'JS' }];
      mockPrisma.course.findMany.mockResolvedValue(rows);

      const res = await request(app.getHttpServer()).get('/admin/courses').expect(200);
      expect(res.body).toEqual(rows);
      expect(mockPrisma.course.findMany).toHaveBeenCalled();
    });

    it('GET /admin/courses/:id -> returns course', async () => {
      const row = { id: 11, title: 'Intro to JS' };
      mockPrisma.course.findUnique.mockResolvedValue(row);

      const res = await request(app.getHttpServer()).get('/admin/courses/11').expect(200);
      expect(res.body).toEqual(row);
      expect(mockPrisma.course.findUnique).toHaveBeenCalledWith(expect.objectContaining({ where: { slug: '11' } }));
    });
  });

  //
  // Roadmaps
  //
  describe('Roadmap Controller', () => {
    it('POST /admin/roadmaps -> creates a roadmap', async () => {
      const payload = { title: 'Backend Roadmap', slug: 'backend-2026', nodes: [] };
      mockPrisma.roadmap.create.mockResolvedValue({ id: 100, ...payload });

      const res = await request(app.getHttpServer()).post('/admin/roadmaps').send(payload).expect(201);
      expect(res.body).toMatchObject({ id: 100, slug: 'backend-2026' });
      // service massages the payload before calling Prisma, so just assert any create call occurred
      expect(mockPrisma.roadmap.create).toHaveBeenCalled();
    });

    it('GET /admin/roadmaps/:slug -> returns roadmap', async () => {
      const roadmap = { id: 100, slug: 'backend-2026', title: 'Backend' };
      // repo.findBySlugWithNodesAndEdges uses prisma.roadmap.findUnique
      mockPrisma.roadmap.findUnique.mockResolvedValue({ ...roadmap, nodes: [], edges: [] });

      const res = await request(app.getHttpServer()).get('/admin/roadmaps/backend-2026').expect(200);
      expect(res.body).toEqual({ ...roadmap, nodes: [], edges: [] });
      expect(mockPrisma.roadmap.findUnique).toHaveBeenCalledWith(expect.objectContaining({ where: { slug: 'backend-2026' } }));
    });
  });

  //
  // Public endpoints
  //
  describe('Public Controller', () => {
    it('GET /public/departments/:slug -> returns department', async () => {
      const dept = { id: 9, name: 'History' };
      mockPrisma.department.findUnique.mockResolvedValue(dept);

      const res = await request(app.getHttpServer()).get('/public/departments/history').expect(200);
      expect(res.body).toEqual(dept);
      expect(mockPrisma.department.findUnique).toHaveBeenCalledWith(expect.objectContaining({ where: { slug: 'history' } }));
    });
  });
});