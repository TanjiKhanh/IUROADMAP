import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserClientService } from './user-client.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [UserClientService],
  exports: [UserClientService], 
})
export class UserClientModule {}