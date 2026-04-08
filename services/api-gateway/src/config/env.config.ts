// gateway/src/config/env.config.ts

import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  PORT: number = 8080;

  @IsString()
  NODE_ENV: string = 'development';

  @IsString()
  @IsOptional()
  JWT_PUBLIC_KEY?: string;

  @IsString()
  @IsOptional()
  AUTH_SERVICE_URL?: string;

  @IsString()
  @IsOptional()
  ADMIN_SERVICE_URL?: string;

  @IsString()
  @IsOptional()
  USER_SERVICE_URL?: string;

  @IsString()
  @IsOptional()
  MENTOR_SERVICE_URL?: string;

  @IsString()
  @IsOptional()
  CORS_ORIGIN?: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}