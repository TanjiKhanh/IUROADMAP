export class MajorCardDto {
  id: number;
  slug: string;
  name: string;
  description?: string;
  totalCreditsRequired: number;
  totalCourses: number;
  department: {
    id: number;
    slug: string;
    name: string;
  } | null;
}


export class DepartmentFilterDto {
  id: number;
  slug: string;
  name: string;
  description?: string;
}

export class ExploreMajorsResponseDto {
  departments: DepartmentFilterDto[];
  majors: MajorCardDto[];
}