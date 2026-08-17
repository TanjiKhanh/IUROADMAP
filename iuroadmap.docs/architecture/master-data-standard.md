# Master Data Architecture Standard

**Author:** Winston (System Architect)  
**Status:** Approved  
**Target Audience:** Backend Developers, API Consumers  

## 1. Context & Problem Statement
In enterprise applications, managing numerous "Master Data" entities (e.g., Equipment, Categories, Tags) often leads to significant boilerplate code. Developers tend to duplicate standard CRUD endpoints (`create`, `update`, `getById`, `ForDropdown`, `download`, `delete`, `GetByIndex`) for each entity, violating the DRY (Don't Repeat Yourself) principle and making the API contract inconsistent.

## 2. Proposed Architecture Pattern
We mandate a **Generic CRUD Controller / Service** pattern. All Master Data modules must inherit from a common base class. This ensures:
1. **100% API consistency** across all Master Data entities.
2. **Rapid development** (a new Master Data table can be fully exposed via API in minutes).
3. **Centralized maintenance** (Pagination, sorting, error handling, and validation are configured in one place).

### 2.1 The Standard 7 Endpoints
Every Master Data controller MUST expose exactly these 7 endpoints via inheritance:

- `POST /api/v{version}/{Entity}/create`: Creates a new record.
- `POST /api/v{version}/{Entity}/update`: Updates an existing record.
- `GET /api/v{version}/{Entity}/getById/{id}`: Retrieves full details of a specific record.
- `GET /api/v{version}/{Entity}/ForDropdown`: Retrieves a lightweight list optimized for UI dropdowns/select boxes.
- `POST /api/v{version}/{Entity}/delete/{id}`: Soft deletes or permanently deletes the record.
- `GET /api/v{version}/{Entity}/GetByIndex`: Retrieves a paginated list with dynamic filtering.

*(Note: Routing path `{Entity}` should be PascalCase, e.g., `/api/v1/Equipment/create`)*

---

## 3. Shared DTOs & Configuration

To standardize Request and Response payloads, we use Shared DTOs located in the `src/common/dtos/` directory.

### 3.1 Base Pagination Request (`GetByIndex`)
**File:** `src/common/dtos/base-pagination-request.dto.ts`  
All filter DTOs used in `GetByIndex` must extend this base class.

```typescript
export class BasePaginationRequestDto {
  page?: number = 1;
  pageSize?: number = 10;
  keyword?: string; // Global text search across string columns
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

**Implementation Example for an Entity:**
```typescript
// src/modules/equipment/dtos/equipment-filter.dto.ts
import { BasePaginationRequestDto } from '../../../common/dtos/base-pagination-request.dto';

export class EquipmentFilterDto extends BasePaginationRequestDto {
  // Inherits page, pageSize, keyword automatically.
  // Add specific filters here:
  categoryId?: string;
  isActive?: boolean;
}
```

### 3.2 Base Dropdown Request
**File:** `src/common/dtos/base-dropdown-request.dto.ts`  
Used specifically for the `ForDropdown` endpoint when the frontend needs to search within a dropdown list.

```typescript
export class BaseDropdownRequestDto {
  keyword?: string; // For searching within the dropdown
  limit?: number = 50; // Cap the max results to prevent massive payloads
}
```

### 3.3 Dropdown Response Standard
**File:** `src/common/dtos/dropdown-response.dto.ts`  
All `ForDropdown` endpoints MUST return an array of this type to ensure frontend UI components can bind to them uniformly without extra data mapping logic.

```typescript
export class DropdownItemDto {
  id: string | number;
  label: string; // The display name
}
```

---

## 4. Code Organization (The "Shared Code" Structure)

To implement this, Developers must construct the generic base classes in the `common` or `shared` module.

### 4.1 Base Service (`src/common/services/base-crud.service.ts`)
Create a generic abstract class `BaseCrudService<T>` that implements repository methods (TypeORM/Prisma) for the 7 operations. This handles the actual DB queries.

### 4.2 Base Controller (`src/common/controllers/base-crud.controller.ts`)
Create a generic class `BaseCrudController<T, FilterDto>` decorated with `@Controller()` and containing the 7 standardized `@Get()` and `@Post()` decorators.

### 4.3 Concrete Implementation Example
When creating a new Master Data entity like `Equipment`, the developer only needs to write this minimal boilerplate:

**File:** `src/modules/equipment/equipment.controller.ts`
```typescript
import { Controller } from '@nestjs/common';
import { BaseCrudController } from '../../common/controllers/base-crud.controller';
import { Equipment } from './entities/equipment.entity';
import { EquipmentService } from './equipment.service';
import { EquipmentFilterDto } from './dtos/equipment-filter.dto';

@Controller('api/v1/Equipment')
export class EquipmentController extends BaseCrudController<Equipment, EquipmentFilterDto> {
   constructor(private readonly equipmentService: EquipmentService) {
       super(equipmentService);
   }
   
   // BOOM! All 7 standard endpoints are now automatically inherited 
   // and will appear in Swagger exactly as specified!
}
```

## 5. Summary & Checklist for Developers
When adding a new Master Data module:
- [ ] Do **NOT** manually write the 7 standard endpoints in the controller.
- [ ] Extend `BaseCrudController` and pass your specific service via `super()`.
- [ ] Extend `BasePaginationRequestDto` if the entity requires custom filters for the data grid.
- [ ] Override specific endpoints in your concrete controller **ONLY IF** the entity requires non-standard business logic (e.g., custom Excel download format overriding the base `download`).
