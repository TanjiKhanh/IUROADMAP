// gateway/src/modules/swagger/swagger.module.ts

import { Module } from '@nestjs/common';
import { SwaggerAggregatorService } from './swagger-aggregator.service';
import { SwaggerDocsController } from './swagger.controller';

@Module({
  controllers: [SwaggerDocsController],
  providers: [SwaggerAggregatorService],
  exports: [SwaggerAggregatorService],
})
export class SwaggerDocsModule {}
