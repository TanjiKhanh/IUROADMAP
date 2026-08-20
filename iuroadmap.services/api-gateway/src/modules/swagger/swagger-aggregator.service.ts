// gateway/src/modules/swagger/swagger-aggregator.service.ts

import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { OpenAPIObject } from '@nestjs/swagger';
import { ServiceUrls } from '../../config/service-urls.config';

export interface MicroserviceConfig {
  name: string;
  tag: string;
  baseUrl: string;
  docsPath: string;
}

@Injectable()
export class SwaggerAggregatorService {
  private readonly logger = new Logger(SwaggerAggregatorService.name);

  private readonly services: MicroserviceConfig[] = [
    {
      name: 'Auth Service',
      tag: 'Auth',
      baseUrl: ServiceUrls.AUTH_SERVICE,
      docsPath: '/docs-json',
    },
    {
      name: 'Mentor Service',
      tag: 'Mentors',
      baseUrl: ServiceUrls.MENTOR_SERVICE,
      docsPath: '/docs-json',
    },
    {
      name: 'User Service',
      tag: 'Users',
      baseUrl: ServiceUrls.USER_SERVICE,
      docsPath: '/docs-json',
    },
    {
      name: 'Roadmap Service',
      tag: 'Roadmaps',
      baseUrl: ServiceUrls.ROADMAP_SERVICE,
      docsPath: '/docs-json',
    },
  ];

  /**
   * Merges Gateway's local Swagger document with remote microservices' OpenAPI specs.
   */
  async aggregate(baseDocument: OpenAPIObject): Promise<OpenAPIObject> {
    const unifiedDoc: OpenAPIObject = JSON.parse(JSON.stringify(baseDocument));

    if (!unifiedDoc.paths) unifiedDoc.paths = {};
    if (!unifiedDoc.components) unifiedDoc.components = {};
    if (!unifiedDoc.components.schemas) unifiedDoc.components.schemas = {};
    if (!unifiedDoc.tags) unifiedDoc.tags = [];

    const existingTags = new Set(unifiedDoc.tags.map((t) => t.name));

    for (const service of this.services) {
      try {
        const spec = await this.fetchServiceSpec(service);
        if (!spec) continue;

        this.logger.log(`📥 Merging OpenAPI spec from [${service.name}]`);

        // 1. Merge Schemas / Models / DTOs
        if (spec.components?.schemas) {
          for (const [schemaName, schemaObj] of Object.entries(spec.components.schemas)) {
            unifiedDoc.components.schemas[schemaName] = schemaObj;
          }
        }

        // 2. Merge Tags
        if (spec.tags && Array.isArray(spec.tags)) {
          for (const tag of spec.tags) {
            if (!existingTags.has(tag.name)) {
              unifiedDoc.tags.push(tag);
              existingTags.add(tag.name);
            }
          }
        }

        // 3. Merge Paths
        if (spec.paths) {
          for (const [pathKey, pathItem] of Object.entries(spec.paths)) {
            // Clean up path key to match Gateway route if needed
            const normalizedPath = this.normalizePath(pathKey);
            if (normalizedPath.endsWith('/health') && unifiedDoc.paths[normalizedPath]) {
              continue;
            }
            unifiedDoc.paths[normalizedPath] = pathItem as any;
          }
        }
      } catch (err: any) {
        this.logger.warn(`⚠️ Could not aggregate spec from ${service.name} (${service.baseUrl}): ${err.message}`);
      }
    }

    return unifiedDoc;
  }

  /**
   * Fetches the OpenAPI JSON spec from a running microservice.
   */
  private async fetchServiceSpec(service: MicroserviceConfig): Promise<any | null> {
    const url = `${service.baseUrl.replace(/\/$/, '')}${service.docsPath}`;
    try {
      const response = await axios.get(url, {
        timeout: 2500,
        headers: { Accept: 'application/json' },
      });
      return response.data;
    } catch (error: any) {
      this.logger.debug(`Service ${service.name} not reachable at ${url}: ${error.message}`);
      return null;
    }
  }

  /**
   * Normalizes microservice paths to ensure Gateway proxy paths are consistent.
   */
  private normalizePath(rawPath: string): string {
    let normalized = rawPath;
    // If microservice exposed /auth/..., convert to /api/v1/auth/... if gateway uses /api/v1
    if (!normalized.startsWith('/api/')) {
      if (normalized.startsWith('/v1/')) {
        normalized = `/api${normalized}`;
      } else if (!normalized.startsWith('/')) {
        normalized = `/api/v1/${normalized}`;
      } else {
        normalized = `/api/v1${normalized}`;
      }
    }
    return normalized;
  }

  /**
   * Writes the unified document to swagger-spec.json on disk.
   */
  saveSpecToDisk(document: OpenAPIObject, targetPath?: string): string {
    const specPath = targetPath || path.resolve(__dirname, '../../../swagger-spec.json');
    const dir = path.dirname(specPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(specPath, JSON.stringify(document, null, 2));
    this.logger.log(`📝 Unified Swagger spec written to ${specPath}`);
    return specPath;
  }
}
