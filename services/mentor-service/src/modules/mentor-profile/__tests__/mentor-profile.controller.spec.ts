import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { MentorProfileController } from '../controllers/mentor-profile.controller';
import { MentorProfileService } from '../services/mentor-profile.service';

describe('MentorProfileController (Unit Tests)', () => {
  let controller: MentorProfileController;
  let mockService: jest.Mocked<MentorProfileService>;

  beforeEach(() => {
    mockService = {
      getProfile: jest.fn(),
      createProfile: jest.fn(),
      updateProfile: jest.fn(),
      deleteProfile: jest.fn(),
      upsertProfile: jest.fn(),
      listProfiles: jest.fn(),
    } as any;

    controller = new MentorProfileController(mockService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // ============================================================================
  // LIST PROFILES TESTS (Admin)
  // ============================================================================
  describe('listProfiles (GET /mentor-profiles)', () => {
    it('should list profiles with default pagination', async () => {
      const profiles = [
        {
          userId: 1,
          cvUrl: 'https://cv1.com',
          skills: ['Node.js', 'TypeScript'],
          bio: null,
          linkedinUrl: null,
          industry: 'TECHNOLOGY',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          cvUrl: 'https://cv2.com',
          skills: ['Python'],
          bio: null,
          linkedinUrl: null,
          industry: 'DATA_SCIENCE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      mockService.listProfiles.mockResolvedValue(profiles as any);

      const result = await controller.listProfiles();

      expect(result).toEqual(profiles);
      expect(mockService.listProfiles).toHaveBeenCalledWith(0, 10);
    });

    it('should list profiles with custom skip and take', async () => {
      const profiles: unknown = [];
      mockService.listProfiles.mockResolvedValue(profiles as any);

      const result = await controller.listProfiles('20', '5');

      expect(result).toEqual(profiles);
      expect(mockService.listProfiles).toHaveBeenCalledWith(20, 5);
    });

    it('should handle string parameters correctly', async () => {
      mockService.listProfiles.mockResolvedValue([]);

      await controller.listProfiles('100', '25');

      expect(mockService.listProfiles).toHaveBeenCalledWith(100, 25);
    });
  });

  // ============================================================================
  // GET MY PROFILE TESTS (Mentor)
  // ============================================================================
  describe('getMyProfile (GET /mentor-profiles/me)', () => {
    it('should return current user profile', async () => {
      const user = { userId: 42 };
      const profile = {
        userId: 42,
        cvUrl: 'https://example.com/cv.pdf',
        linkedinUrl: 'https://linkedin.com/in/user',
        skills: ['NestJS', 'React', 'PostgreSQL'],
        bio: { text: 'Experienced mentor in full-stack development' },
        industry: 'TECHNOLOGY',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockService.getProfile.mockResolvedValue(profile as any);

      const result = await controller.getMyProfile(user);

      expect(result).toEqual(profile);
      expect(mockService.getProfile).toHaveBeenCalledWith(42);
    });

    it('should pass correct userId from current user', async () => {
      const user = { userId: 999 };
      const profile = {
        userId: 999,
        cvUrl: null,
        skills: [],
        bio: null,
        linkedinUrl: null,
        industry: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockService.getProfile.mockResolvedValue(profile as any);

      await controller.getMyProfile(user);

      expect(mockService.getProfile).toHaveBeenCalledWith(999);
    });

    it('should handle profile not found error', async () => {
      const user = { userId: 100 };
      mockService.getProfile.mockRejectedValue(new Error('Not found'));

      await expect(controller.getMyProfile(user)).rejects.toThrow('Not found');
    });
  });

  // ============================================================================
  // UPDATE PROFILE TESTS (Mentor)
  // ============================================================================
  describe('updateProfile (PUT /mentor-profiles/me)', () => {
    it('should update user profile with all fields', async () => {
      const user = { userId: 50 };
      const dto = {
        bio: 'Updated bio',
        cvUrl: 'https://new-cv.com/resume.pdf',
        linkedinUrl: 'https://linkedin.com/in/newuser',
        industry: 'FINTECH',
        skills: ['Rust', 'Go', 'Kubernetes'],
      };
      const updatedProfile = { userId: 50, ...dto, createdAt: new Date(), updatedAt: new Date() };
      mockService.updateProfile.mockResolvedValue(updatedProfile as any);

      const result = await controller.updateProfile(dto, user);

      expect(result).toMatchObject(updatedProfile);
      expect(mockService.updateProfile).toHaveBeenCalledWith(50, dto);
    });

    it('should update profile with partial data', async () => {
      const user = { userId: 60 };
      const dto = { cvUrl: 'https://updated-cv.com/cv.pdf' };
      const updatedProfile = {
        userId: 60,
        cvUrl: 'https://updated-cv.com/cv.pdf',
        skills: [],
        bio: null,
        linkedinUrl: null,
        industry: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockService.updateProfile.mockResolvedValue(updatedProfile as any);

      const result = await controller.updateProfile(dto, user);

      expect(result.cvUrl).toBe('https://updated-cv.com/cv.pdf');
      expect(mockService.updateProfile).toHaveBeenCalledWith(60, dto);
    });

    it('should update only skills field', async () => {
      const user = { userId: 70 };
      const dto = { skills: ['Java', 'Spring Boot', 'Docker'] };
      const updatedProfile = {
        userId: 70,
        ...dto,
        bio: null,
        cvUrl: null,
        linkedinUrl: null,
        industry: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockService.updateProfile.mockResolvedValue(updatedProfile as any);

      const result = await controller.updateProfile(dto, user);

      expect(result.skills).toEqual(['Java', 'Spring Boot', 'Docker']);
      expect(mockService.updateProfile).toHaveBeenCalledWith(70, dto);
    });

    it('should handle profile not found error', async () => {
      const user = { userId: 404 };
      const dto = {};
      mockService.updateProfile.mockRejectedValue(new Error('Profile not found'));

      await expect(controller.updateProfile(dto, user)).rejects.toThrow(
        'Profile not found'
      );
    });
  });

  // ============================================================================
  // DELETE PROFILE TESTS (Admin)
  // ============================================================================
  describe('deleteProfile (DELETE /mentor-profiles/:id)', () => {
    it('should delete profile by user id', async () => {
      mockService.deleteProfile.mockResolvedValue(undefined);

      await controller.deleteProfile('123');

      expect(mockService.deleteProfile).toHaveBeenCalledWith(123);
    });

    it('should convert string id to number', async () => {
      mockService.deleteProfile.mockResolvedValue(undefined);

      await controller.deleteProfile('999');

      expect(mockService.deleteProfile).toHaveBeenCalledWith(999);
    });

    it('should handle profile not found error', async () => {
      mockService.deleteProfile.mockRejectedValue(new Error('Profile not found'));

      await expect(controller.deleteProfile('100')).rejects.toThrow(
        'Profile not found'
      );
    });

    it('should handle multiple deletes', async () => {
      mockService.deleteProfile.mockResolvedValue(undefined);

      await controller.deleteProfile('1');
      await controller.deleteProfile('2');
      await controller.deleteProfile('3');

      expect(mockService.deleteProfile).toHaveBeenCalledTimes(3);
      expect(mockService.deleteProfile).toHaveBeenNthCalledWith(1, 1);
      expect(mockService.deleteProfile).toHaveBeenNthCalledWith(2, 2);
      expect(mockService.deleteProfile).toHaveBeenNthCalledWith(3, 3);
    });
  });
});