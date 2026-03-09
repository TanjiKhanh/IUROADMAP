import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { CourseController } from '../course.controller';
import { CourseService } from '../course.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CourseType } from '../dto/course-type.enum';

describe('CourseController (Unit Tests)', () => {
  let controller: CourseController;
  let service: CourseService;

  // Mock data
  const mockCourse = {
    id: 1,
    title: 'JavaScript Basics',
    slug: 'javascript-basics',
    description: 'Learn JavaScript fundamentals',
    type: CourseType.BASIC,
    departmentId: 1,
    structure: { modules: ['Module 1', 'Module 2'] },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockCourses = [mockCourse];

  // Mock service
  const mockCourseService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        {
          provide: CourseService,
          useValue: mockCourseService
        }
      ]
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  // ============================================
  // CREATE Tests
  // ============================================
  describe('create', () => {
    it('should create a course with valid data', async () => {
      // Arrange
      const createCourseDto: CreateCourseDto = {
        title: 'JavaScript Basics',
        slug: 'javascript-basics',
        description: 'Learn JavaScript fundamentals',
        type: CourseType.BASIC,
        departmentId: 1,
        structure: { modules: ['Module 1', 'Module 2'] }
      };

      mockCourseService.create.mockResolvedValue(mockCourse);

      // Act
      const result = await controller.create(createCourseDto);

      // Assert
      expect(result).toEqual(mockCourse);
      expect(service.create).toHaveBeenCalledWith(createCourseDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should return created course with id', async () => {
      // Arrange
      const createCourseDto: CreateCourseDto = {
        title: 'React Advanced',
        slug: 'react-advanced',
        description: 'Advanced React patterns',
        type: CourseType.JOB,
        departmentId: 2
      };

      const createdCourse = {
        ...mockCourse,
        ...createCourseDto,
        id: 2
      };

      mockCourseService.create.mockResolvedValue(createdCourse);

      // Act
      const result = await controller.create(createCourseDto);

      // Assert
      expect(result.id).toBeDefined();
      expect(result.title).toBe(createCourseDto.title);
      expect(result.slug).toBe(createCourseDto.slug);
      expect(result.type).toBe(CourseType.JOB);
    });

    it('should create course with only required fields', async () => {
      // Arrange - Only title and type are required
      const createCourseDto: CreateCourseDto = {
        title: 'Node.js',
        type: CourseType.BASIC
        // Optional fields omitted
      };

      mockCourseService.create.mockResolvedValue({
        ...mockCourse,
        ...createCourseDto
      });

      // Act
      const result = await controller.create(createCourseDto);

      // Assert
      expect(result.title).toBe('Node.js');
      expect(result.type).toBe(CourseType.BASIC);
      expect(service.create).toHaveBeenCalledWith(createCourseDto);
    });

    it('should call CourseService.create exactly once', async () => {
      // Arrange
      const createCourseDto: CreateCourseDto = {
        title: 'Node.js',
        type: CourseType.BASIC,
        description: 'Backend with Node',
        departmentId: 3
      };

      mockCourseService.create.mockResolvedValue(mockCourse);

      // Act
      await controller.create(createCourseDto);

      // Assert
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should pass correct DTO to service', async () => {
      // Arrange
      const createCourseDto: CreateCourseDto = {
        title: 'TypeScript',
        slug: 'typescript',
        description: 'Type-safe JavaScript',
        type: CourseType.BASIC,
        departmentId: 1
      };

      mockCourseService.create.mockResolvedValue(mockCourse);

      // Act
      await controller.create(createCourseDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'TypeScript',
          slug: 'typescript',
          type: CourseType.BASIC
        })
      );
    });

    it('should accept structure as JSON object', async () => {
      // Arrange
      const createCourseDto: CreateCourseDto = {
        title: 'Full Course',
        type: CourseType.JOB,
        structure: {
          modules: [
            { name: 'Module 1', lessons: 5 },
            { name: 'Module 2', lessons: 8 }
          ]
        }
      };

      mockCourseService.create.mockResolvedValue({
        ...mockCourse,
        ...createCourseDto
      });

      // Act
      const result = await controller.create(createCourseDto);

      // Assert
      expect(result.structure).toBeDefined();
      expect((result.structure as any).modules).toBeDefined();
      expect((result.structure as any).modules.length).toBe(2);
    });

    it('should accept optional slug field', async () => {
      // Arrange - Slug is optional
      const createCourseDto: CreateCourseDto = {
        title: 'Custom Slug Course',
        type: CourseType.BASIC
        // slug omitted - should be auto-generated
      };

      mockCourseService.create.mockResolvedValue({
        ...mockCourse,
        ...createCourseDto
      });

      // Act
      const result = await controller.create(createCourseDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Custom Slug Course',
          type: CourseType.BASIC
        })
      );
    });

    it('should handle all course types', async () => {
      // Arrange - Test both BASIC and JOB types
      const courseTypes = [CourseType.BASIC, CourseType.JOB];

      for (const type of courseTypes) {
        const createCourseDto: CreateCourseDto = {
          title: `Course ${type}`,
          type
        };

        mockCourseService.create.mockResolvedValue({
          ...mockCourse,
          ...createCourseDto,
          type
        });

        // Act
        const result = await controller.create(createCourseDto);

        // Assert
        expect(result.type).toBe(type);
      }
    });

    it('should create BASIC course type', async () => {
      // Arrange
      const createCourseDto: CreateCourseDto = {
        title: 'Beginner Course',
        type: CourseType.BASIC
      };

      mockCourseService.create.mockResolvedValue({
        ...mockCourse,
        ...createCourseDto,
        type: CourseType.BASIC
      });

      // Act
      const result = await controller.create(createCourseDto);

      // Assert
      expect(result.type).toBe(CourseType.BASIC);
    });

    it('should create JOB course type', async () => {
      // Arrange
      const createCourseDto: CreateCourseDto = {
        title: 'Job-Focused Course',
        type: CourseType.JOB
      };

      mockCourseService.create.mockResolvedValue({
        ...mockCourse,
        ...createCourseDto,
        type: CourseType.JOB
      });

      // Act
      const result = await controller.create(createCourseDto);

      // Assert
      expect(result.type).toBe(CourseType.JOB);
    });

    it('should accept departmentId as optional', async () => {
      // Arrange - departmentId is optional
      const createCourseDto: CreateCourseDto = {
        title: 'Independent Course',
        type: CourseType.BASIC
        // departmentId omitted
      };

      mockCourseService.create.mockResolvedValue(mockCourse);

      // Act
      await controller.create(createCourseDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.not.objectContaining({
          departmentId: expect.any(Number)
        })
      );
    });
  });

  // ============================================
  // READ ALL Tests
  // ============================================
  describe('findAll', () => {
    it('should return all courses', async () => {
      // Arrange
      mockCourseService.findAll.mockResolvedValue(mockCourses);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(mockCourses);
      expect(result.length).toBe(1);
    });

    it('should return empty array when no courses exist', async () => {
      // Arrange
      mockCourseService.findAll.mockResolvedValue([]);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    it('should call CourseService.findAll', async () => {
      // Arrange
      mockCourseService.findAll.mockResolvedValue(mockCourses);

      // Act
      await controller.findAll();

      // Assert
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return courses with all properties', async () => {
      // Arrange
      mockCourseService.findAll.mockResolvedValue(mockCourses);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('slug');
      expect(result[0]).toHaveProperty('description');
      expect(result[0]).toHaveProperty('type');
      expect(result[0]).toHaveProperty('departmentId');
      expect(result[0]).toHaveProperty('structure');
    });

    it('should return multiple courses', async () => {
      // Arrange
      const multipleCourses = [
        mockCourse,
        {
          ...mockCourse,
          id: 2,
          title: 'React Course',
          slug: 'react-course',
          type: CourseType.JOB
        },
        {
          ...mockCourse,
          id: 3,
          title: 'Node.js Course',
          slug: 'nodejs-course',
          type: CourseType.BASIC
        }
      ];

      mockCourseService.findAll.mockResolvedValue(multipleCourses);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result.length).toBe(3);
      expect(result[0].type).toBe(CourseType.BASIC);
      expect(result[1].type).toBe(CourseType.JOB);
      expect(result[2].type).toBe(CourseType.BASIC);
    });

    it('should return courses with different types', async () => {
      // Arrange
      const basicCourse = {
        ...mockCourse,
        id: 1,
        type: CourseType.BASIC
      };

      const jobCourse = {
        ...mockCourse,
        id: 2,
        type: CourseType.JOB
      };

      mockCourseService.findAll.mockResolvedValue([basicCourse, jobCourse]);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result.some(c => c.type === CourseType.BASIC)).toBe(true);
      expect(result.some(c => c.type === CourseType.JOB)).toBe(true);
    });
  });

  // ============================================
  // READ ONE Tests
  // ============================================
  describe('findOne', () => {
    it('should return a single course by slug', async () => {
      // Arrange
      const slug = 'javascript-basics';
      mockCourseService.findOne.mockResolvedValue(mockCourse);

      // Act
      const result = await controller.findOne(slug);

      // Assert
      expect(result).toEqual(mockCourse);
      expect(service.findOne).toHaveBeenCalledWith(slug);
    });

    it('should call service with correct slug', async () => {
      // Arrange
      const slug = 'react-advanced';
      mockCourseService.findOne.mockResolvedValue(mockCourse);

      // Act
      await controller.findOne(slug);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(slug);
    });

    it('should return null when course not found', async () => {
      // Arrange
      const slug = 'non-existent-course';
      mockCourseService.findOne.mockResolvedValue(null);

      // Act
      const result = await controller.findOne(slug);

      // Assert
      expect(result).toBeNull();
    });

    it('should handle slug with special characters', async () => {
      // Arrange
      const slug = 'c++-advanced-programming';
      mockCourseService.findOne.mockResolvedValue(mockCourse);

      // Act
      await controller.findOne(slug);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(slug);
    });

    it('should return course with complete structure', async () => {
      // Arrange
      const slug = 'javascript-basics';
      const courseWithStructure = {
        ...mockCourse,
        structure: {
          modules: [
            { name: 'Basics', lessons: 5 },
            { name: 'Advanced', lessons: 8 }
          ]
        }
      };

      mockCourseService.findOne.mockResolvedValue(courseWithStructure);

      // Act
      const result = await controller.findOne(slug);

      // Assert
      expect(result.structure).toBeDefined();
      expect((result.structure as any).modules).toHaveLength(2);
    });

    it('should return BASIC course type', async () => {
      // Arrange
      const slug = 'basic-course';
      const basicCourse = {
        ...mockCourse,
        type: CourseType.BASIC
      };

      mockCourseService.findOne.mockResolvedValue(basicCourse);

      // Act
      const result = await controller.findOne(slug);

      // Assert
      expect(result.type).toBe(CourseType.BASIC);
    });

    it('should return JOB course type', async () => {
      // Arrange
      const slug = 'job-course';
      const jobCourse = {
        ...mockCourse,
        type: CourseType.JOB
      };

      mockCourseService.findOne.mockResolvedValue(jobCourse);

      // Act
      const result = await controller.findOne(slug);

      // Assert
      expect(result.type).toBe(CourseType.JOB);
    });
  });

  // ============================================
  // UPDATE Tests
  // ============================================
  describe('update', () => {
    it('should update a course with valid data', async () => {
      // Arrange
      const id = 1;
      const updateCourseDto: UpdateCourseDto = {
        title: 'JavaScript Basics - Updated',
        type: CourseType.BASIC
      };

      const updatedCourse = {
        ...mockCourse,
        ...updateCourseDto
      };

      mockCourseService.update.mockResolvedValue(updatedCourse);

      // Act
      const result = await controller.update(id, updateCourseDto);

      // Assert
      expect(result).toEqual(updatedCourse);
      expect(service.update).toHaveBeenCalledWith(id, updateCourseDto);
    });

    it('should pass id and DTO to service', async () => {
      // Arrange
      const id = 5;
      const updateCourseDto: UpdateCourseDto = {
        description: 'Updated description'
      };

      mockCourseService.update.mockResolvedValue(mockCourse);

      // Act
      await controller.update(id, updateCourseDto);

      // Assert
      expect(service.update).toHaveBeenCalledWith(id, updateCourseDto);
    });

    it('should handle partial updates - title only', async () => {
      // Arrange
      const id = 1;
      const updateCourseDto: UpdateCourseDto = {
        title: 'New Title'
      };

      const updatedCourse = {
        ...mockCourse,
        title: 'New Title'
      };

      mockCourseService.update.mockResolvedValue(updatedCourse);

      // Act
      const result = await controller.update(id, updateCourseDto);

      // Assert
      expect(result.title).toBe('New Title');
      expect(service.update).toHaveBeenCalledWith(id, updateCourseDto);
    });

    it('should handle partial updates - type only', async () => {
      // Arrange
      const id = 1;
      const updateCourseDto: UpdateCourseDto = {
        type: CourseType.JOB
      };

      const updatedCourse = {
        ...mockCourse,
        type: CourseType.JOB
      };

      mockCourseService.update.mockResolvedValue(updatedCourse);

      // Act
      const result = await controller.update(id, updateCourseDto);

      // Assert
      expect(result.type).toBe(CourseType.JOB);
    });

    it('should handle partial updates - description only', async () => {
      // Arrange
      const id = 1;
      const updateCourseDto: UpdateCourseDto = {
        description: 'Updated description'
      };

      const updatedCourse = {
        ...mockCourse,
        description: 'Updated description'
      };

      mockCourseService.update.mockResolvedValue(updatedCourse);

      // Act
      const result = await controller.update(id, updateCourseDto);

      // Assert
      expect(result.description).toBe('Updated description');
    });

    it('should handle partial updates - departmentId only', async () => {
      // Arrange
      const id = 1;
      const updateCourseDto: UpdateCourseDto = {
        departmentId: 5
      };

      const updatedCourse = {
        ...mockCourse,
        departmentId: 5
      };

      mockCourseService.update.mockResolvedValue(updatedCourse);

      // Act
      const result = await controller.update(id, updateCourseDto);

      // Assert
      expect(result.departmentId).toBe(5);
    });

    it('should handle structure update', async () => {
      // Arrange
      const id = 1;
      const updateCourseDto: UpdateCourseDto = {
        structure: {
          modules: [
            { name: 'New Module 1', lessons: 10 },
            { name: 'New Module 2', lessons: 12 }
          ]
        }
      };

      const updatedCourse = {
        ...mockCourse,
        structure: updateCourseDto.structure
      };

      mockCourseService.update.mockResolvedValue(updatedCourse);

      // Act
      const result = await controller.update(id, updateCourseDto);

      // Assert
      expect(result.structure).toEqual(updateCourseDto.structure);
      expect((result.structure as any).modules.length).toBe(2);
    });

    it('should handle multiple field updates', async () => {
      // Arrange
      const id = 1;
      const updateCourseDto: UpdateCourseDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        type: CourseType.JOB,
        departmentId: 3
      };

      const updatedCourse = {
        ...mockCourse,
        ...updateCourseDto
      };

      mockCourseService.update.mockResolvedValue(updatedCourse);

      // Act
      const result = await controller.update(id, updateCourseDto);

      // Assert
      expect(result.title).toBe('Updated Title');
      expect(result.description).toBe('Updated Description');
      expect(result.type).toBe(CourseType.JOB);
      expect(result.departmentId).toBe(3);
    });

    it('should return updated course', async () => {
      // Arrange
      const id = 1;
      const updateCourseDto: UpdateCourseDto = {
        title: 'Completely New Title'
      };

      const updatedCourse = {
        ...mockCourse,
        title: 'Completely New Title'
      };

      mockCourseService.update.mockResolvedValue(updatedCourse);

      // Act
      const result = await controller.update(id, updateCourseDto);

      // Assert
      expect(result.title).toBe('Completely New Title');
      expect(result.id).toBe(1); // ID should not change
    });

    it('should update course type from BASIC to JOB', async () => {
      // Arrange
      const id = 1;
      const updateCourseDto: UpdateCourseDto = {
        type: CourseType.JOB
      };

      const updatedCourse = {
        ...mockCourse,
        type: CourseType.JOB
      };

      mockCourseService.update.mockResolvedValue(updatedCourse);

      // Act
      const result = await controller.update(id, updateCourseDto);

      // Assert
      expect(result.type).toBe(CourseType.JOB);
    });

    it('should update course type from JOB to BASIC', async () => {
      // Arrange
      const id = 1;
      const updateCourseDto: UpdateCourseDto = {
        type: CourseType.BASIC
      };

      const updatedCourse = {
        ...mockCourse,
        type: CourseType.BASIC
      };

      mockCourseService.update.mockResolvedValue(updatedCourse);

      // Act
      const result = await controller.update(id, updateCourseDto);

      // Assert
      expect(result.type).toBe(CourseType.BASIC);
    });
  });

  // ============================================
  // DELETE Tests
  // ============================================
  describe('remove', () => {
    it('should remove a course by id', async () => {
      // Arrange
      const id = 1;
      mockCourseService.remove.mockResolvedValue(mockCourse);

      // Act
      const result = await controller.remove(id);

      // Assert
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result.id).toBe(mockCourse.id);
    });

    it('should call service with correct id', async () => {
      // Arrange
      const id = 5;
      mockCourseService.remove.mockResolvedValue({});

      // Act
      await controller.remove(id);

      // Assert
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('should handle removal of non-existent course', async () => {
      // Arrange
      const id = 999;
      mockCourseService.remove.mockRejectedValue(
        new Error('Course not found')
      );

      // Act & Assert
      await expect(controller.remove(id)).rejects.toThrow('Course not found');
    });

    it('should pass numeric id to service', async () => {
      // Arrange
      const id = 42;
      mockCourseService.remove.mockResolvedValue({});

      // Act
      await controller.remove(id);

      // Assert
      expect(service.remove).toHaveBeenCalledWith(42);
      expect(typeof (service.remove as jest.Mock).mock.calls[0][0]).toBe(
        'number'
      );
    });

    it('should confirm successful deletion', async () => {
      // Arrange
      const id = 1;
      mockCourseService.remove.mockResolvedValue(mockCourse);

      // Act
      const result = await controller.remove(id);

      // Assert
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result.id).toBe(mockCourse.id);
    });
  });

  // ============================================
  // Controller Instantiation Tests
  // ============================================
  describe('Controller instantiation', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should have CourseService injected', () => {
      expect(service).toBeDefined();
    });

    it('should have all required methods', () => {
      expect(controller.create).toBeDefined();
      expect(controller.findAll).toBeDefined();
      expect(controller.findOne).toBeDefined();
      expect(controller.update).toBeDefined();
      expect(controller.remove).toBeDefined();
    });

    it('should all methods be functions', () => {
      expect(typeof controller.create).toBe('function');
      expect(typeof controller.findAll).toBe('function');
      expect(typeof controller.findOne).toBe('function');
      expect(typeof controller.update).toBe('function');
      expect(typeof controller.remove).toBe('function');
    });
  });

  // ============================================
  // Edge Cases & Validation Tests
  // ============================================
  describe('Edge cases', () => {
    it('should handle course with null description', async () => {
      // Arrange
      const createCourseDto: CreateCourseDto = {
        title: 'Course without description',
        type: CourseType.BASIC
        // description omitted (undefined)
      };

      mockCourseService.create.mockResolvedValue({
        ...mockCourse,
        ...createCourseDto,
        description: null
      });

      // Act
      const result = await controller.create(createCourseDto);

      // Assert
      expect(result.title).toBe('Course without description');
      expect(service.create).toHaveBeenCalled();
    });

    it('should handle course with empty structure', async () => {
      // Arrange
      const createCourseDto: CreateCourseDto = {
        title: 'Course',
        type: CourseType.BASIC,
        structure: {}
      };

      mockCourseService.create.mockResolvedValue({
        ...mockCourse,
        ...createCourseDto
      });

      // Act
      const result = await controller.create(createCourseDto);

      // Assert
      expect(result.structure).toBeDefined();
    });

    it('should handle very long course title', async () => {
      // Arrange
      const longTitle = 'A'.repeat(255);
      const createCourseDto: CreateCourseDto = {
        title: longTitle,
        type: CourseType.BASIC
      };

      mockCourseService.create.mockResolvedValue({
        ...mockCourse,
        title: longTitle
      });

      // Act
      const result = await controller.create(createCourseDto);

      // Assert
      expect(result.title.length).toBe(255);
    });

    it('should handle departmentId = 0', async () => {
      // Arrange
      const createCourseDto: CreateCourseDto = {
        title: 'Course',
        type: CourseType.BASIC,
        departmentId: 0
      };

      mockCourseService.create.mockResolvedValue({
        ...mockCourse,
        ...createCourseDto
      });

      // Act
      const result = await controller.create(createCourseDto);

      // Assert
      expect(result.departmentId).toBe(0);
    });

    it('should handle both course types in mixed operations', async () => {
      // Arrange
      const basicCourseDto: CreateCourseDto = {
        title: 'Basic Course',
        type: CourseType.BASIC
      };

      const jobCourseDto: CreateCourseDto = {
        title: 'Job Course',
        type: CourseType.JOB
      };

      mockCourseService.create.mockResolvedValueOnce({
        ...mockCourse,
        type: CourseType.BASIC
      });

      mockCourseService.create.mockResolvedValueOnce({
        ...mockCourse,
        type: CourseType.JOB
      });

      // Act
      const basicResult = await controller.create(basicCourseDto);
      const jobResult = await controller.create(jobCourseDto);

      // Assert
      expect(basicResult.type).toBe(CourseType.BASIC);
      expect(jobResult.type).toBe(CourseType.JOB);
    });
  });
});