import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { FilterMentorsDto } from '../dto/filter-mentors.dto';
import { MentorResponseDto } from '../../../common/dto/mentor-response.dto';

interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

@Injectable()
export class MentorSearchService {
  private readonly logger = new Logger(MentorSearchService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Find all mentors with optional filtering and pagination
   */
  async findAll(filters: FilterMentorsDto): Promise<PaginatedResult<any>> {
    this.logger.log('🔍 Finding all mentors with filters:', filters);

    const { industry, search, limit = 10, offset = 0, sortBy = 'createdAt', order = 'desc' } = filters;

    try {
      // Build dynamic where clause
      const where: any = {};

      // Filter by search text (bio and industry) )
      if (search) {
        where.OR = [
          {
            bio: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            industry: {
              contains: search,
              mode: 'insensitive',
            },
          }

        ];
      }


      // Get total count for pagination
      const total = await this.prisma.mentorProfile.count({ where });

      // Get paginated results
      const data = await this.prisma.mentorProfile.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: {
          [sortBy]: order.toLowerCase(),
        },
      });

      this.logger.log(`✅ Found ${data.length} mentors out of ${total}`);

      return {
        data,
        meta: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      };
    } catch (error) {
      this.logger.error('❌ Error finding mentors:', error.message);
      throw error;
    }
  }

  /**
   * Find mentors by specific skill
   * @deprecated Use findAll with skills query parameter instead
   */
  async findBySkill(skill: string, filters: FilterMentorsDto): Promise<PaginatedResult<any>> {
    this.logger.log(`🔍 Finding mentors with skill: ${skill}`);

    try {
      const { limit = 10, offset = 0, sortBy = 'createdAt', order = 'desc' } = filters;

      // Add skill to filters
      const where: any = {
        skills: {
          hasSome: [skill.trim()],
        },
      };

      // Add other filters if provided
      if (filters.industry) {
        where.industry = {
          contains: filters.industry,
          mode: 'insensitive',
        };
      }

      if (filters.search) {
        where.OR = [
          {
            bio: {
              contains: filters.search,
              mode: 'insensitive',
            },
          },
          {
            linkedinUrl: {
              contains: filters.search,
              mode: 'insensitive',
            },
          },
        ];
      }

      const total = await this.prisma.mentorProfile.count({ where });

      const data = await this.prisma.mentorProfile.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: {
          [sortBy]: order.toLowerCase(),
        },
      });

      this.logger.log(`✅ Found ${data.length} mentors with skill "${skill}"`);

      return {
        data,
        meta: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      };
    } catch (error) {
      this.logger.error(`❌ Error finding mentors by skill "${skill}":`, error.message);
      throw error;
    }
  }

  /**
   * Find mentors by industry
   * @deprecated Use findAll with industry query parameter instead
   */
  async findByIndustry(industry: string, filters: FilterMentorsDto): Promise<PaginatedResult<any>> {
    this.logger.log(`🔍 Finding mentors in industry: ${industry}`);

    try {
      const { limit = 10, offset = 0, sortBy = 'createdAt', order = 'desc' } = filters;

      // Add industry to filters
      const where: any = {
        industry: {
          contains: industry.trim(),
          mode: 'insensitive',
        },
      };

      // Add other filters if provided
      if (filters.skills) {
        const skillArray = filters.skills.split(',').map((s) => s.trim());
        where.skills = {
          hasSome: skillArray,
        };
      }

      if (filters.search) {
        where.OR = [
          {
            bio: {
              contains: filters.search,
              mode: 'insensitive',
            },
          },
          {
            linkedinUrl: {
              contains: filters.search,
              mode: 'insensitive',
            },
          },
        ];
      }

      const total = await this.prisma.mentorProfile.count({ where });

      const data = await this.prisma.mentorProfile.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: {
          [sortBy]: order.toLowerCase(),
        },
      });

      this.logger.log(`✅ Found ${data.length} mentors in industry "${industry}"`);

      return {
        data,
        meta: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      };
    } catch (error) {
      this.logger.error(`❌ Error finding mentors by industry "${industry}":`, error.message);
      throw error;
    }
  }

  /**
   * Get mentor statistics (counts by industry, top skills, etc)
   */
  async getMentorStats(): Promise<any> {
    this.logger.log('📊 Getting mentor statistics');

    try {
      // Total mentors count
      const totalMentors = await this.prisma.mentorProfile.count();

      // Count by industry
      const mentorsByIndustry = await this.prisma.mentorProfile.groupBy({
        by: ['industry'],
        _count: {
          userId: true,
        },
      });

      // Get all mentors to analyze skills
      const allMentors = await this.prisma.mentorProfile.findMany({
        select: { skills: true },
      });

      // Count skills frequency
      const skillFrequency: { [key: string]: number } = {};
      allMentors.forEach((mentor) => {
        if (mentor.skills && Array.isArray(mentor.skills)) {
          mentor.skills.forEach((skill: string) => {
            skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
          });
        }
      });

      // Get top 10 skills
      const topSkills = Object.entries(skillFrequency)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([skill, count]) => ({
          skill,
          count,
        }));

      const stats = {
        totalMentors,
        byIndustry: mentorsByIndustry.map((item) => ({
          industry: item.industry || 'Not specified',
          count: item._count.userId,
        })),
        topSkills,
        skillCount: Object.keys(skillFrequency).length,
      };

      this.logger.log('✅ Statistics retrieved successfully');
      return stats;
    } catch (error) {
      this.logger.error('❌ Error getting mentor statistics:', error.message);
      throw error;
    }
  }

  /**
   * Search mentors by multiple criteria
   * Helper method for complex queries
   */
  async searchMentors(searchQuery: string, filters: FilterMentorsDto): Promise<PaginatedResult<any>> {
    this.logger.log(`🔍 Searching mentors with query: "${searchQuery}"`);

    try {
      const { limit = 10, offset = 0 } = filters;

      const where: any = {
        OR: [
          {
            bio: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            linkedinUrl: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            skills: {
              hasSome: [searchQuery.trim()],
            },
          },
        ],
      };

      // Add additional filters
      if (filters.industry) {
        where.industry = {
          contains: filters.industry,
          mode: 'insensitive',
        };
      }

      const total = await this.prisma.mentorProfile.count({ where });

      const data = await this.prisma.mentorProfile.findMany({
        where,
        take: limit,
        skip: offset,
      });

      this.logger.log(`✅ Found ${data.length} mentors matching "${searchQuery}"`);

      return {
        data,
        meta: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      };
    } catch (error) {
      this.logger.error('❌ Error searching mentors:', error.message);
      throw error;
    }
  }

  /**
   * Get mentors by multiple skills (must have ALL skills)
   */
  async findByMultipleSkills(skills: string[], filters: FilterMentorsDto): Promise<PaginatedResult<any>> {
    this.logger.log(`🔍 Finding mentors with ALL skills: ${skills.join(', ')}`);

    try {
      const { limit = 10, offset = 0 } = filters;

      // Get all mentors first, then filter in-memory for "ALL skills" requirement
      const allMentors = await this.prisma.mentorProfile.findMany({
        where: {
          skills: {
            hasSome: skills,
          },
        },
      });

      // Filter mentors that have ALL the required skills
      const mentorsWithAllSkills = allMentors.filter((mentor) =>
        skills.every((skill) => mentor.skills?.includes(skill))
      );

      const total = mentorsWithAllSkills.length;
      const data = mentorsWithAllSkills.slice(offset, offset + limit);

      this.logger.log(`✅ Found ${data.length} mentors with ALL required skills`);

      return {
        data,
        meta: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      };
    } catch (error) {
      this.logger.error('❌ Error finding mentors by multiple skills:', error.message);
      throw error;
    }
  }
}