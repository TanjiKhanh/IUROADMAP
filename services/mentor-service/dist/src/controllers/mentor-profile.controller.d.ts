import { MentorProfileService } from '../services/mentor-profile.service';
import { CreateMentorProfileDto } from '../dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from '../dto/update-mentor-profile.dto';
export declare class MentorProfileController {
    private readonly mentorProfileService;
    constructor(mentorProfileService: MentorProfileService);
    createProfile(userId: number, dto: CreateMentorProfileDto): Promise<import("@prisma/client/runtime").GetResult<{
        userId: number;
        bio: import(".prisma/client").Prisma.JsonValue;
        cvUrl: string;
        linkedinUrl: string;
        industry: string;
        skills: string[];
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    updateProfile(userId: number, dto: UpdateMentorProfileDto): Promise<import("@prisma/client/runtime").GetResult<{
        userId: number;
        bio: import(".prisma/client").Prisma.JsonValue;
        cvUrl: string;
        linkedinUrl: string;
        industry: string;
        skills: string[];
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
}
//# sourceMappingURL=mentor-profile.controller.d.ts.map