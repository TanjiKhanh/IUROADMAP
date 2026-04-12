// roadmaps.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class MajorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findRoadmapById(roadmapId: number) {
    return await this.prisma.mAJOR_ROADMAPS.findUnique({
      where: { id: roadmapId },
    });
  }

  async findRoadmapBySlug(slug: string) {
    return await this.prisma.mAJOR_ROADMAPS.findUnique({
      where: { slug: slug },
    });
  }

 
}