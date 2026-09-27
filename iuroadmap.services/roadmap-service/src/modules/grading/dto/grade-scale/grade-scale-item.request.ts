import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { AppConstant, EntityConstant } from '@iuroadmap/shared';

export class GradeScaleItemRequest {
  @ApiProperty({ example: 'A+', maxLength: EntityConstant.Short })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.Short)
  letter!: string;

  @ApiProperty({ description: 'Inclusive lower bound (100 scale)', example: 90 })
  @IsInt()
  @Min(0)
  @Max(AppConstant.Roadmap.MaxScore)
  @Type(() => Number)
  minScore!: number;

  @ApiProperty({ description: 'Inclusive upper bound (100 scale)', example: 100 })
  @IsInt()
  @Min(0)
  @Max(AppConstant.Roadmap.MaxScore)
  @Type(() => Number)
  maxScore!: number;

  @ApiProperty({ description: 'Grade point (4 scale)', example: 4.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(AppConstant.Roadmap.MaxGradePoint)
  @Type(() => Number)
  gradePoint!: number;

  @ApiProperty({ description: 'Passing band', example: true })
  @IsBoolean()
  isPassing!: boolean;
}
