import api from "./api";

export interface PublicCourse {
  id: number;
  title: string;
  slug: string;
}

export const publicService = {
    getJobCourses: async (departmentSlug: string): Promise<PublicCourse[]> => {
    // This calls the public endpoint (adjust path if your backend is different)
    return api.get(`/api/v1/public/courses?type=JOB&departmentSlug=${departmentSlug}`);
  }
}
