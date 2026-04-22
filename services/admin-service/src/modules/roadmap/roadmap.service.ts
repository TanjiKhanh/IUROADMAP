import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { RoadmapRepository } from './roadmap.repository';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';

@Injectable()
export class RoadmapService {
  constructor(private readonly repo: RoadmapRepository) {}

  private makeSlug(input: string) {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 100);
  }

  /**
   * Create master roadmap. Accepts nodes/edges or structure containing them.
   */
  async create(dto: CreateRoadmapDto) {
    const slug = dto.slug ? this.makeSlug(dto.slug) : this.makeSlug(dto.title);

    // check duplicate
    const exists = await this.repo.findOneBySlug(slug);
    if (exists) {
      throw new ConflictException(`Roadmap with slug '${slug}' already exists`);
    }

    // Validate structure if provided
    let nodes = dto.nodes;
    let edges = dto.edges;
    if (!nodes && dto.structure?.nodes) nodes = dto.structure.nodes;
    if (!edges && dto.structure?.edges) edges = dto.structure.edges;

    if (nodes && !Array.isArray(nodes)) {
      throw new BadRequestException('nodes must be an array');
    }
    if (edges && !Array.isArray(edges)) {
      throw new BadRequestException('edges must be an array');
    }

    // Prepare create DTO
    const createDto: CreateRoadmapDto = {
      ...dto,
      slug,
      nodes,
      edges,
      structure: dto.structure ?? (nodes || edges ? { nodes, edges } : undefined),
    };

    return this.repo.createWithNodesAndEdges(createDto);
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findOneBySlug(slug: string) {
    const roadmap = await this.repo.findBySlugWithNodesAndEdges(slug);
    if (!roadmap) throw new NotFoundException(`Roadmap with slug '${slug}' not found`);
    return roadmap;
  }

  async update(id: number, dto: UpdateRoadmapDto) {
    // 1. Check if Roadmap exists
    const existing = await this.repo.findOneById(id);
    if (!existing) throw new NotFoundException(`Roadmap with ID ${id} not found`);

    // 2. Prepare Basic Data (Title, Description, etc.)
    const data: any = {};
    if (dto.title !== undefined) data.title = dto.title;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.courseId !== undefined) data.courseId = dto.courseId;

    // 3. Handle Slug Updates (Uniqueness Check)
    if (dto.slug) {
      const s = this.makeSlug(dto.slug);
      if (s !== existing.slug) {
        const collision = await this.repo.findOneBySlug(s);
        if (collision) throw new ConflictException('Slug already in use');
        data.slug = s;
      }
    }

    // 4. Extract Nodes & Edges (Support both root-level and legacy 'structure')
    const nodes = dto.nodes ?? dto.structure?.nodes;
    const edges = dto.edges ?? dto.structure?.edges;

    // 5. If updating nodes/edges, sync the legacy 'structure' JSON column
    if (nodes || edges) {
      if (nodes && !Array.isArray(nodes)) throw new BadRequestException('nodes must be an array');
      if (edges && !Array.isArray(edges)) throw new BadRequestException('edges must be an array');

      // Update the legacy JSON field so it matches the relational tables
      data.structure = {
        nodes: nodes || existing.structure?.['nodes'] || [],
        edges: edges || existing.structure?.['edges'] || []
      };
    }

    // 6. Perform the Basic Update (Fields + Legacy JSON)
    await this.repo.updateBasic(id, data);

    // 7. Perform the Relational Update (The "Real" Data)
    if (nodes || edges) {
      await this.repo.replaceNodesAndEdges(id, nodes, edges);
    }

    // 🟢 8. FINAL RETURN: Re-fetch the fresh data
    // This ensures the response includes the newly created nodes/edges with their generated IDs.
    return this.repo.findOneById(id);
  }

  async findSummaryBySlug(slug: string) {
    return await this.repo.findSummaryBySlug(slug);
  }

  async remove(id: number) {
    const existing = await this.repo.findOneById(id);
    if (!existing) throw new NotFoundException(`Roadmap with ID ${id} not found`);
    return this.repo.remove(id);
  }
}