import 'reflect-metadata';
import { config } from 'dotenv';
import { join } from 'path';

// Load .env for local runs, but keep existing process env (e.g., Docker Compose overrides).
config({ path: join(__dirname, '..', '.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('IUROADMAP Mentor Service')
    .setDescription('Mentor Profile & Expertise Service API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = parseInt(process.env.PORT ?? '4001', 10);
  
  await app.listen(port , "0.0.0.0");
  
  console.log(`🚀 Mentor Service is running on: http://localhost:${port}`);
}

bootstrap();