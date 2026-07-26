// gateway/src/main.ts

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';

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
    .setDescription('The API Gateway for the IUROADMAP microservices network.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Write swagger specification to disk in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    const specPath = path.join(__dirname, '../swagger-spec.json');
    fs.writeFileSync(specPath, JSON.stringify(document, null, 2));
    console.log(`📝 Swagger spec written to ${specPath}`);
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
  app.useGlobalInterceptors(new ErrorInterceptor());

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`✅ Gateway listening on port ${port}`);
}

bootstrap();