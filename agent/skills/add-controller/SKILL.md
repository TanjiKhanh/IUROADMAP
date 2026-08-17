---
name: add-controller
description: Scaffold a new NestJS Controller mapping to the appropriate microservice based on project rules.
---

# add-controller

This skill helps you create a new Controller in the `api-gateway` following the established rules in `agent/rules/03-controller.md`.

## Instructions
1. Ask the user for the name of the resource (e.g., `departments`, `roadmaps`).
2. Identify the target module within `services/api-gateway/src/modules/`.
3. Create the controller class extending `BaseCrudController`.
4. Apply `@Controller('api/v1/<resource>')` and `@ApiTags()`.
5. Ensure role-based access if needed by referencing `agent/rules/07-permission.md`.
6. Register the new controller in the corresponding module file (`<module>.module.ts`).
