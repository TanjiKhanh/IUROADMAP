import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { RoadmapController } from '../roadmap.controller';
import { RoadmapService } from '../roadmap.service';
import { CreateRoadmapDto } from '../dto/create-roadmap.dto';
import { UpdateRoadmapDto } from '../dto/update-roadmap.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';

describe('RoadmapController (Unit Tests)', () => {
  let controller: RoadmapController;
  let service: RoadmapService;

  // Mock data
  const mockRoadmap = {
    id: 1,
    title: 'React Developer Roadmap',
    slug: 'react-developer-roadmap',
    description: 'Learn React from basics to advanced',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockRoadmapSummary = {
    id: 1,
    title: 'React Developer Roadmap',
    slug: 'react-developer-roadmap',
    version: '2024-01-01T12:00:00.000Z',
    totalNodes: 25
  };

  const mockRoadmaps = [mockRoadmap];

  // Mock service
  const mockRoadmapService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneBySlug: jest.fn(),
    findSummaryBySlug: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoadmapController],
      providers: [
        {
          provide: RoadmapService,
          useValue: mockRoadmapService
        }
      ]
    })
      .overrideGuard(AuthGuard)
      .useValue({})
      .overrideGuard(RolesGuard)
      .useValue({})
      .compile();

    controller = module.get<RoadmapController>(RoadmapController);
    service = module.get<RoadmapService>(RoadmapService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a roadmap with valid data', async () => {
      // Arrange
      const createRoadmapDto: CreateRoadmapDto = {
        title: 'Vue.js Roadmap',
        slug: 'vue-roadmap',
        description: 'Learn Vue.js'
      };

      const createdRoadmap = {
        ...mockRoadmap,
        ...createRoadmapDto,
        id: 2
      };

      mockRoadmapService.create.mockResolvedValue(createdRoadmap);

      // Act
      const result = await controller.create(createRoadmapDto);

      // Assert
      expect(result.title).toBe('Vue.js Roadmap');
      expect(service.create).toHaveBeenCalledWith(createRoadmapDto);
    });

    it('should return created roadmap with id', async () => {
      // Arrange
      const createRoadmapDto: CreateRoadmapDto = {
        title: 'Angular Roadmap',
        slug: 'angular-roadmap',
        description: 'Learn Angular'
      };

      const createdRoadmap = {
        ...mockRoadmap,
        ...createRoadmapDto,
        id: 3
      };

      mockRoadmapService.create.mockResolvedValue(createdRoadmap);

      // Act
      const result = await controller.create(createRoadmapDto);

      // Assert
      expect(result.id).toBe(3);
      expect(result).toHaveProperty('createdAt');
    });

    it('should call service with correct DTO', async () => {
      // Arrange
      const createRoadmapDto: CreateRoadmapDto = {
        title: 'Node.js Roadmap',
        slug: 'nodejs-roadmap',
        description: 'Learn Node.js'
      };

      mockRoadmapService.create.mockResolvedValue(mockRoadmap);

      // Act
      await controller.create(createRoadmapDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Node.js Roadmap',
          slug: 'nodejs-roadmap'
        })
      );
    });
  });

  describe('findAll', () => {
    it('should return all roadmaps', async () => {
      // Arrange
      mockRoadmapService.findAll.mockResolvedValue(mockRoadmaps);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(mockRoadmaps);
      expect(result.length).toBe(1);
    });

    it('should return empty array when no roadmaps exist', async () => {
      // Arrange
      mockRoadmapService.findAll.mockResolvedValue([]);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual([]);
    });

    it('should call service once', async () => {
      // Arrange
      mockRoadmapService.findAll.mockResolvedValue(mockRoadmaps);

      // Act
      await controller.findAll();

      // Assert
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return roadmaps with all properties', async () => {
      // Arrange
      mockRoadmapService.findAll.mockResolvedValue(mockRoadmaps);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('slug');
    });
  });

  describe('findOne', () => {
    it('should return a roadmap by slug', async () => {
      // Arrange
      const slug = 'react-developer-roadmap';
      mockRoadmapService.findOneBySlug.mockResolvedValue(mockRoadmap);

      // Act
      const result = await controller.findOne(slug);

      // Assert
      expect(result).toEqual(mockRoadmap);
      expect(service.findOneBySlug).toHaveBeenCalledWith(slug);
    });

    it('should return roadmap for valid slug', async () => {
      // Arrange
      const slug = 'fullstack-developer';
      const fullstackRoadmap = {
        ...mockRoadmap,
        slug: 'fullstack-developer'
      };

      mockRoadmapService.findOneBySlug.mockResolvedValue(fullstackRoadmap);

      // Act
      const result = await controller.findOne(slug);

      // Assert
      expect(result.slug).toBe('fullstack-developer');
    });

    it('should return null when roadmap not found', async () => {
      // Arrange
      const slug = 'non-existent-roadmap';
      mockRoadmapService.findOneBySlug.mockResolvedValue(null);

      // Act
      const result = await controller.findOne(slug);

      // Assert
      expect(result).toBeNull();
    });

    it('should pass slug to service', async () => {
      // Arrange
      const slug = 'python-developer';
      mockRoadmapService.findOneBySlug.mockResolvedValue(mockRoadmap);

      // Act
      await controller.findOne(slug);

      // Assert
      expect(service.findOneBySlug).toHaveBeenCalledWith(slug);
    });
  });

  describe('findSummary', () => {
    it('should return roadmap summary by slug', async () => {
      // Arrange
      const slug = 'react-developer-roadmap';
      mockRoadmapService.findSummaryBySlug.mockResolvedValue(mockRoadmapSummary);

      // Act
      const result = await controller.findSummary(slug);

      // Assert
      expect(result).toEqual(mockRoadmapSummary);
      expect(service.findSummaryBySlug).toHaveBeenCalledWith(slug);
    });

    it('should include node count and completion in summary', async () => {
      // Arrange
      const slug = 'react-developer-roadmap';
      const summaryWithNodes = {
        ...mockRoadmapSummary,
        totalNodes: 10
      };
      mockRoadmapService.findSummaryBySlug.mockResolvedValue(summaryWithNodes);

      // Act
      const result = await controller.findSummary(slug);

      // Assert
      expect(result).toHaveProperty('totalNodes');
      expect(result).toHaveProperty('version');
      expect(result.totalNodes).toBe(10);
      expect(result.version).toBeDefined();
    });

    it('should throw NotFoundException when summary not found', async () => {
      // Arrange
      const slug = 'non-existent-roadmap';
      mockRoadmapService.findSummaryBySlug.mockResolvedValue(null);

      // Act & Assert
      await expect(controller.findSummary(slug)).rejects.toThrow(
        NotFoundException
      );
    });

    it('should pass slug to service', async () => {
      // Arrange
      const slug = 'python-roadmap';
      mockRoadmapService.findSummaryBySlug.mockResolvedValue(mockRoadmapSummary);

      // Act
      await controller.findSummary(slug);

      // Assert
      expect(service.findSummaryBySlug).toHaveBeenCalledWith(slug);
    });

    it('should return summary with correct structure', async () => {
      // Arrange
      const slug = 'react-developer-roadmap';
      const summary = {
        id: 1,
        title: 'React Developer Roadmap',
        slug: 'react-developer-roadmap',
        version: '2024-01-01T12:00:00.000Z',
        totalNodes: 20
      };

      mockRoadmapService.findSummaryBySlug.mockResolvedValue(summary);

      // Act
      const result = await controller.findSummary(slug);

      // Assert
      expect(result.id).toBe(1);
      expect(result.title).toBe('React Developer Roadmap');
      expect(result.totalNodes).toBe(20);
      expect(result.version).toBe('2024-01-01T12:00:00.000Z');
    });
  });

  describe('update', () => {
    it('should update a roadmap with valid data', async () => {
      // Arrange
      const id = 1;
      const updateRoadmapDto: UpdateRoadmapDto = {
        title: 'React Developer Roadmap - Updated'
      };

      const updatedRoadmap = {
        ...mockRoadmap,
        ...updateRoadmapDto
      };

      mockRoadmapService.update.mockResolvedValue(updatedRoadmap);

      // Act
      const result = await controller.update(id, updateRoadmapDto);

      // Assert
      expect(result.title).toBe('React Developer Roadmap - Updated');
      expect(service.update).toHaveBeenCalledWith(id, updateRoadmapDto);
    });

    it('should handle partial updates', async () => {
      // Arrange
      const id = 1;
      const updateRoadmapDto: UpdateRoadmapDto = {
        description: 'Updated description only'
      };

      mockRoadmapService.update.mockResolvedValue(mockRoadmap);

      // Act
      await controller.update(id, updateRoadmapDto);

      // Assert
      expect(service.update).toHaveBeenCalledWith(id, updateRoadmapDto);
    });

    it('should return updated roadmap', async () => {
      // Arrange
      const id = 1;
      const updateRoadmapDto: UpdateRoadmapDto = {
        title: 'New Title'
      };

      const updatedRoadmap = {
        ...mockRoadmap,
        title: 'New Title'
      };

      mockRoadmapService.update.mockResolvedValue(updatedRoadmap);

      // Act
      const result = await controller.update(id, updateRoadmapDto);

      // Assert
      expect(result.title).toBe('New Title');
    });

    it('should pass id as number to service', async () => {
      // Arrange
      const id = 5;
      const updateRoadmapDto: UpdateRoadmapDto = {
        title: 'Updated'
      };

      mockRoadmapService.update.mockResolvedValue(mockRoadmap);

      // Act
      await controller.update(id, updateRoadmapDto);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        5,
        expect.objectContaining({
          title: 'Updated'
        })
      );
    });
  });

  describe('remove', () => {
    it('should remove a roadmap by id', async () => {
      // Arrange
      const id = 1;
      const deletedRoadmap = {
        ...mockRoadmap,
        id
      };
      mockRoadmapService.remove.mockResolvedValue(deletedRoadmap);

      // Act
      const result = await controller.remove(id);

      // Assert
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result.id).toBe(id);
    });

    it('should call service with correct id', async () => {
      // Arrange
      const id = 5;
      mockRoadmapService.remove.mockResolvedValue({});

      // Act
      await controller.remove(id);

      // Assert
      expect(service.remove).toHaveBeenCalledWith(5);
    });

    it('should handle removal of non-existent roadmap', async () => {
      // Arrange
      const id = 999;
      mockRoadmapService.remove.mockRejectedValue(
        new Error('Roadmap not found')
      );

      // Act & Assert
      await expect(controller.remove(id)).rejects.toThrow('Roadmap not found');
    });

    it('should pass numeric id to service', async () => {
      // Arrange
      const id = 42;
      mockRoadmapService.remove.mockResolvedValue({});

      // Act
      await controller.remove(id);

      // Assert
      expect(service.remove).toHaveBeenCalledWith(42);
      expect(typeof (service.remove as jest.Mock).mock.calls[0][0]).toBe(
        'number'
      );
    });
  });

  describe('Controller instantiation', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should have RoadmapService injected', () => {
      expect(service).toBeDefined();
    });

    it('should have all required methods', () => {
      expect(controller.create).toBeDefined();
      expect(controller.findAll).toBeDefined();
      expect(controller.findOne).toBeDefined();
      expect(controller.findSummary).toBeDefined();
      expect(controller.update).toBeDefined();
      expect(controller.remove).toBeDefined();
    });

    it('should have guards applied', () => {
      const metadata = Reflect.getMetadata('__guards__', RoadmapController);
      expect(metadata).toBeDefined();
    });
  });

  describe('Public routes', () => {
    it('should have findOne marked as public', () => {
      // Check if @Public() decorator is applied to findOne
      const isPublic = Reflect.getMetadata('isPublic', controller.findOne);
      expect(isPublic).toBeTruthy();
    });

    it('should have findSummary marked as public', () => {
      // Check if @Public() decorator is applied to findSummary
      const isPublic = Reflect.getMetadata('isPublic', controller.findSummary);
      expect(isPublic).toBeTruthy();
    });
  });
});