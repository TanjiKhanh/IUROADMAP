import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles , Public } from '../../common/decorators/public.decorator';

@Controller('admin/roadmaps')
@UseGuards(AuthGuard, RolesGuard)
export class RoadmapController {
  constructor(private readonly roadmapsService: RoadmapService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() dto: CreateRoadmapDto) {
    return this.roadmapsService.create(dto);
  }

  @Get()
  findAll() {
    return this.roadmapsService.findAll();
  }

  @Public()
  @Get(':slug')
  // Allow public access to read a roadmap if you want; remove Roles decorator for public
  findOne(@Param('slug') slug: string) {
    return this.roadmapsService.findOneBySlug(slug);
  }

  @Public()
  @Get(':slug/summary')
  async findSummary(@Param('slug') slug: string) {
    const summary = await this.roadmapsService.findSummaryBySlug(slug);
    if (!summary) throw new NotFoundException();
    return summary;
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRoadmapDto) {
    return this.roadmapsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roadmapsService.remove(id);
  }
  
}