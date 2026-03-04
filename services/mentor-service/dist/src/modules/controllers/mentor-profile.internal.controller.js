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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorProfileInternalController = void 0;
const common_1 = require("@nestjs/common");
const mentor_profile_service_1 = require("./mentor-profile.service");
const create_mentor_profile_dto_1 = require("./dto/create-mentor-profile.dto");
let MentorProfileInternalController = class MentorProfileInternalController {
    constructor(service) {
        this.service = service;
    }
    async createProfile(apiKey, userId, dto) {
        if (apiKey !== process.env.MENTOR_SERVICE_API_KEY) {
            throw new common_1.UnauthorizedException('Invalid Internal API Key');
        }
        return this.service.createProfile(userId, dto);
    }
};
exports.MentorProfileInternalController = MentorProfileInternalController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('x-api-key')),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('profileData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, typeof (_b = typeof create_mentor_profile_dto_1.CreateMentorProfileDto !== "undefined" && create_mentor_profile_dto_1.CreateMentorProfileDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], MentorProfileInternalController.prototype, "createProfile", null);
exports.MentorProfileInternalController = MentorProfileInternalController = __decorate([
    (0, common_1.Controller)('internal/mentor-profiles'),
    __metadata("design:paramtypes", [typeof (_a = typeof mentor_profile_service_1.MentorProfileService !== "undefined" && mentor_profile_service_1.MentorProfileService) === "function" ? _a : Object])
], MentorProfileInternalController);
//# sourceMappingURL=mentor-profile.internal.controller.js.map