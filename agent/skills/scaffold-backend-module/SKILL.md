---
name: scaffold-backend-module
description: Scaffold a full backend module including module file, controller, service, and DTOs.
---

# scaffold-backend-module

This skill helps you generate a complete backend module structure for IUROADMAP.

## Instructions
1. Ask the user for the resource name (e.g. `courses`) and the target service (e.g. `roadmap-service` or `api-gateway`).
2. Scaffold the following structure in `services/<service>/src/modules/<resource>/`:
   - `controllers/<resource>.controller.ts` (using `add-controller` rules)
   - `services/<resource>.service.ts` (using `06-service.md` rules)
   - `dtos/` (using `add-validator` rules)
   - `<resource>.module.ts`
3. If it's a backend service (e.g. `roadmap-service`), the controller is internal.
4. If it's the `api-gateway`, the controller is exposed publicly and delegating to a ClientProxy or HTTP Client.
5. Export the new module and import it into `app.module.ts`.
