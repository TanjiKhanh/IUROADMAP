/// <reference types="jest" />

// stub redis store to avoid real connection
jest.mock('cache-manager-redis-yet', () => ({
  redisStore: jest.fn().mockResolvedValue({
    // minimal fake store api used by cache-manager
    get: async () => null,
    set: async () => undefined,
  }),
}));

// bypass auth guard so we don't need real JWTs
jest.mock('../common/guards/auth.guard', () => {
  const { Injectable } = require('@nestjs/common');
  @Injectable()
  class MockGuard {
    canActivate(context: any) {
      const req = context.switchToHttp().getRequest();
      req.user = { id: 123 };
      return true;
    }
  }
  return { AuthGuard: MockGuard };
});

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { RoadmapsService } from '../roadmaps/roadmaps.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

// minimal stub service that records calls
const roadmapsMock = {
  enroll: jest.fn(async (uid, slug) => ({ uid, slug })),
  getUserRoadmaps: jest.fn(async (uid) => [{ id: 1, userId: uid }]),
  getRoadMapNodeMinimal: jest.fn(async (uid, id) => ({ id, userId: uid })),
  getRoadmapNodeDetail: jest.fn(async (uid, rid, key) => ({ roadmapId: rid, nodeKey: key })),
  updateNodeStatus: jest.fn(async (uid, rid, key, status) => ({ uid, rid, key, status })),
};

describe('UserService e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // simple fake cache manager to prevent redis connection attempts
    const fakeCache = { get: jest.fn(), set: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RoadmapsService)
      .useValue(roadmapsMock)
      .overrideProvider('CACHE_MANAGER')
      .useValue(fakeCache)
      .overrideProvider(PrismaService)
      .useValue({ onModuleInit: jest.fn(), onModuleDestroy: jest.fn() })
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('POST /roadmaps/enroll', async () => {
    const payload = { slug: 'foo' };
    const res = await request(app.getHttpServer()).post('/roadmaps/enroll').send(payload).expect(201);
    expect(roadmapsMock.enroll).toHaveBeenCalledWith(123, 'foo');
    expect(res.body).toEqual({ uid: 123, slug: 'foo' });
  });

  it('GET /roadmaps/my', async () => {
    const res = await request(app.getHttpServer()).get('/roadmaps/my').expect(200);
    expect(roadmapsMock.getUserRoadmaps).toHaveBeenCalledWith(123);
    expect(res.body).toEqual([{ id: 1, userId: 123 }]);
  });

  it('GET /roadmaps/:id', async () => {
    const res = await request(app.getHttpServer()).get('/roadmaps/5').expect(200);
    expect(roadmapsMock.getRoadMapNodeMinimal).toHaveBeenCalledWith(123, 5);
  });

  it('GET /roadmaps/:id/nodes/:nodeKey', async () => {
    const res = await request(app.getHttpServer()).get('/roadmaps/5/nodes/k').expect(200);
    expect(roadmapsMock.getRoadmapNodeDetail).toHaveBeenCalledWith(123, 5, 'k');
  });

  it('PATCH /roadmaps/:id/nodes/:nodeKey/status', async () => {
    const payload = { status: 'COMPLETED' };
    const res = await request(app.getHttpServer()).patch('/roadmaps/5/nodes/k/status').send(payload).expect(200);
    expect(roadmapsMock.updateNodeStatus).toHaveBeenCalledWith(123, 5, 'k', 'COMPLETED');
  });
});
