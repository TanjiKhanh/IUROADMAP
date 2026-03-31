import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMentorProfileDto } from '../dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from '../dto/update-mentor-profile.dto';
export declare class MentorProfileRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findByUserId(userId: number): Promise<{
        cvUrl: string | null;
        linkedinUrl: string | null;
        industry: string | null;
        skills: string[];
        bio: string | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(userId: number, data: CreateMentorProfileDto): Promise<{
        cvUrl: string | null;
        linkedinUrl: string | null;
        industry: string | null;
        skills: string[];
        bio: string | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(userId: number, data: UpdateMentorProfileDto): Promise<{
        cvUrl: string | null;
        linkedinUrl: string | null;
        industry: string | null;
        skills: string[];
        bio: string | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    upsert(userId: number, data: CreateMentorProfileDto): Promise<{
        cvUrl: string | null;
        linkedinUrl: string | null;
        industry: string | null;
        skills: string[];
        bio: string | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(userId: number): Promise<{
        cvUrl: string | null;
        linkedinUrl: string | null;
        industry: string | null;
        skills: string[];
        bio: string | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findMany(skip?: number, take?: number, where?: any): Promise<{
        cvUrl: string | null;
        linkedinUrl: string | null;
        industry: string | null;
        skills: string[];
        bio: string | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
//# sourceMappingURL=mentor-profile.repository.d.ts.map