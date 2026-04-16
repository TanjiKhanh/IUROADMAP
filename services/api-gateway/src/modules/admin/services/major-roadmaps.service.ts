import { Injectable } from '@nestjs/common';
import { AdminServiceClient } from '../clients/admin-service.client';
import {
  AdminCourseNodeResponseDto,
  AdminPrerequisiteEdgeResponseDto,
  CreateCourseNodeDto,
  CreatePrerequisiteDto,
  UpdateCourseNodeDto,
} from '../dtos/major-roadmap-management.dto';
import { AdminRoadmapGraph } from '../../roadmaps/interfaces';

@Injectable()
export class AdminRoadmapsService {
  constructor(private readonly adminClient: AdminServiceClient) {}

  async getRoadmapGraph(roadmapId: number): Promise<AdminRoadmapGraph> {
    return this.adminClient.getAdminRoadmapGraph(roadmapId);
  }

  async createCourseNode(
    roadmapId: number,
    dto: CreateCourseNodeDto,
  ): Promise<AdminCourseNodeResponseDto> {
    return this.adminClient.createAdminCourseNode(roadmapId, dto);
  }

  async updateCourseNode(
    roadmapId: number,
    courseNodeId: number,
    dto: UpdateCourseNodeDto,
  ): Promise<AdminCourseNodeResponseDto> {
    return this.adminClient.updateAdminCourseNode(roadmapId, courseNodeId, dto);
  }

  async deleteCourseNode(roadmapId: number, courseNodeId: number): Promise<void> {
    return this.adminClient.deleteAdminCourseNode(roadmapId, courseNodeId);
  }

  async createPrerequisite(
    roadmapId: number,
    dto: CreatePrerequisiteDto,
  ): Promise<AdminPrerequisiteEdgeResponseDto> {
    return this.adminClient.createAdminPrerequisite(roadmapId, dto);
  }

  async deletePrerequisite(roadmapId: number, edgeId: number): Promise<void> {
    return this.adminClient.deleteAdminPrerequisite(roadmapId, edgeId);
  }


  async getAllMajorRoadmaps(): Promise<{ id: number; name: string }[]> {
    return this.adminClient.getAllMajorRoadmaps();
  }
}
