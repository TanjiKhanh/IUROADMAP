"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorProfileRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let MentorProfileRepository = class MentorProfileRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUserId(userId) {
        return this.prisma.mentorProfile.findUnique({
            where: { userId },
        });
    }
    async create(userId, data) {
        return this.prisma.mentorProfile.create({
            data: {
                userId,
                bio: data.bio ? { text: data.bio } : null,
                cvUrl: data.cvUrl || null,
                linkedinUrl: data.linkedinUrl || null,
                industry: data.industry || null,
                skills: data.skills || [],
            },
        });
    }
    async update(userId, data) {
        return this.prisma.mentorProfile.update({
            where: { userId },
            data: {
                ...(data.bio !== undefined && { bio: { text: data.bio } }),
                ...(data.cvUrl !== undefined && { cvUrl: data.cvUrl }),
                ...(data.linkedinUrl !== undefined && { linkedinUrl: data.linkedinUrl }),
                ...(data.industry !== undefined && { industry: data.industry }),
                ...(data.skills !== undefined && { skills: data.skills }),
                updatedAt: new Date(),
            },
        });
    }
    async upsert(userId, data) {
        return this.prisma.mentorProfile.upsert({
            where: { userId },
            create: {
                userId,
                bio: data.bio ? { text: data.bio } : null,
                cvUrl: data.cvUrl || null,
                linkedinUrl: data.linkedinUrl || null,
                industry: data.industry || null,
                skills: data.skills || [],
            },
            update: {
                ...(data.bio !== undefined && { bio: { text: data.bio } }),
                ...(data.cvUrl !== undefined && { cvUrl: data.cvUrl }),
                ...(data.linkedinUrl !== undefined && { linkedinUrl: data.linkedinUrl }),
                ...(data.industry !== undefined && { industry: data.industry }),
                ...(data.skills !== undefined && { skills: data.skills }),
                updatedAt: new Date(),
            },
        });
    }
    async delete(userId) {
        return this.prisma.mentorProfile.delete({ where: { userId } });
    }
    async findMany(skip = 0, take = 10, where) {
        return this.prisma.mentorProfile.findMany({
            skip,
            take,
            where,
        });
    }
};
exports.MentorProfileRepository = MentorProfileRepository;
exports.MentorProfileRepository = MentorProfileRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MentorProfileRepository);
//# sourceMappingURL=mentor-profile.repository.js.map