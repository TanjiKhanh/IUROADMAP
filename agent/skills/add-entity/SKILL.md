---
name: add-entity
description: Add a new entity to the database schema and generate corresponding base models.
---

# add-entity

This skill helps you create a new domain entity following the project's architecture.

## Instructions
1. Ask the user for the entity name and which service it belongs to (e.g., `roadmap-service`).
2. Update the Prisma schema in `services/<service>/prisma/schema.prisma` with the new model.
3. If this entity requires relationships, ensure you add appropriate foreign keys.
4. Run `npx prisma generate` in the target service to update the Prisma Client.
5. Remind the user to run migrations when they are ready.
