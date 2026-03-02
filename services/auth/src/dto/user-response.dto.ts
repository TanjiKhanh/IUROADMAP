import { Exclude } from 'class-transformer';
import { Role, AccountStatus } from '@prisma/client';

export class UserResponseDto {
  id: number;
  email: string;
  name: string;
  role: Role;
  status: AccountStatus;
  createdAt: Date;

  // 🛡️ SECURITY: These fields will be stripped out automatically
  @Exclude()
  password: string;

  @Exclude()
  resetPasswordToken: string;

  @Exclude()
  resetPasswordExpires: Date;

  // The constructor takes the raw database object and maps it to this class
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}