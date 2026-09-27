import { Module } from '@nestjs/common';
import { InternalUsersController } from './controllers/internal-users.controller';
import { UserDataService } from './services/user-data.service';

@Module({
  controllers: [InternalUsersController],
  providers: [UserDataService],
})
export class UserDataModule {}
