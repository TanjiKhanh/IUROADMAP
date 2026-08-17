import { Injectable, BadRequestException } from '@nestjs/common';
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
    // Validate prerequisites if provided
    if (dto.Prerequisites && dto.Prerequisites.length > 0) {
      // Extract prerequisites before sending to admin service
      const prerequisites = dto.Prerequisites;
      const { Prerequisites, ...courseNodePayload } = dto;

      // Create the course node first
      const createdNode = await this.adminClient.createAdminCourseNode(roadmapId, courseNodePayload);

      // Then create prerequisite relationships
      try {
        for (const prerequisiteId of prerequisites) {
          try {
            await this.adminClient.createAdminPrerequisite(roadmapId, {
              course_node_id: createdNode.id,
              prerequisite_node_id: prerequisiteId,
            });
          } catch (error: any) {
            // Skip if prerequisite already exists
            if (error?.response?.data?.message?.includes('already exists')) {
              console.warn(`Prerequisite ${prerequisiteId} already exists, skipping`);
              continue;
            }
            // Re-throw other errors
            throw error;
          }
        }
      } catch (error) {
        // Log error but don't fail - node is already created
        console.error('Failed to create some prerequisite relationships:', error);
      }

      return createdNode;
    }

    return this.adminClient.createAdminCourseNode(roadmapId, dto);
  }

  async updateCourseNode(
    roadmapId: number,
    courseNodeId: number,
    dto: UpdateCourseNodeDto,
  ): Promise<AdminCourseNodeResponseDto> {
    // Validate: course cannot be its own prerequisite
    if (dto.Prerequisites && dto.Prerequisites.includes(courseNodeId)) {
      throw new BadRequestException('A course cannot be its own prerequisite');
    }

    // Extract prerequisites before sending to admin service
    if (dto.Prerequisites !== undefined) {
      const prerequisites = dto.Prerequisites || [];
      const { Prerequisites, ...courseNodePayload } = dto;

      // Update the course node first
      const updatedNode = await this.adminClient.updateAdminCourseNode(
        roadmapId,
        courseNodeId,
        courseNodePayload,
      );

      // Get current graph to determine which prerequisites to add/remove
      try {
        const graph = await this.adminClient.getAdminRoadmapGraph(roadmapId);
        const currentEdges = graph.edges.filter((edge) => edge.from === courseNodeId);
        const currentPrerequisites = currentEdges.map((edge) => edge.to);

        // Find prerequisites to add and remove
        const toAdd = prerequisites.filter((id) => !currentPrerequisites.includes(id));
        const toRemove = currentPrerequisites.filter((id) => !prerequisites.includes(id));

        // Add new prerequisites
        for (const prerequisiteId of toAdd) {
          try {
            await this.adminClient.createAdminPrerequisite(roadmapId, {
              course_node_id: courseNodeId,
              prerequisite_node_id: prerequisiteId,
            });
          } catch (error: any) {
            // Skip if prerequisite already exists
            if (error?.response?.data?.message?.includes('already exists')) {
              console.warn(`Prerequisite ${prerequisiteId} already exists for course ${courseNodeId}, skipping`);
              continue;
            }
            // Re-throw other errors
            throw error;
          }
        }

        // Remove old prerequisites
        for (const prerequisiteId of toRemove) {
          const edgeToDelete = currentEdges.find((edge) => edge.to === prerequisiteId);
          if (edgeToDelete) {
            await this.adminClient.deleteAdminPrerequisite(roadmapId, edgeToDelete.id);
          }
        }
      } catch (error) {
        // Log error but don't fail - node is already updated
        console.error('Failed to update prerequisite relationships:', error);
      }

      return updatedNode;
    }

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
