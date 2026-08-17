# Constants and Validation Rules

To ensure a unified behavior across the Frontend and Backend, all global constants and validation rules are centralized in the `@iuroadmap/shared` library. 

**Rule: NEVER hardcode magic numbers, system roles, format strings, or validation lengths in any DTO or Service.**

Always import and use the appropriate constant from `@iuroadmap/shared`.

## 1. Entity Validation (`EntityConstant`)
Path: `services/shared/src/constants/entity.constant.ts`

When writing Request DTOs (e.g., using `class-validator`), you MUST use `EntityConstant` for `@MaxLength` and `@MinLength`.
**Examples:**
```typescript
import { EntityConstant } from '@iuroadmap/shared';
import { MaxLength, MinLength } from 'class-validator';

@MaxLength(EntityConstant.Email)
email: string;

@MinLength(EntityConstant.PasswordMin)
@MaxLength(EntityConstant.PasswordMax)
password: string;

@MaxLength(EntityConstant.ShortString)
name: string;
```

## 2. Global App Constants (`AppConstant`)
Path: `services/shared/src/constants/app.constant.ts`

Use `AppConstant` for any application-wide settings, including:
- **System Roles**: `AppConstant.RoleName.SuperAdmin`, `AppConstant.RoleName.Admin`, `AppConstant.RoleName.Learner`, `AppConstant.RoleName.Mentor`
- **Pagination Defaults**: `AppConstant.Pagination.DefaultPage`, `AppConstant.Pagination.DefaultRowsPerPage`
- **Formatters**: `AppConstant.DateFormat.Default`
- **Colors**: `AppConstant.Color.Primary`
- **Permission Groups**: `AppConstant.PMSGroup.SYSTEM`

**Example (Service Logic):**
```typescript
import { AppConstant } from '@iuroadmap/shared';

// Incorrect:
if (role.name === 'SUPERADMIN') { ... }

// Correct:
if (role.name === AppConstant.RoleName.SuperAdmin) { ... }
```
