import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationResponse } from '@iuroadmap/shared';

/** Documents a `PaginationResponse<T>` so the generated FE client gets typed `datas`. */
export function ApiPaginatedResponse<T extends Type<unknown>>(model: T) {
  return applyDecorators(
    ApiExtraModels(PaginationResponse, model),
    ApiOkResponse({
      description: 'Paginated list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationResponse) },
          { properties: { datas: { type: 'array', items: { $ref: getSchemaPath(model) } } } },
        ],
      },
    }),
  );
}
