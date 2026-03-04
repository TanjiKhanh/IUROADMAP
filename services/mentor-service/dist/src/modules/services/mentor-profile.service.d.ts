import { MentorProfileRepository } from '../repositories/mentor-profile.repository';
import { CreateMentorProfileDto } from '../mentor-profile/dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from '../mentor-profile/dto/update-mentor-profile.dto';
import { MentorProfileResponseDto } from '../mentor-profile/dto/mentor-profile-response.dto';
export declare class MentorProfileService {
    private readonly repository;
    constructor(repository: MentorProfileRepository);
    getProfile(userId: number): Promise<MentorProfileResponseDto>;
    createProfile(userId: number, dto: CreateMentorProfileDto): Promise<MentorProfileResponseDto>;
    updateProfile(userId: number, dto: UpdateMentorProfileDto): Promise<MentorProfileResponseDto>;
    upsertProfile(userId: number, dto: CreateMentorProfileDto): Promise<MentorProfileResponseDto>;
    deleteProfile(userId: number): Promise<void>;
    listProfiles(skip?: number, take?: number): Promise<MentorProfileResponseDto[]>;
    private mapToResponseDto;
}
//# sourceMappingURL=mentor-profile.service.d.ts.map