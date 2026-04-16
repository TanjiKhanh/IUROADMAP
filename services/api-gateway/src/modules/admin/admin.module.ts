import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DepartmentsController } from './controllers/departments.controller';
import { DepartmentsService } from './services/departments.service';
import { DepartmentAdminServiceClient } from './clients/admin-service.client';

@Module({
  imports: [HttpModule],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, DepartmentAdminServiceClient],
  exports: [DepartmentsService],
})
export class AdminModule {}