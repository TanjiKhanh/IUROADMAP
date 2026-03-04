import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MentorClientService } from './mentor-client.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [MentorClientService],
  exports: [MentorClientService], 
})
export class MentorClientModule {}