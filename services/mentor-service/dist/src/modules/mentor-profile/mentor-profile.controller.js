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
const mentor_profile_service_1 = require("./mentor-profile.service");
const create_mentor_profile_dto_1 = require("./dto/create-mentor-profile.dto");
const update_mentor_profile_dto_1 = require("./dto/update-mentor-profile.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt.auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const roles_enum_1 = require("../../common/enums/roles.enum");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let MentorProfileController = class MentorProfileController {
    constructor(service) {
        this.service = service;
    }
    async listProfiles(skip = '0', take = '10') {
        return this.service.listProfiles(Number(skip), Number(take));
    }
    async getMyProfile(user) {
        return this.service.getProfile(user.userId);
    }
    async createProfile(dto, user) {
        return this.service.createProfile(user.userId, dto);
    }
    async updateProfile(dto, user) {
        return this.service.updateProfile(user.userId, dto);
    }
    async deleteProfile(userId) {
        await this.service.deleteProfile(Number(userId));
    }
};
exports.MentorProfileController = MentorProfileController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MentorProfileController.prototype, "listProfiles", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.MENTOR),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MentorProfileController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.MENTOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mentor_profile_dto_1.CreateMentorProfileDto, Object]),
    __metadata("design:returntype", Promise)
], MentorProfileController.prototype, "createProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.MENTOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Put)('me'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_mentor_profile_dto_1.UpdateMentorProfileDto, Object]),
    __metadata("design:returntype", Promise)
], MentorProfileController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MentorProfileController.prototype, "deleteProfile", null);
exports.MentorProfileController = MentorProfileController = __decorate([
    (0, common_1.Controller)('mentor-profiles'),
    __metadata("design:paramtypes", [mentor_profile_service_1.MentorProfileService])
], MentorProfileController);
//# sourceMappingURL=mentor-profile.controller.js.map