import { IsNotEmpty, IsString, IsOptional, MaxLength,  Min  } from 'class-validator';

export class MajorResponseDto {
   
  id: number;

  slug: string;

  name: string;
  
  description?: string;

  totalCreditsRequired: number;

  totalCourses: number;

}


export class UpdateMajorMetaPayload {

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @Min(100)
  totalCreditsRequired?: number;
}