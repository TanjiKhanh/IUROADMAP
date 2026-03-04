import { PrismaService } from '../../prisma/prisma.service';
import { CreateMentorProfileDto } from '../mentor-profile/dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from '../mentor-profile/dto/update-mentor-profile.dto';
export declare class MentorProfileRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findByUserId(userId: number): Promise<{
        userId: number;
        bio: import("@prisma/client/runtime/library").JsonValue | null;
        cvUrl: string | null;
        linkedinUrl: string | null;
        industry: string | null;
        skills: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(userId: number, data: CreateMentorProfileDto): Promise<{
        userId: number;
        bio: import("@prisma/client/runtime/library").JsonValue | null;
        cvUrl: string | null;
        linkedinUrl: string | null;
        industry: string | null;
        skills: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(userId: number, data: UpdateMentorProfileDto): Promise<{
        userId: number;
        bio: import("@prisma/client/runtime/library").JsonValue | null;
        cvUrl: string | null;
        linkedinUrl: string | null;
        industry: string | null;
        skills: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    upsert(userId: number, data: CreateMentorProfileDto): Promise<{
        userId: number;
        bio: import("@prisma/client/runtime/library").JsonValue | null;
        cvUrl: string | null;
        linkedinUrl: string | null;
        industry: string | null;
        skills: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(userId: number): Promise<{
        userId: number;
        bio: import("@prisma/client/runtime/library").JsonValue | null;
        cvUrl: string | null;
        linkedinUrl: string | null;
        industry: string | null;
        skills: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    findMany(skip?: number, take?: number, where?: any): Promise<{
        userId: number;
        bio: import("@prisma/client/runtime/library").JsonValue | null;
        cvUrl: string | null;
        linkedinUrl: string | null;
        industry: string | null;
        skills: string[];
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
//# sourceMappingURL=mentor-profile.repository.d.ts.map