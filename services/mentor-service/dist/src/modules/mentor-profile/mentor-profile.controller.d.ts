import { MentorProfileService } from './mentor-profile.service';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';
export declare class MentorProfileController {
    private readonly service;
    constructor(service: MentorProfileService);
    listProfiles(skip?: string, take?: string): Promise<import("./dto/mentor-profile-response.dto").MentorProfileResponseDto[]>;
    getProfile(userId: string): Promise<import("./dto/mentor-profile-response.dto").MentorProfileResponseDto>;
    createProfile(dto: CreateMentorProfileDto, user: any): Promise<import("./dto/mentor-profile-response.dto").MentorProfileResponseDto>;
    updateProfile(userId: string, dto: UpdateMentorProfileDto, user: any): Promise<import("./dto/mentor-profile-response.dto").MentorProfileResponseDto>;
    deleteProfile(userId: string): Promise<void>;
    upsertProfile(userId: string, dto: CreateMentorProfileDto): Promise<import("./dto/mentor-profile-response.dto").MentorProfileResponseDto>;
}
//# sourceMappingURL=mentor-profile.controller.d.ts.map