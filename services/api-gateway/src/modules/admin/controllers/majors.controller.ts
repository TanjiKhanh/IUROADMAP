import {
  Body,
  Controller,
  Get,
  NotFoundException,
  NotImplementedException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { RoleGuard } from '../../../common/guards/role.guard';
import { AdminServiceClient } from '../clients/admin-service.client';
import { MajorResponseDto, UpdateMajorMetaPayload } from '../dtos/major.dto';


@Controller('api/v1/admin/majors')
@UseGuards(JwtGuard, RoleGuard)
export class MajorsController {
  constructor(private readonly adminClient: AdminServiceClient) {}

  @Get()
  @Roles('ADMIN')
  async listMajors(): Promise<MajorResponseDto[]> {
    return this.adminClient.getAllMajorRoadmaps();
  }

  @Get(':slug')
  @Roles('ADMIN')
  async getMajorBySlug(@Param('slug') slug: string): Promise<MajorResponseDto> {
    const majors = await this.adminClient.getAllMajorRoadmaps();
    const found = majors.find((major) => major.slug === slug);

    if (!found) {
      throw new NotFoundException(`Major with slug ${slug} not found`);
    }

    return found;
  }

  @Patch(':slug')
  @Roles('ADMIN')
  async updateMajor(
    @Param('slug') _slug: string,
    @Body() _payload: UpdateMajorMetaPayload,
  ): Promise<any> {
    return this.adminClient.updateMajorMeta(_slug, _payload);
  }
}
