import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TopicCoordsDto {
  @IsNumber()
  x!: number;

  @IsNumber()
  y!: number;
}

export class CreateTopicNodeDto {
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  learningObjectives?: string;

  @IsOptional()
  @IsString()
  resourcesUrl?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TopicCoordsDto)
  coords?: TopicCoordsDto;
}

export class UpdateTopicNodeDto {
  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  learningObjectives?: string;

  @IsOptional()
  @IsString()
  resourcesUrl?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TopicCoordsDto)
  coords?: TopicCoordsDto;
}

export class UpdateCourseNodeMetaDto {
  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  credits?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateTopicCoordsDto {
  @ValidateNested()
  @Type(() => TopicCoordsDto)
  coords!: TopicCoordsDto;
}

export class CreateTopicEdgeDto {
  @IsInt()
  @Min(1)
  sourceTopicId!: number;

  @IsInt()
  @Min(1)
  targetTopicId!: number;
}

export class CourseNodeListItemDto {
  id!: number;
  roadmapId!: number;
  roadmapSlug!: string;
  roadmapName!: string;
  slug!: string;
  name!: string;
  credits!: number;
  description!: string | null;
}

export class TopicEdgeResponseDto {
  id!: number;
  fromTopicId!: number;
  toTopicId!: number;
}

export class TopicNodeResponseDto {
  id!: number;
  slug!: string;
  title!: string;
  description!: string | null;
  coords!: { x: number; y: number } | null;
  learningObjectives!: string | null;
  resourcesUrl!: string | null;
}

export class CourseTopicsGraphResponseDto {
  courseNodeId!: number;
  topics!: TopicNodeResponseDto[];
  edges!: TopicEdgeResponseDto[];
}
