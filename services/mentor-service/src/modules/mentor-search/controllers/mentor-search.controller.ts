import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MentorSearchService } from '../services/mentor-search.service';
import { FilterMentorsDto } from '../dto/filter-mentors.dto';
import { MentorResponseDto } from '../../../common/dto/mentor-response.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Controller('mentors')
export class MentorSearchController {
  constructor(private readonly mentorSearchService: MentorSearchService) {}

  /**
   * Get all mentors with optional filtering and pagination
   * @example GET /mentors?industry=Tech&limit=10&offset=0
   */
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
   * @returns Statistics about mentors wrapped in standard response
   * @example GET /mentors/stats
   */
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    const stats = await this.mentorSearchService.getMentorStats();

    // ✅ Wrap the response in standard format
    return {
      data: stats,
      message: 'Mentor statistics retrieved successfully',
    };
  }
}