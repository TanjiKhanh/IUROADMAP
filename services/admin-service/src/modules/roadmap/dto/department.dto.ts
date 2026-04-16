// admin-service/src/management/dto/department.dto.ts
export class DepartmentDto {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
}

// admin-service/src/management/dto/major.dto.ts
export class MajorDto {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  totalCreditsRequired: number;
  totalCourses: number;
  department: {
    id: number;
    slug: string;
    name: string;
  } | null;
}

