import { ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { RoadmapNodeStatus } from '@prisma/client';
import { RoadmapsService } from '../roadmaps.service';

// helpers to build mocks for every test
function makeMocks() {
  const prisma: any = {
    userRoadmap: {
      findFirst: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
    userRoadmapNode: {
      findMany: jest.fn(),
      count: jest.fn(),
      upsert: jest.fn(),
    },
  };

  const adminClient: any = {
    getRoadmapSummary: jest.fn(),
    getRoadmapDetails: jest.fn(),
  };

  const authClient: any = {
    getUserProfile: jest.fn(),
  };

  const cacheManager: any = {
    get: jest.fn(),
    set: jest.fn(),
  };

  return { prisma, adminClient, authClient, cacheManager };
}

describe('RoadmapsService (unit)', () => {
  let svc: RoadmapsService;
  let prisma: any;
  let adminClient: any;
  let authClient: any;
  let cacheManager: any;

  beforeEach(() => {
    ({ prisma, adminClient, authClient, cacheManager } = makeMocks());
    svc = new RoadmapsService(prisma, adminClient, authClient, cacheManager);
  });

  afterEach(() => jest.resetAllMocks());

  describe('enroll()', () => {
    it('throws ConflictException when user already enrolled', async () => {
      prisma.userRoadmap.findFirst.mockResolvedValue({ id: 1 });
      await expect(svc.enroll(1, 'slug')).rejects.toThrow(ConflictException);
      expect(prisma.userRoadmap.findFirst).toHaveBeenCalledWith({ where: { userId: 1, slug: 'slug' } });
    });

    it('fetches profile, hits admin and caches result when not enrolled', async () => {
      prisma.userRoadmap.findFirst.mockResolvedValue(null);
      authClient.getUserProfile.mockResolvedValue({ id: 1 });
      cacheManager.get.mockResolvedValue(null);
      const map = { id: 99, title: 'T', slug: 'slug', totalNodes: 5 };
      adminClient.getRoadmapSummary.mockResolvedValue(map);
      prisma.userRoadmap.create.mockResolvedValue({ created: true });

      const result = await svc.enroll(1, 'slug');

      expect(authClient.getUserProfile).toHaveBeenCalledWith(1);
      expect(cacheManager.get).toHaveBeenCalledWith('roadmap:summary:slug');
      expect(adminClient.getRoadmapSummary).toHaveBeenCalledWith('slug');
      expect(cacheManager.set).toHaveBeenCalledWith('roadmap:summary:slug', map, 3600000);
      expect(prisma.userRoadmap.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          userId: 1,
          masterRoadmapId: 99,
          slug: 'slug',
        }),
      }));
      expect(result).toEqual({ created: true });
    });
  });

  describe('getUserRoadmaps()', () => {
    it('delegates to prisma.findMany', async () => {
      const arr = [{ id: 1 }];
      prisma.userRoadmap.findMany.mockResolvedValue(arr);
      const out = await svc.getUserRoadmaps(11);
      expect(prisma.userRoadmap.findMany).toHaveBeenCalledWith({ where: { userId: 11 }, orderBy: { createdAt: 'desc' } });
      expect(out).toBe(arr);
    });
  });

  describe('getRoadMapNodeMinimal()', () => {
    const userId = 5;
    const roadmapId = 7;
    const record = { id: roadmapId, userId, slug: 'slug', progressPercent: 0, totalNodes: 2 };

    it('throws NotFoundException when enrollment missing', async () => {
      prisma.userRoadmap.findUnique.mockResolvedValue(null);
      await expect(svc.getRoadMapNodeMinimal(userId, roadmapId)).rejects.toThrow(NotFoundException);
    });

    it('throws ForbiddenException when wrong user', async () => {
      prisma.userRoadmap.findUnique.mockResolvedValue({ userId: 99 });
      await expect(svc.getRoadMapNodeMinimal(userId, roadmapId)).rejects.toThrow(ForbiddenException);
    });

    it('returns merged light map on cache hit', async () => {
      prisma.userRoadmap.findUnique.mockResolvedValue(record);
      const master = { title: 'X', nodes: [
        { nodeKey: 'a', title: 'A', summary: 's', coords: { x: 0, y: 0 }, isRequired: true },
      ], edges: [] };
      cacheManager.get.mockResolvedValue(master);
      prisma.userRoadmapNode.findMany.mockResolvedValue([{ nodeKey: 'a', status: RoadmapNodeStatus.COMPLETED }]);

      const res = await svc.getRoadMapNodeMinimal(userId, roadmapId);
      expect(res.nodes[0].status).toBe(RoadmapNodeStatus.COMPLETED);
      expect(res.title).toBe('X');
    });
  });

  describe('getRoadmapNodeDetail()', () => {
    const userId = 3;
    const roadmapId = 4;
    const slug = 'slug';
    const userRoadmap = { id: roadmapId, userId, slug };

    it('throws ForbiddenException when enrollment missing or mismatched', async () => {
      prisma.userRoadmap.findUnique.mockResolvedValue(null);
      await expect(svc.getRoadmapNodeDetail(userId, roadmapId, 'k')).rejects.toThrow(ForbiddenException);
      prisma.userRoadmap.findUnique.mockResolvedValue({ id: roadmapId, userId: 99, slug });
      await expect(svc.getRoadmapNodeDetail(userId, roadmapId, 'k')).rejects.toThrow(ForbiddenException);
    });

    it('throws NotFoundException when requested node not in master map', async () => {
      prisma.userRoadmap.findUnique.mockResolvedValue(userRoadmap);
      cacheManager.get.mockResolvedValue({ nodes: [{ nodeKey: 'other' }] });
      await expect(svc.getRoadmapNodeDetail(userId, roadmapId, 'k')).rejects.toThrow(NotFoundException);
    });

    it('returns node content using cache', async () => {
      prisma.userRoadmap.findUnique.mockResolvedValue(userRoadmap);
      const master = { nodes: [{ nodeKey: 'k', title: 'T', summary: 'S', contentMd: 'MD' }] };
      cacheManager.get.mockResolvedValue(master);

      const out = await svc.getRoadmapNodeDetail(userId, roadmapId, 'k');
      expect(out).toEqual({ nodeKey: 'k', title: 'T', summary: 'S', contentMd: 'MD' });
    });

    it('falls back to admin client when cache miss', async () => {
      prisma.userRoadmap.findUnique.mockResolvedValue(userRoadmap);
      cacheManager.get.mockResolvedValue(null);
      const master = { nodes: [{ nodeKey: 'k', title: 'T', summary: 'S', contentMd: 'MD' }] };
      adminClient.getRoadmapDetails.mockResolvedValue(master);
      cacheManager.set.mockResolvedValue(undefined);

      const out = await svc.getRoadmapNodeDetail(userId, roadmapId, 'k');
      expect(adminClient.getRoadmapDetails).toHaveBeenCalledWith(slug);
      expect(cacheManager.set).toHaveBeenCalledWith(`roadmap:nodes:${slug}`, master, 3600000);
      expect(out.title).toBe('T');
    });
  });

  describe('updateNodeStatus()', () => {
    const userId = 10;
    const roadmapId = 20;
    const nodeKey = 'node';

    it('throws when enrollment invalid', async () => {
      prisma.userRoadmap.findUnique.mockResolvedValue(null);
      await expect(svc.updateNodeStatus(userId, roadmapId, nodeKey, RoadmapNodeStatus.AVAILABLE)).rejects.toThrow(NotFoundException);
      prisma.userRoadmap.findUnique.mockResolvedValue({ id: roadmapId, userId: 999, totalNodes: 1 });
      await expect(svc.updateNodeStatus(userId, roadmapId, nodeKey, RoadmapNodeStatus.AVAILABLE)).rejects.toThrow(ForbiddenException);
    });

    it('writes status and recalculates progress', async () => {
      prisma.userRoadmap.findUnique.mockResolvedValue({ id: roadmapId, userId, totalNodes: 4 });
      prisma.userRoadmapNode.upsert.mockResolvedValue({});
      prisma.userRoadmapNode.count.mockResolvedValue(2);
      prisma.userRoadmap.update.mockResolvedValue({ progressPercent: 50 });

      const ret = await svc.updateNodeStatus(userId, roadmapId, nodeKey, RoadmapNodeStatus.COMPLETED);
      expect(ret.newRoadmapProgress).toBe(50);
      expect(prisma.userRoadmap.update).toHaveBeenCalledWith(expect.objectContaining({
        where: { id: roadmapId },
        data: expect.objectContaining({ completedNodes: 2, progressPercent: 50 }),
      }));
    });
  });
});
