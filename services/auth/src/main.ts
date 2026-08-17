import { ValidationPipe, Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

import { HttpExceptionFilter, ResponseInterceptor } from '@iuroadmap/shared';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('IUROADMAP Auth Service')
    .setDescription('Authentication & JWT Service API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

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

  app.useGlobalFilters(
    new HttpExceptionFilter()
  );

  // Global interceptors
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
  );

  const port = process.env.PORT || 3000; // Auth Service 

  // Use 'localhost' for development to avoid permission issues
  // Use '0.0.0.0' in Docker/production to allow external connections
  const host = process.env.HOST || '0.0.0.0';
  await app.listen(port, host);

  logger.log(`Auth Service is running on: http://localhost:${port}`);
}
bootstrap();