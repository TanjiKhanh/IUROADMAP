import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { MentorProfileService } from '../services/mentor-profile.service';
import { MentorProfileRepository } from '../repositories/mentor-profile.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('MentorProfileService (Unit Tests)', () => {
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

  // ============================================================================
  // GET PROFILE TESTS
  // ============================================================================
  describe('getProfile', () => {
    it('should return profile when profile exists', async () => {
      const profile = {
        userId: 5,
        bio: { text: 'Experienced mentor' },
        cvUrl: 'https://example.com/cv.pdf',
        linkedinUrl: 'https://linkedin.com/in/user',
        industry: 'TECHNOLOGY',
        skills: ['Node.js', 'TypeScript', 'React'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.findByUserId.mockResolvedValue(profile as any);

      const result = await service.getProfile(5);
      
      expect(result).toMatchObject({
        userId: 5,
        cvUrl: 'https://example.com/cv.pdf',
        linkedinUrl: 'https://linkedin.com/in/user',
        skills: ['Node.js', 'TypeScript', 'React'],
      });
      expect(mockRepo.findByUserId).toHaveBeenCalledWith(5);
    });

    it('should return profile with minimal data', async () => {
      const profile = {
        userId: 10,
        bio: null,
        cvUrl: null,
        linkedinUrl: null,
        industry: null,
        skills: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.findByUserId.mockResolvedValue(profile as any);

      const result = await service.getProfile(10);
      
      expect(result.userId).toBe(10);
      expect(result.skills).toEqual([]);
    });

    it('should throw NotFoundException when profile does not exist', async () => {
      mockRepo.findByUserId.mockResolvedValue(null);

      await expect(service.getProfile(999)).rejects.toThrow(NotFoundException);
      expect(mockRepo.findByUserId).toHaveBeenCalledWith(999);
    });

    it('should throw NotFoundException with correct error message', async () => {
      mockRepo.findByUserId.mockResolvedValue(null);

      await expect(service.getProfile(777)).rejects.toThrow(
        'Mentor profile for user 777 not found'
      );
    });
  });

  // ============================================================================
  // CREATE PROFILE TESTS
  // ============================================================================
  describe('createProfile', () => {
    it('should create profile when user has no existing profile', async () => {
      mockRepo.findByUserId.mockResolvedValue(null);
      const createdProfile = {
        userId: 10,
        bio: null,
        cvUrl: 'https://example.com/cv.pdf',
        linkedinUrl: 'https://linkedin.com/in/user',
        industry: 'ENGINEERING',
        skills: ['React', 'Node.js'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.create.mockResolvedValue(createdProfile as any);

      const dto = {
        cvUrl: 'https://example.com/cv.pdf',
        linkedinUrl: 'https://linkedin.com/in/user',
        industry: 'ENGINEERING',
        skills: ['React', 'Node.js'],
      };
      const result = await service.createProfile(10, dto);

      expect(result.userId).toBe(10);
      expect(result.skills).toEqual(['React', 'Node.js']);
      expect(mockRepo.create).toHaveBeenCalledWith(10, dto);
    });

    it('should create profile with minimal data', async () => {
      mockRepo.findByUserId.mockResolvedValue(null);
      const createdProfile = {
        userId: 20,
        bio: null,
        cvUrl: null,
        linkedinUrl: null,
        industry: null,
        skills: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.create.mockResolvedValue(createdProfile as any);

      const dto = {};
      const result = await service.createProfile(20, dto);

      expect(result.userId).toBe(20);
      expect(mockRepo.create).toHaveBeenCalledWith(20, dto);
    });

    it('should throw BadRequestException if profile already exists', async () => {
      mockRepo.findByUserId.mockResolvedValue({ userId: 10 } as any);

      const dto = { cvUrl: 'https://example.com/cv.pdf' };
      await expect(service.createProfile(10, dto)).rejects.toThrow(
        BadRequestException
      );
      expect(mockRepo.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException with correct error message', async () => {
      mockRepo.findByUserId.mockResolvedValue({ userId: 10 } as any);

      await expect(service.createProfile(10, {})).rejects.toThrow(
        'Mentor profile already exists for this user'
      );
    });
  });

  // ============================================================================
  // UPDATE PROFILE TESTS
  // ============================================================================
  describe('updateProfile', () => {
    it('should update profile with partial data', async () => {
      const existing = {
        userId: 7,
        cvUrl: 'https://old.com/cv.pdf',
        linkedinUrl: 'https://linkedin.com/old',
        skills: ['Ruby'],
        bio: null,
        industry: 'FINANCE',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updated = {
        ...existing,
        cvUrl: 'https://new.com/cv.pdf',
        skills: ['Ruby', 'Python'],
        updatedAt: new Date(),
      };
      mockRepo.findByUserId.mockResolvedValue(existing as any);
      mockRepo.update.mockResolvedValue(updated as any);

      const dto = { cvUrl: 'https://new.com/cv.pdf', skills: ['Ruby', 'Python'] };
      const result = await service.updateProfile(7, dto);

      expect(result.cvUrl).toBe('https://new.com/cv.pdf');
      expect(result.skills).toContain('Python');
      expect(mockRepo.update).toHaveBeenCalledWith(7, dto);
    });

    it('should update only one field', async () => {
      const existing = {
        userId: 8,
        bio: 'Old bio',
        cvUrl: 'https://example.com/cv.pdf',
        linkedinUrl: null,
        industry: null,
        skills: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updated = { ...existing, bio: 'New bio', updatedAt: new Date() };
      mockRepo.findByUserId.mockResolvedValue(existing as any);
      mockRepo.update.mockResolvedValue(updated as any);

      const dto = { bio: 'New bio' };
      const result = await service.updateProfile(8, dto);

      expect(result.bio).toBe('New bio');
      expect(mockRepo.update).toHaveBeenCalledWith(8, dto);
    });

    it('should throw NotFoundException when profile does not exist', async () => {
      mockRepo.findByUserId.mockResolvedValue(null);

      const dto = { cvUrl: 'https://example.com/cv.pdf' };
      await expect(service.updateProfile(999, dto)).rejects.toThrow(
        NotFoundException
      );
      expect(mockRepo.update).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException with correct error message', async () => {
      mockRepo.findByUserId.mockResolvedValue(null);

      const dto = {};
      await expect(service.updateProfile(555, dto)).rejects.toThrow(
        'Mentor profile for user 555 not found'
      );
    });
  });

  // ============================================================================
  // UPSERT PROFILE TESTS
  // ============================================================================
  describe('upsertProfile', () => {
    it('should upsert profile (creates or updates)', async () => {
      const dto = {
        cvUrl: 'https://example.com/cv.pdf',
        industry: 'TECHNOLOGY',
        skills: ['JavaScript', 'Python'],
      };
      const upsertedProfile = {
        userId: 15,
        bio: null,
        ...dto,
        linkedinUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.upsert.mockResolvedValue(upsertedProfile as any);

      const result = await service.upsertProfile(15, dto);

      expect(result.userId).toBe(15);
      expect(result.industry).toBe('TECHNOLOGY');
      expect(mockRepo.upsert).toHaveBeenCalledWith(15, dto);
    });

    it('should upsert with empty data', async () => {
      const dto = {};
      const upsertedProfile = {
        userId: 20,
        bio: null,
        cvUrl: null,
        linkedinUrl: null,
        industry: null,
        skills: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepo.upsert.mockResolvedValue(upsertedProfile as any);

      const result = await service.upsertProfile(20, dto);

      expect(result.userId).toBe(20);
      expect(mockRepo.upsert).toHaveBeenCalledWith(20, dto);
    });
  });

  // ============================================================================
  // DELETE PROFILE TESTS
  // ============================================================================
  describe('deleteProfile', () => {
    it('should delete existing profile', async () => {
      mockRepo.findByUserId.mockResolvedValue({ userId: 25 } as any);

      await service.deleteProfile(25);

      expect(mockRepo.delete).toHaveBeenCalledWith(25);
    });

    it('should throw NotFoundException when profile does not exist', async () => {
      mockRepo.findByUserId.mockResolvedValue(null);

      await expect(service.deleteProfile(999)).rejects.toThrow(
        NotFoundException
      );
      expect(mockRepo.delete).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException with correct error message', async () => {
      mockRepo.findByUserId.mockResolvedValue(null);

      await expect(service.deleteProfile(666)).rejects.toThrow(
        'Mentor profile for user 666 not found'
      );
    });
  });

  // ============================================================================
  // LIST PROFILES TESTS
  // ============================================================================
  describe('listProfiles', () => {
    it('should list profiles with default pagination', async () => {
      const profiles = [
        { userId: 1, skills: ['Node.js'], cvUrl: 'https://cv1.com', bio: null, linkedinUrl: null, industry: null, createdAt: new Date(), updatedAt: new Date() },
        { userId: 2, skills: ['Python'], cvUrl: 'https://cv2.com', bio: null, linkedinUrl: null, industry: null, createdAt: new Date(), updatedAt: new Date() },
      ];
      mockRepo.findMany.mockResolvedValue(profiles as any);

      const result = await service.listProfiles();

      expect(result).toHaveLength(2);
      expect(result[0].userId).toBe(1);
      expect(mockRepo.findMany).toHaveBeenCalledWith(0, 10);
    });

    it('should list profiles with custom pagination', async () => {
      const profiles = [
        { userId: 5, skills: [], cvUrl: null, bio: null, linkedinUrl: null, industry: null, createdAt: new Date(), updatedAt: new Date() },
      ];
      mockRepo.findMany.mockResolvedValue(profiles as any);

      const result = await service.listProfiles(20, 5);

      expect(result).toHaveLength(1);
      expect(mockRepo.findMany).toHaveBeenCalledWith(20, 5);
    });

    it('should return empty list if no profiles found', async () => {
      mockRepo.findMany.mockResolvedValue([]);

      const result = await service.listProfiles();

      expect(result).toEqual([]);
    });
  });
});