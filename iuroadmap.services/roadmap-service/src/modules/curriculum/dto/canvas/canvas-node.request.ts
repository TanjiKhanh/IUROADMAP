import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EntityConstant } from '@iuroadmap/shared';
import { RoadmapNodeKindEnum } from '../../../../common/enums';

export class CanvasNodeRequest {
  @ApiProperty({ format: 'uuid' })
  @IsUUID('4')
  nodeKey!: string;

  @ApiProperty({ format: 'uuid', description: 'Column that holds the node' })
  @IsUUID('4')
  termKey!: string;

  @ApiProperty({ description: 'Row in the column (logical position, not pixels)', example: 0 })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  rowIndex!: number;

  @ApiProperty({ enum: RoadmapNodeKindEnum, enumName: 'RoadmapNodeKind' })
  @IsEnum(RoadmapNodeKindEnum)
  kind!: RoadmapNodeKindEnum;

  @ApiPropertyOptional({ description: 'COURSE: catalog course id' })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  courseId?: number;

  @ApiPropertyOptional({ description: 'ELECTIVE_SLOT: label, e.g. "Elective CS1"', maxLength: EntityConstant.ShortString })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.ShortString)
  slotLabel?: string;

  @ApiPropertyOptional({ description: 'ELECTIVE_SLOT: theory credits' })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  slotTheoryCredits?: number;

  @ApiPropertyOptional({ description: 'ELECTIVE_SLOT: lab credits' })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  slotLabCredits?: number;

  @ApiPropertyOptional({
    description: 'Slot: accepted group (empty = free elective). Pool course: its group.',
    maxLength: EntityConstant.ElectiveGroup,
  })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.ElectiveGroup)
  electiveGroup?: string;

  @ApiPropertyOptional({ description: '(Could) conditional branch group', maxLength: EntityConstant.ElectiveGroup })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.ElectiveGroup)
  choiceGroup?: string;

  @ApiPropertyOptional({ description: '(Could) branch condition, e.g. "CUM_GPA100>=70"', maxLength: EntityConstant.ElectiveGroup })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.ElectiveGroup)
  condition?: string;
}
