import { MentorProfileService } from './mentor-profile.service';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
export declare class MentorProfileInternalController {
    private readonly service;
    constructor(service: MentorProfileService);
    createProfile(apiKey: string, userId: number, dto: CreateMentorProfileDto): Promise<any>;
}
//# sourceMappingURL=mentor-profile.internal.controller.d.ts.map