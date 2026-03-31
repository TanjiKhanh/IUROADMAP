import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

import 'reflect-metadata';

async function bootstrap() {
  const logger = new Logger('UserService');
  
  // Create the NestJS application
  const app = await NestFactory.create(AppModule);

  // 1. Enable Validation
  // This ensures inputs like EnrollRoadmapDto are checked before reaching the controller
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 🧹 Strip properties that don't exist in the DTO
    transform: true, // 🔄 Automatically transform payloads to DTO instances
    forbidNonWhitelisted: true, // 🛑 Throw error if extra properties are sent
  }));

  // 2. Enable CORS
  // Useful for local development if frontend calls this service directly (bypass gateway)
  // In production, usually only the Gateway needs CORS enabled.
  app.enableCors();

  // 3. Start Server
  // We use port 4000 to match your docker-compose.yml configuration
  const PORT = process.env.PORT || 4000;
  
  await app.listen(PORT , "0.0.0.0");
  
  logger.log(`🚀 User Service running on port ${PORT}`);
}
bootstrap();