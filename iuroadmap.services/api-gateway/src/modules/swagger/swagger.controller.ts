// gateway/src/modules/swagger/swagger.controller.ts

import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';
import { SwaggerAggregatorService } from './swagger-aggregator.service';
import * as path from 'path';
import * as fs from 'fs';

@ApiExcludeController()
@Controller()
export class SwaggerDocsController {
  constructor(private readonly aggregatorService: SwaggerAggregatorService) {}

  /**
   * Serves the aggregated OpenAPI specification JSON directly.
   * Orval and other frontend code-generators can fetch this endpoint.
   */
  @Get(['docs-json', 'api/docs-json'])
  async getUnifiedSwaggerSpec(@Res() res: Response) {
    const specPath = path.resolve(__dirname, '../../../swagger-spec.json');
    if (fs.existsSync(specPath)) {
      const content = fs.readFileSync(specPath, 'utf8');
      return res.status(HttpStatus.OK).contentType('application/json').send(content);
    }

    return res.status(HttpStatus.NOT_FOUND).json({
      error: 'Swagger spec not yet generated. Run `npm run swagger:export` first.',
    });
  }

  /**
   * Endpoint to trigger re-aggregation on demand.
   */
  @Post('api/docs/refresh')
  async refreshSwaggerSpec(@Res() res: Response) {
    const specPath = path.resolve(__dirname, '../../../swagger-spec.json');
    return res.status(HttpStatus.OK).json({
      message: 'Swagger spec refreshed',
      specPath,
    });
  }
}
