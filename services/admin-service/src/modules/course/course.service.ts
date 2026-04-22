import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DepartmentService } from '../department/department.service';

@Injectable()
export class CourseService {
  constructor(
    private readonly repository: CourseRepository,
    private readonly departmentService: DepartmentService, 
  ) {}

  private makeSlug(input: string) {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 100);
  }

  /**
   * Create course and save structure JSON safely.
   * - structure may be an object or a JSON string
   * - basic validation: if structure.nodes exists it must be an array; same for edges
   */
  async create(dto: CreateCourseDto) {
    // 1. Generate Slug if missing
    const slug = dto.slug ? this.makeSlug(dto.slug) : this.makeSlug(dto.title);

    // 2. Check for duplicate slug
    const existing = await this.repository.findOneBySlug(slug);
    if (existing) {
      throw new ConflictException(`Course with slug '${slug}' already exists`);
    }

    // 3. Validate Department existence (if departmentId is provided)
    if (dto.departmentId) {
      try {
        // departmentService.findOneById should throw NotFoundException if missing
        await this.departmentService.findOneById(dto.departmentId);
      } catch (error) {
        // Normalize error to BadRequest for the client
        throw new BadRequestException(`Department with ID ${dto.departmentId} does not exist`);
      }
    }

    // 4. Normalize and validate structure JSON
    let structure: any = undefined;
    if (dto.structure !== undefined && dto.structure !== null) {
      // If client sent a string, attempt to parse
      if (typeof dto.structure === 'string') {
        try {
          structure = JSON.parse(dto.structure);
        } catch (e) {
          throw new BadRequestException('Invalid JSON string in structure');
        }
      } else if (typeof dto.structure === 'object') {
        structure = dto.structure;
      } else {
        throw new BadRequestException('structure must be an object or a JSON string');
      }

      // Lightweight validation of expected shape (optional fields)
      if (structure.nodes !== undefined && !Array.isArray(structure.nodes)) {
        throw new BadRequestException('structure.nodes must be an array when provided');
      }
      if (structure.edges !== undefined && !Array.isArray(structure.edges)) {
        throw new BadRequestException('structure.edges must be an array when provided');
      }
      // You may add more validations here (e.g., node has nodeKey/title, coords shape)
    }

    // 5. Create
    const createInput: any = {
      title: dto.title,
      slug,
      description: dto.description ?? undefined,
      type: dto.type ?? 'JOB',
      structure: structure ?? undefined,
      // Connect relationship if ID exists
      department: dto.departmentId ? { connect: { id: dto.departmentId } } : undefined,
    };

    return this.repository.create(createInput);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(slug: string) {
    const course = await this.repository.findOneBySlug(slug);
    if (!course) {
      throw new NotFoundException(`Course with slug '${slug}' not found`);
    }
    return course;
  }

  async update(id: number, dto: UpdateCourseDto) {
    const existing = await this.repository.findOneById(id);
    if (!existing) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    // If updating department, validate it exists
    if (dto.departmentId) {
       try {
         await this.departmentService.findOneById(dto.departmentId);
       } catch {
         throw new BadRequestException(`Department with ID ${dto.departmentId} does not exist`);
       }
    }

    // Normalize structure on update if provided
    let structure: any = undefined;
    if (dto.structure !== undefined) {
      if (typeof dto.structure === 'string') {
        try {
          structure = JSON.parse(dto.structure);
        } catch (e) {
          throw new BadRequestException('Invalid JSON string in structure');
        }
      } else if (typeof dto.structure === 'object') {
        structure = dto.structure;
      } else {
        throw new BadRequestException('structure must be an object or a JSON string');
      }

      if (structure.nodes !== undefined && !Array.isArray(structure.nodes)) {
        throw new BadRequestException('structure.nodes must be an array when provided');
      }
      if (structure.edges !== undefined && !Array.isArray(structure.edges)) {
        throw new BadRequestException('structure.edges must be an array when provided');
      }
    }

    const updateInput: any = {
      ...dto,
      structure: dto.structure !== undefined ? structure : undefined,
      department: dto.departmentId ? { connect: { id: dto.departmentId } } : undefined,
    };

    // Remove id/slug if present in dto to avoid Prisma errors
    delete updateInput.id;

    return this.repository.update(id, updateInput);
  }

  async remove(id: number) {
    const existing = await this.repository.findOneById(id);
    if (!existing) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return this.repository.remove(id);
  }



  //Get courses by department slug and type
  async getCourses(departmentSlug: string , type: string) {
    // 1. Find department by slug
    const department = await this.departmentService.findOne(departmentSlug);
    if (!department) {
      throw new NotFoundException(`Department with slug '${departmentSlug}' not found`);
    }
    // 2. Find courses with type 'JOB' under that department
    return this.repository.findCoursesByDepartmentIdAndType(department.id, type);
  }
}