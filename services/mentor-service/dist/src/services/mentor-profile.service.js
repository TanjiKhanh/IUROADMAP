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
exports.MentorProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MentorProfileService = class MentorProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProfile(userId, dto) {
        const existingProfile = await this.prisma.mentorProfile.findUnique({
            where: { userId },
        });
        if (existingProfile) {
            throw new common_1.ConflictException('Mentor profile already exists for this user');
        }
        return this.prisma.mentorProfile.create({
            data: {
                userId,
                cvUrl: dto.cvUrl,
                linkedinUrl: dto.linkedinUrl,
                industry: dto.industry,
                skills: dto.skills,
            },
        });
    }
    async updateProfile(userId, dto) {
        const existing = await this.prisma.mentorProfile.findUnique({
            where: { userId },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Mentor profile not found');
        }
        const { skills, ...rest } = dto;
        const data = { ...rest };
        if (skills !== undefined) {
            data.skills = skills;
        }
        return this.prisma.mentorProfile.update({
            where: { userId },
            data,
        });
    }
};
MentorProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MentorProfileService);
exports.MentorProfileService = MentorProfileService;
//# sourceMappingURL=mentor-profile.service.js.map