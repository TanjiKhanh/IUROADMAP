"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const mailer_1 = require("@nestjs-modules/mailer");
const auth_controller_1 = require("./controllers/auth.controller");
const user_controller_1 = require("./controllers/user.controller");
const auth_service_1 = require("./services/auth.service");
const users_service_1 = require("./services/users.service");
const prisma_service_1 = require("./prisma/prisma.service");
const user_repository_1 = require("./repositories/user.repository");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const admin_client_module_1 = require("../src/external/admin-client/admin-client.module");
const user_client_module_1 = require("./external/user-client/user-client.module");
const mentor_client_module_1 = require("./external/mentor-client/mentor-client.module");
const prisma_module_1 = require("./prisma/prisma.module");
const health_controller_1 = require("./health.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            prisma_module_1.PrismaModule,
            admin_client_module_1.AdminClientModule,
            user_client_module_1.UserClientModule,
            mentor_client_module_1.MentorClientModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET') || 'supersecret_dev_key',
                    signOptions: { expiresIn: '15m' },
                }),
                inject: [config_1.ConfigService],
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    transport: {
                        host: configService.get('MAIL_HOST'),
                        port: configService.get('MAIL_PORT'),
                        secure: false,
                        auth: {
                            user: configService.get('MAIL_USER'),
                            pass: configService.get('MAIL_PASS'),
                        },
                        tls: {
                            rejectUnauthorized: false,
                        },
                    },
                    defaults: {
                        from: configService.get('MAIL_FROM'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController, user_controller_1.UsersController, health_controller_1.HealthController],
        providers: [
            auth_service_1.AuthService,
            users_service_1.UsersService,
            user_repository_1.UsersRepository,
            prisma_service_1.PrismaService,
            jwt_strategy_1.JwtStrategy,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map