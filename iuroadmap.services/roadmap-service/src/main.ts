import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter, ResponseInterceptor } from '@iuroadmap/shared';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Same routing as auth: the gateway forwards /api/v1/<prefix>/... unchanged.
  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.enableVersioning({ type: VersioningType.URI });

  const config = new DocumentBuilder()
    .setTitle('IUROADMAP Roadmap Service')
    .setDescription('Curriculum by year, course catalog, student roadmap overlay and grades (Roadmap v2)')
    .setVersion('2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  // Error bodies: { status, code, message, ... }; success bodies: { status, data, timestamp, path }
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors();

  const port = process.env.PORT || 4100;
  await app.listen(port, '0.0.0.0');
  logger.log(`🚀 Roadmap Service is running on port ${port}`);
}
bootstrap();
