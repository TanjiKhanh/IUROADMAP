import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role, AccountStatus } from '../generated/prisma-client';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'learner@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'STUDENT', enum: ['STUDENT', 'MENTOR', 'ADMIN'] })
  role: Role;

  @ApiProperty({ example: 'ACTIVE', enum: ['ACTIVE', 'PENDING', 'SUSPENDED'] })
  status: AccountStatus;

  @ApiProperty({ example: '2026-07-04T12:00:00.000Z' })
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