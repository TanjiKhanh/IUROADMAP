import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../../../common/api-paginated-response.decorator';
import { TopicsGraphResponse } from '../../course-offering/dto/course-topic';
import { ExploreCoursesService } from '../services/explore-courses.service';
import {
  CourseCurriculumUsageResponse,
  ExploreCourseCardResponse,
  ExploreCourseDetailResponse,
  ExploreCourseFilterRequest,
} from '../dto/explore-course';

/** Public Course Explorer (FL-LRN-11) and topics by academic year (FL-LRN-08). */
@ApiTags('Explore Courses')
@Controller({ path: 'explore/courses', version: '1' })
export class ExploreCoursesController {
  constructor(private readonly exploreService: ExploreCoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Search courses by department, major, academic year, lecturer, credits, project' })
  @ApiPaginatedResponse(ExploreCourseCardResponse)
  async list(@Query() filter: ExploreCourseFilterRequest) {
    return this.exploreService.list(filter);
  }

  @Get('academic-years')
  @ApiOperation({ summary: 'Academic years that have published course offerings' })
  @ApiResponse({ status: 200, type: [Number] })
  async academicYears(): Promise<number[]> {
    return this.exploreService.academicYears();
  }

  @Get(':courseId')
  @ApiOperation({ summary: 'Course page with the offering of an academic year' })
  @ApiParam({ name: 'courseId', type: Number })
  @ApiQuery({ name: 'academicYear', required: false, type: Number })
  @ApiResponse({ status: 200, type: ExploreCourseDetailResponse })
  async detail(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Query('academicYear') academicYear?: string,
  ): Promise<ExploreCourseDetailResponse> {
    return this.exploreService.detail(courseId, academicYear ? Number(academicYear) : undefined);
  }

  @Get(':courseId/curricula')
  @ApiOperation({ summary: 'Published curricula that contain the course, with the courses before and after it' })
  @ApiParam({ name: 'courseId', type: Number })
  @ApiResponse({ status: 200, type: [CourseCurriculumUsageResponse] })
  async curricula(@Param('courseId', ParseIntPipe) courseId: number): Promise<CourseCurriculumUsageResponse[]> {
    return this.exploreService.curricula(courseId);
  }

  @Get(':courseId/topics')
  @ApiOperation({ summary: 'Topics of the course for an academic year (nearest earlier year as fallback)' })
  @ApiParam({ name: 'courseId', type: Number })
  @ApiQuery({ name: 'academicYear', required: false, type: Number })
  @ApiResponse({ status: 200, type: TopicsGraphResponse })
  async topics(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Query('academicYear') academicYear?: string,
  ): Promise<TopicsGraphResponse> {
    return this.exploreService.topicsGraph(courseId, academicYear ? Number(academicYear) : undefined);
  }
}
