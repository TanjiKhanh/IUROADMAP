// gateway/src/common/pipes/validation.pipe.ts

import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private readonly logger = new Logger(ValidationPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.type || metadata.type !== 'body') {
      return value;
    }

    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const messages = errors
        .map((error) => ({
          field: error.property,
          messages: Object.values(error.constraints || {}),
        }));

      this.logger.warn(`Validation failed: ${JSON.stringify(messages)}`);

      throw new BadRequestException({
        status: 'error',
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        errors: messages,
      });
    }

    return object;
  }
}