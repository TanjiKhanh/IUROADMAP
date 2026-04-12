import { IsInt, Min , IsNotEmpty , IsString} from 'class-validator';

export class EnrollRoadmapDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  roadmapId: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  totalCreditsRequired: number;
}