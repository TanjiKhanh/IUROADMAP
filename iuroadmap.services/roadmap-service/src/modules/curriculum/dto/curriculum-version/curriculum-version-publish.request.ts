import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class CurriculumVersionPublishRequest {
  @ApiPropertyOptional({ description: 'Must be true when the validator returns warnings', default: false })
  @IsBoolean()
  @IsOptional()
  acknowledgeWarnings?: boolean;
}
