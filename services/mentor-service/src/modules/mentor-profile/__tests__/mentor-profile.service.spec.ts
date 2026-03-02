import { MentorProfileService } from '../services/mentor-profile.service';
import { MentorProfileRepository } from '../repositories/mentor-profile.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('MentorProfileService', () => {
  let service: MentorProfileService;
  let mockRepo: jest.Mocked<MentorProfileRepository>;

  beforeEach(() => {
    mockRepo = {
      findByUserId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      upsert: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
    } as any;

    service = new MentorProfileService(mockRepo);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getProfile', () => {
    it('should return profile when exists', async () => {
      const profile = { userId: 5, bio: null, cvUrl: 'https://cv', skills: ['Node'] };
      mockRepo.findByUserId.mockResolvedValue(profile as any);

      const result = await service.getProfile(5);
      expect(result).toMatchObject({ userId: 5, cvUrl: 'https://cv' });
    });

    it('should throw NotFoundException when profile not found', async () => {
      mockRepo.findByUserId.mockResolvedValue(null);
      await expect(service.getProfile(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createProfile', () => {
    it('should create profile when user is new', async () => {
      mockRepo.findByUserId.mockResolvedValue(null);
      mockRepo.create.mockResolvedValue({ userId: 10, bio: null, skills: ['React'] } as any);

      const dto = { cvUrl: 'https://cv', skills: ['React'] };
      const result = await service.createProfile(10, dto);
      expect(result.userId).toBe(10);
      expect(mockRepo.create).toHaveBeenCalledWith(10, dto);
    });

    it('should throw BadRequestException if profile already exists', async () => {
      mockRepo.findByUserId.mockResolvedValue({ userId: 10 } as any);
      await expect(service.createProfile(10, {})).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateProfile', () => {
    it('should update profile with partial data', async () => {
      const existing = { userId: 7, cvUrl: 'old', skills: [] };
      const updated = { userId: 7, cvUrl: 'new', skills: [] };
      mockRepo.findByUserId.mockResolvedValue(existing as any);
      mockRepo.update.mockResolvedValue(updated as any);

      const result = await service.updateProfile(7, { cvUrl: 'new' });
      expect(result.cvUrl).toBe('new');
    });
  });

  describe('upsertProfile', () => {
    it('should upsert profile (create or update)', async () => {
      const dto = { cvUrl: 'https://cv' };
      mockRepo.upsert.mockResolvedValue({ userId: 15, cvUrl: 'https://cv' } as any);

      const result = await service.upsertProfile(15, dto);
      expect(result.userId).toBe(15);
      expect(mockRepo.upsert).toHaveBeenCalledWith(15, dto);
    });
  });
});