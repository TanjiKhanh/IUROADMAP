import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as path from 'path';
import { AppModule } from '../app.module';
import { SwaggerAggregatorService } from '../modules/swagger/swagger-aggregator.service';

async function exportSwagger() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });

  // Match main.ts global prefix & versioning
  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('IUROADMAP API Gateway')
    .setDescription('Unified OpenAPI Specification for IUROADMAP Microservices Network')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // 1. Create base Gateway Swagger document
  const baseDocument = SwaggerModule.createDocument(app, config);

  // 2. Run Aggregator to merge all downstream microservices specs
  const aggregator = app.get(SwaggerAggregatorService);
  const unifiedDocument = await aggregator.aggregate(baseDocument);

  // 3. Save to disk
  const specPath = path.resolve(__dirname, '../../swagger-spec.json');
  aggregator.saveSpecToDisk(unifiedDocument, specPath);

  console.log(`✅ [Export] Unified OpenAPI Spec successfully written to: ${specPath}`);
  console.log(`📊 Total Paths: ${Object.keys(unifiedDocument.paths || {}).length}`);
  console.log(`📊 Total Schemas (DTOs): ${Object.keys(unifiedDocument.components?.schemas || {}).length}`);

  await app.close();
  process.exit(0);
}

exportSwagger().catch((err) => {
  console.error('❌ Failed to export unified Swagger spec:', err);
  process.exit(1);
});
