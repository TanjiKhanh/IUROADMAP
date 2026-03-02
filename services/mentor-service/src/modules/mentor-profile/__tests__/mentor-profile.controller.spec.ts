import { MentorProfileController } from '../controllers/mentor-profile.controller';
import { MentorProfileService } from '../services/mentor-profile.service';

describe('MentorProfileController', () => {
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

  it('GET /mentor-profiles/:id should return profile', async () => {
    const profile = { userId: 5, cvUrl: 'https://cv' };
    mockService.getProfile.mockResolvedValue(profile as any);

    const result = await controller.getProfile('5');
    expect(result).toEqual(profile);
    expect(mockService.getProfile).toHaveBeenCalledWith(5);
  });

  it('POST /mentor-profiles should create profile', async () => {
    const dto = { cvUrl: 'https://cv' };
    const user = { userId: 10 };
    mockService.createProfile.mockResolvedValue({ userId: 10 } as any);

    const result = await controller.createProfile(dto, user);
    expect(mockService.createProfile).toHaveBeenCalledWith(10, dto);
  });

  it('GET /mentor-profiles should list profiles', async () => {
    const profiles = [{ userId: 1 }, { userId: 2 }];
    mockService.listProfiles.mockResolvedValue(profiles as any);

    const result = await controller.listProfiles('0', '10');
    expect(result).toEqual(profiles);
  });
});