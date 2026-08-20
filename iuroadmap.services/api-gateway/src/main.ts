// gateway/src/main.ts

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter, ResponseInterceptor } from '@iuroadmap/shared';
import { SwaggerAggregatorService } from './modules/swagger/swagger-aggregator.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api', { exclude: ['health'] });

  // Enable versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('IUROADMAP API Gateway')
    .setDescription('Unified OpenAPI Specification for IUROADMAP Microservices Network')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const baseDocument = SwaggerModule.createDocument(app, config);

  // Run Aggregator to merge all microservices specs
  const aggregator = app.get(SwaggerAggregatorService);
  const document = await aggregator.aggregate(baseDocument);
  SwaggerModule.setup('docs', app, document);

  // Write unified swagger specification to disk
  if (process.env.NODE_ENV !== 'production') {
    const specPath = path.join(__dirname, '../swagger-spec.json');
    aggregator.saveSpecToDisk(document, specPath);
  }

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  });

  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`✅ Gateway listening on port ${port}`);
}

bootstrap();