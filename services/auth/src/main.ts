import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

import { PrismaClientExceptionFilter } from './filter/prisma-exception.filter';

import { AllExceptionsFilter } from './filter/all-exceptions.filter';

import { ResponseInterceptor } from './filter/response.interceptor';;

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // 1. CẤU HÌNH CORS (Quan trọng cho Cookie)
  app.enableCors({
    // URL of Frontend (Ví dụ: http://localhost:5173 cho Vite)
    origin: ['http://localhost:5173', 'http://localhost:3001'], // Thêm URL của frontend vào đây
    credentials: true, // REQUIRED: To allow sending/receiving Cookies (HttpOnly)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  // 2. MIDDLEWARE
  app.use(cookieParser());

  // 3. GLOBAL PIPES (Validation)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      transform: true, 
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true, 
    }),
  );

  app.useGlobalFilters(new PrismaClientExceptionFilter(), new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const port = process.env.PORT || 3001; // Auth Service (Default: 3001)

  // Use 'localhost' for development to avoid permission issues
  // Use '0.0.0.0' in Docker/production to allow external connections
  const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
  await app.listen(port, host);

  logger.log(`Auth Service is running on: http://localhost:${port}`);
}
bootstrap();