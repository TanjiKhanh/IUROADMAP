import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { AppConstant, EntityConstant } from '@iuroadmap/shared';

export class AcademicClassificationItemRequest {
  @ApiProperty({ description: 'i18n key', example: 'roadmap.classification.veryGood', maxLength: EntityConstant.ShortString })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.ShortString)
  labelKey!: string;

  @ApiProperty({ description: 'Inclusive lower bound (GPA 100)', example: 80 })
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(AppConstant.Roadmap.MaxScore)
  @Type(() => Number)
  minGpa100!: number;

  @ApiProperty({ description: 'Exclusive upper bound (GPA 100); the top band includes it', example: 90 })
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(AppConstant.Roadmap.MaxScore)
  @Type(() => Number)
  maxGpa100!: number;
}
