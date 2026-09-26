import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Matches, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AppConstant, EntityConstant } from '@iuroadmap/shared';
import { Patterns } from '../../../../common/patterns';
import { TopicCoordsRequest } from './topic-coords.request';

export class TopicCreateRequest {
  @ApiProperty({ description: 'Unique within the offering', example: 'variables-and-types', maxLength: EntityConstant.ShortString })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.ShortString)
  @Matches(Patterns.Slug)
  slug!: string;

  @ApiProperty({ example: 'Variables and Data Types', maxLength: EntityConstant.LongString })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.LongString)
  title!: string;

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

  @ApiPropertyOptional({ description: 'HTTP/HTTPS only (BR-RM-05)', maxLength: EntityConstant.FilePath })
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @IsOptional()
  @MaxLength(EntityConstant.FilePath)
  resourcesUrl?: string;

  @ApiPropertyOptional({ description: 'Estimated hours, at least 0.1 (BR-RM-06)', example: 2.5 })
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
