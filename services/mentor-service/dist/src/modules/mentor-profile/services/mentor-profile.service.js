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
const mentor_profile_repository_1 = require("../repositories/mentor-profile.repository");
let MentorProfileService = class MentorProfileService {
    constructor(repository) {
        this.repository = repository;
    }
    async getProfile(userId) {
        const profile = await this.repository.findByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException(`Mentor profile for user ${userId} not found`);
        }
        return this.mapToResponseDto(profile);
    }
    async createProfile(userId, dto) {
        const existing = await this.repository.findByUserId(userId);
        if (existing) {
            throw new common_1.BadRequestException('Mentor profile already exists for this user');
        }
        const created = await this.repository.create(userId, dto);
        return this.mapToResponseDto(created);
    }
    async updateProfile(userId, dto) {
        const existing = await this.repository.findByUserId(userId);
        if (!existing) {
            throw new common_1.NotFoundException(`Mentor profile for user ${userId} not found`);
        }
        const updated = await this.repository.update(userId, dto);
        return this.mapToResponseDto(updated);
    }
    async upsertProfile(userId, dto) {
        const upserted = await this.repository.upsert(userId, dto);
        return this.mapToResponseDto(upserted);
    }
    async deleteProfile(userId) {
        const existing = await this.repository.findByUserId(userId);
        if (!existing) {
            throw new common_1.NotFoundException(`Mentor profile for user ${userId} not found`);
        }
        await this.repository.delete(userId);
    }
    async listProfiles(skip = 0, take = 10) {
        const profiles = await this.repository.findMany(skip, take);
        return profiles.map((p) => this.mapToResponseDto(p));
    }
    mapToResponseDto(profile) {
        return {
            userId: profile.userId,
            bio: profile.bio,
            cvUrl: profile.cvUrl,
            linkedinUrl: profile.linkedinUrl,
            industry: profile.industry,
            skills: profile.skills || [],
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt,
        };
    }
};
exports.MentorProfileService = MentorProfileService;
exports.MentorProfileService = MentorProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mentor_profile_repository_1.MentorProfileRepository])
], MentorProfileService);
//# sourceMappingURL=mentor-profile.service.js.map