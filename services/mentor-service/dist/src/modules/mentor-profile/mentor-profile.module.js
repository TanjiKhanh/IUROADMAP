"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorProfileModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mentor_profile_controller_1 = require("./controllers/mentor-profile.controller");
const mentor_profile_service_1 = require("./services/mentor-profile.service");
const mentor_profile_repository_1 = require("./repositories/mentor-profile.repository");
const prisma_module_1 = require("../../prisma/prisma.module");
const mentor_profile_internal_controller_1 = require("./controllers/mentor-profile.internal.controller");
let MentorProfileModule = class MentorProfileModule {
};
exports.MentorProfileModule = MentorProfileModule;
exports.MentorProfileModule = MentorProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'secret',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [mentor_profile_controller_1.MentorProfileController, mentor_profile_internal_controller_1.MentorProfileInternalController],
        providers: [mentor_profile_service_1.MentorProfileService, mentor_profile_repository_1.MentorProfileRepository],
        exports: [mentor_profile_service_1.MentorProfileService],
    })
], MentorProfileModule);
//# sourceMappingURL=mentor-profile.module.js.map