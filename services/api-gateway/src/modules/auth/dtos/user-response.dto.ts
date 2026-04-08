// src/modules/auth/dtos/user-response.dto.ts

export type Role = 'STUDENT' | 'MENTOR' | 'ADMIN'; // match your auth service enum
export type AccountStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED'; // match your enum

export class UserResponseDto {
  id: number;
  email: string;
  name: string;
  role: Role;
  status: AccountStatus;
  createdAt: Date;
}