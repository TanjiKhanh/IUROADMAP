import 'reflect-metadata';
import { config } from 'dotenv';
import { join } from 'path';

// Load .env BEFORE NestJS bootstraps, with override so it wins over system env vars
config({ path: join(__dirname, '..', '.env'), override: true });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = parseInt(process.env.PORT ?? '4001', 10);
  
  await app.listen(port);
  
  console.log(`🚀 Mentor Service is running on: http://localhost:${port}`);
}

bootstrap();