import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserResponse } from './user.response';

export class RoleSimpleResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}

export class UserDetailResponse extends UserResponse {
  @ApiPropertyOptional({ description: 'Assigned Role', type: RoleSimpleResponse })
  role?: RoleSimpleResponse;
}
