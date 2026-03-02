export class MentorProfileResponseDto {
  userId!: number;
  bio?: any;
  cvUrl?: string;
  linkedinUrl?: string;
  industry?: string;
  skills: string[];
  createdAt!: Date;
  updatedAt!: Date;
}