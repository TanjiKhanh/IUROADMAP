"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const prisma_exception_filter_1 = require("./filter/prisma-exception.filter");
const all_exceptions_filter_1 = require("./filter/all-exceptions.filter");
const response_interceptor_1 = require("./filter/response.interceptor");
;
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:5173', 'http://localhost:3000'],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new prisma_exception_filter_1.PrismaClientExceptionFilter(), new all_exceptions_filter_1.AllExceptionsFilter());
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');
    logger.log(`Auth Service is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map