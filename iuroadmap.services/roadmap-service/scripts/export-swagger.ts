/**
 * Builds the Nest app WITHOUT a database (PrismaService is stubbed) and writes the OpenAPI spec.
 * Use it to check DI wiring and Swagger generation offline:
 *   npx ts-node --transpile-only scripts/export-swagger.ts [output.json]
 */
import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import { VersioningType } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

async function main() {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
    .overrideProvider(PrismaService)
    .useValue({})
    .compile();
  const app = moduleRef.createNestApplication({ logger: ['error', 'warn'] });
  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.enableVersioning({ type: VersioningType.URI });
  await app.init();

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().setTitle('IUROADMAP Roadmap Service').setVersion('2.0').addBearerAuth().build(),
  );
  const out = path.resolve(process.argv[2] ?? 'swagger-roadmap.json');
  fs.writeFileSync(out, JSON.stringify(document, null, 2));
  const paths = Object.keys(document.paths);
  console.log(`✅ ${paths.length} paths, ${Object.keys(document.components?.schemas ?? {}).length} schemas → ${out}`);
  await app.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
