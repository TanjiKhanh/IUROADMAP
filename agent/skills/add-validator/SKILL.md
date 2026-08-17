---
name: add-validator
description: Create or update DTOs with validation rules and Swagger documentation.
---

# add-validator

This skill helps you create and configure validation DTOs following `agent/rules/04-validation.md`.

## Instructions
1. Ask the user for the entity/feature name and what the DTO is for (Create, Update, Filter).
2. Create the file under `services/<service>/src/modules/<feature>/dtos/` (e.g. `create-department.dto.ts`).
3. Add `class-validator` rules (`@IsString`, `@IsNumber`, etc).
4. Add `@ApiProperty()` or `@ApiPropertyOptional()` for Swagger.
5. Apply the typescript non-null assertion operator (`!:`) for all initialized properties to pass strict compilation.
6. Ensure the DTO inherits from `BasePaginationRequestDto` or similar if applicable.
