import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { LecturerRoleEnum, TermInYearEnum } from '../../../../common/enums';

export class CourseOfferingLecturerRequest {
  @ApiProperty({ example: 3 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  lecturerId!: number;

  @ApiPropertyOptional({ enum: LecturerRoleEnum, enumName: 'LecturerRole', default: LecturerRoleEnum.LECTURER })
  @IsEnum(LecturerRoleEnum)
  @IsOptional()
  role?: LecturerRoleEnum;

  @ApiPropertyOptional({ enum: TermInYearEnum, enumName: 'TermInYear', description: 'Empty = the whole academic year' })
  @IsEnum(TermInYearEnum)
  @IsOptional()
  termInYear?: TermInYearEnum;
}
