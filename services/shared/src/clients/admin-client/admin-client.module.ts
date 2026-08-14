import { Global, Module } from '@nestjs/common';
import { AdminClientService } from './admin-client.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  providers: [AdminClientService],
  exports: [AdminClientService],
})
export class AdminClientModule {}
