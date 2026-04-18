import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

import 'reflect-metadata';

async function bootstrap() {
  const logger = new Logger('UserService');
  
  // Create the NestJS application
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    transform: true, 
    forbidNonWhitelisted: true, 
  }));



  const PORT = process.env.PORT || 4000;
  
  await app.listen(PORT , "0.0.0.0");
  
  logger.log(`🚀 User Service running on port ${PORT}`);
}
bootstrap();