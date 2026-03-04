import { MentorProfileService } from '../services/mentor-profile.service';
export declare class MentorProfileInternalController {
    private readonly service;
    constructor(service: MentorProfileService);
    createProfile(apiKey: string, body: any): Promise<import("../dto/mentor-profile-response.dto").MentorProfileResponseDto>;
}
//# sourceMappingURL=mentor-profile.internal.controller.d.ts.map