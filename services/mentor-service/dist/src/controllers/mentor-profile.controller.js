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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorProfileController = void 0;
const common_1 = require("@nestjs/common");
const mentor_profile_service_1 = require("../services/mentor-profile.service");
const create_mentor_profile_dto_1 = require("../dto/create-mentor-profile.dto");
const update_mentor_profile_dto_1 = require("../dto/update-mentor-profile.dto");
let MentorProfileController = class MentorProfileController {
    constructor(mentorProfileService) {
        this.mentorProfileService = mentorProfileService;
    }
    async createProfile(userId, dto) {
        return this.mentorProfileService.createProfile(userId, dto);
    }
    async updateProfile(userId, dto) {
        return this.mentorProfileService.updateProfile(userId, dto);
    }
};
__decorate([
    (0, common_1.Post)(':id/profile'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_mentor_profile_dto_1.CreateMentorProfileDto]),
    __metadata("design:returntype", Promise)
], MentorProfileController.prototype, "createProfile", null);
__decorate([
    (0, common_1.Patch)(':id/profile'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_mentor_profile_dto_1.UpdateMentorProfileDto]),
    __metadata("design:returntype", Promise)
], MentorProfileController.prototype, "updateProfile", null);
MentorProfileController = __decorate([
    (0, common_1.Controller)('mentors'),
    __metadata("design:paramtypes", [mentor_profile_service_1.MentorProfileService])
], MentorProfileController);
exports.MentorProfileController = MentorProfileController;
//# sourceMappingURL=mentor-profile.controller.js.map