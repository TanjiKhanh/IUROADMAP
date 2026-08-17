import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from '../app.module';

async function exportSwagger() {
  const app = await NestFactory.create(AppModule, { logger: false });

  // Match main.ts global prefix & versioning
  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('IUROADMAP API Gateway')
    .setDescription('The API Gateway for the IUROADMAP microservices network.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const specPath = path.resolve(__dirname, '../../swagger-spec.json');

  fs.writeFileSync(specPath, JSON.stringify(document, null, 2));
  console.log(`📝 Swagger spec successfully written to ${specPath}`);

  await app.close();
  process.exit(0);
}

exportSwagger().catch((err) => {
  console.error('❌ Failed to export Swagger spec:', err);
  process.exit(1);
});
