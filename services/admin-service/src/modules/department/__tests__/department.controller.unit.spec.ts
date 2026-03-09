import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentController } from '../department.controller';
import { DepartmentService } from '../department.service';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';

describe('DepartmentController (Unit Tests)', () => {
  let controller: DepartmentController;
  let service: DepartmentService;

  // Mock data
  const mockDepartment = {
    id: 1,
    name: 'Engineering',
    slug: 'engineering',
    description: 'Engineering department',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockDepartments = [mockDepartment];

  // Mock service
  const mockDepartmentService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [
        {
          provide: DepartmentService,
          useValue: mockDepartmentService
        }
      ]
    }).compile();

    controller = module.get<DepartmentController>(DepartmentController);
    service = module.get<DepartmentService>(DepartmentService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a department with valid data', async () => {
      // Arrange
      const createDepartmentDto: CreateDepartmentDto = {
        name: 'Sales',
        slug: 'sales',
        description: 'Sales department'
      };

      mockDepartmentService.create.mockResolvedValue({
        ...mockDepartment,
        ...createDepartmentDto,
        id: 2
      });

      // Act
      const result = await controller.create(createDepartmentDto);

      // Assert
      expect(result.name).toBe('Sales');
      expect(service.create).toHaveBeenCalledWith(createDepartmentDto);
    });

    it('should return created department with id', async () => {
      // Arrange
      const createDepartmentDto: CreateDepartmentDto = {
        name: 'Marketing',
        slug: 'marketing',
        description: 'Marketing department'
      };

      const createdDepartment = {
        ...mockDepartment,
        ...createDepartmentDto,
        id: 3
      };

      mockDepartmentService.create.mockResolvedValue(createdDepartment);

      // Act
      const result = await controller.create(createDepartmentDto);

      // Assert
      expect(result.id).toBe(3);
      expect(result).toHaveProperty('createdAt');
    });

    it('should call service with correct DTO', async () => {
      // Arrange
      const createDepartmentDto: CreateDepartmentDto = {
        name: 'HR',
        slug: 'hr',
        description: 'Human Resources'
      };

      mockDepartmentService.create.mockResolvedValue(mockDepartment);

      // Act
      await controller.create(createDepartmentDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'HR',
          slug: 'hr'
        })
      );
    });
  });

  describe('findAll', () => {
    it('should return all departments', async () => {
      // Arrange
      mockDepartmentService.findAll.mockResolvedValue(mockDepartments);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(mockDepartments);
      expect(result.length).toBe(1);
    });

    it('should return empty array when no departments exist', async () => {
      // Arrange
      mockDepartmentService.findAll.mockResolvedValue([]);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual([]);
    });

    it('should call service once', async () => {
      // Arrange
      mockDepartmentService.findAll.mockResolvedValue(mockDepartments);

      // Act
      await controller.findAll();

      // Assert
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a department by slug', async () => {
      // Arrange
      const slug = 'engineering';
      mockDepartmentService.findOne.mockResolvedValue(mockDepartment);

      // Act
      const result = await controller.findOne(slug);

      // Assert
      expect(result).toEqual(mockDepartment);
      expect(service.findOne).toHaveBeenCalledWith(slug);
    });

    it('should return null when department not found', async () => {
      // Arrange
      const slug = 'non-existent';
      mockDepartmentService.findOne.mockResolvedValue(null);

      // Act
      const result = await controller.findOne(slug);

      // Assert
      expect(result).toBeNull();
    });

    it('should pass slug to service', async () => {
      // Arrange
      const slug = 'finance';
      mockDepartmentService.findOne.mockResolvedValue(mockDepartment);

      // Act
      await controller.findOne(slug);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(slug);
    });
  });

  describe('update', () => {
    it('should update a department', async () => {
      // Arrange
      const id = 1;
      const updateDepartmentDto: UpdateDepartmentDto = {
        name: 'Engineering & Design'
      };

      const updatedDepartment = {
        ...mockDepartment,
        ...updateDepartmentDto
      };

      mockDepartmentService.update.mockResolvedValue(updatedDepartment);

      // Act
      const result = await controller.update(id, updateDepartmentDto);

      // Assert
      expect(result.name).toBe('Engineering & Design');
      expect(service.update).toHaveBeenCalledWith(id, updateDepartmentDto);
    });

    it('should handle partial updates', async () => {
      // Arrange
      const id = 1;
      const updateDepartmentDto: UpdateDepartmentDto = {
        description: 'Updated description'
      };

      mockDepartmentService.update.mockResolvedValue(mockDepartment);

      // Act
      await controller.update(id, updateDepartmentDto);

      // Assert
      expect(service.update).toHaveBeenCalledWith(id, updateDepartmentDto);
    });

    it('should return updated department', async () => {
      // Arrange
      const id = 1;
      const updateDepartmentDto: UpdateDepartmentDto = {
        name: 'New Name'
      };

      const updatedDepartment = {
        ...mockDepartment,
        name: 'New Name'
      };

      mockDepartmentService.update.mockResolvedValue(updatedDepartment);

      // Act
      const result = await controller.update(id, updateDepartmentDto);

      // Assert
      expect(result.name).toBe('New Name');
    });
  });

  describe('remove', () => {
    it('should remove a department by id', async () => {
      // Arrange
      const id = 1;
      mockDepartmentService.remove.mockResolvedValue(mockDepartment);

      // Act
      const result = await controller.remove(id);

      // Assert
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result.id).toBe(mockDepartment.id);
    });

    it('should call service with correct id', async () => {
      // Arrange
      const id = 5;
      mockDepartmentService.remove.mockResolvedValue({});

      // Act
      await controller.remove(id);

      // Assert
      expect(service.remove).toHaveBeenCalledWith(5);
    });

    it('should throw error when removing non-existent department', async () => {
      // Arrange
      const id = 999;
      mockDepartmentService.remove.mockRejectedValue(
        new Error('Department not found')
      );

      // Act & Assert
      await expect(controller.remove(id)).rejects.toThrow('Department not found');
    });
  });

  describe('Controller instantiation', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should have DepartmentService injected', () => {
      expect(service).toBeDefined();
    });

    it('should have all required methods', () => {
      expect(controller.create).toBeDefined();
      expect(controller.findAll).toBeDefined();
      expect(controller.findOne).toBeDefined();
      expect(controller.update).toBeDefined();
      expect(controller.remove).toBeDefined();
    });
  });
});