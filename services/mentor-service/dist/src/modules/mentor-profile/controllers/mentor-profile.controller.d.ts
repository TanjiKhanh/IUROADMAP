import { MentorProfileService } from '../services/mentor-profile.service';
import { UpdateMentorProfileDto } from '../dto/update-mentor-profile.dto';
export declare class MentorProfileController {
    private readonly service;
    constructor(service: MentorProfileService);
    listProfiles(skip?: string, take?: string): Promise<import("../dto/mentor-profile-response.dto").MentorProfileResponseDto[]>;
    getMyProfile(user: any): Promise<import("../dto/mentor-profile-response.dto").MentorProfileResponseDto>;
    updateProfile(dto: UpdateMentorProfileDto, user: any): Promise<import("../dto/mentor-profile-response.dto").MentorProfileResponseDto>;
    deleteProfile(userId: string): Promise<void>;
}
//# sourceMappingURL=mentor-profile.controller.d.ts.map