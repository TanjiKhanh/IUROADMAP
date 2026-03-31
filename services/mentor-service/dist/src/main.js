"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, '..', '.env') });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const port = parseInt(process.env.PORT ?? '4001', 10);
    await app.listen(port, "0.0.0.0");
    console.log(`🚀 Mentor Service is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map