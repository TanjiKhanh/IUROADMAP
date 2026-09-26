import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl, Matches, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AppConstant, EntityConstant } from '@iuroadmap/shared';
import { Patterns } from '../../../../common/patterns';
import { TopicCoordsRequest } from './topic-coords.request';

export class TopicUpdateRequest {
  @ApiPropertyOptional({ maxLength: EntityConstant.ShortString })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.ShortString)
  @Matches(Patterns.Slug)
  slug?: string;

  @ApiPropertyOptional({ maxLength: EntityConstant.LongString })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.LongString)
  title?: string;

  @ApiPropertyOptional({ maxLength: EntityConstant.DescriptionLong })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.DescriptionLong)
  description?: string;

  @ApiPropertyOptional({ maxLength: EntityConstant.DescriptionLong })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.DescriptionLong)
  learningObjectives?: string;

  @ApiPropertyOptional({ maxLength: EntityConstant.FilePath })
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @IsOptional()
  @MaxLength(EntityConstant.FilePath)
  resourcesUrl?: string;

  @ApiPropertyOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(AppConstant.Roadmap.MinTopicHours)
  @IsOptional()
  @Type(() => Number)
  estimatedHours?: number;

  @ApiPropertyOptional({ type: TopicCoordsRequest })
  @ValidateNested()
  @IsOptional()
  @Type(() => TopicCoordsRequest)
  coords?: TopicCoordsRequest;
}
