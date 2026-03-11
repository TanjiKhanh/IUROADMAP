import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { MentorSearchService } from '../services/mentor-search.service';
import { FilterMentorsDto } from '../dto/filter-mentors.dto';
import { MentorResponseDto } from '../../../common/dto/mentor-response.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('mentors')
export class MentorSearchController {
  constructor(private readonly mentorSearchService: MentorSearchService) {}

  /**
   * Get all mentors with optional filtering and pagination
   * @param filters - Filter criteria (skills, industry, search, limit, offset, sortBy, order)
   * @returns Paginated list of mentors
   * @example GET /mentors?industry=Tech&skills=Node.js&limit=10&offset=0
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    filters: FilterMentorsDto,
  ): Promise<PaginatedResponseDto<MentorResponseDto>> {
    const result = await this.mentorSearchService.findAll(filters);

    return {
      data: result.data.map((mentor) => new MentorResponseDto(mentor)),
      meta: {
        ...result.meta,
        pages: Math.ceil(result.meta.total / result.meta.limit),
      },
      message: 'Mentors retrieved successfully',
    };
  }

  /**
   * Get mentor statistics
   * @returns Statistics about mentors (counts by industry, top skills, etc)
   * @example GET /mentors/stats
   */
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    return await this.mentorSearchService.getMentorStats();
  }
}