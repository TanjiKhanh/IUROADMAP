# Web Frontend (iuroadmap.web)

This is the web frontend for the IUROADMAP platform, built with React, Vite, and TypeScript. It displays AI-powered career roadmaps using React Flow and consumes services routed through the API Gateway.

## Tech Stack
*   **Framework**: React (v18)
*   **Build Tool**: Vite (v5)
*   **Routing**: React Router DOM (v6)
*   **Roadmap Visualizer**: React Flow (v11)
*   **State Management**: `@iuroadmap/store` (Shared Redux package)
*   **Internationalization**: `@iuroadmap/i18n` (Shared translation config)

## Prerequisites
*   Node.js >= 18.0.0
*   npm >= 9.0.0

## Quick Start

### 1. Development (Standalone)
Run the development server locally:
```bash
# From the project root, target this workspace
npm run web:dev

# Or run directly inside the apps/web directory
cd apps/web
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Configure Environment
Create a `.env` file in `apps/web/` if custom configurations are needed:
```env
VITE_API_BASE_URL=http://localhost:8080
```

### 3. Production Build
Compile the application bundles:
```bash
# Run build command via Turborepo
npm run build --filter=iuroadmap.web
```
The optimized bundle will be generated under [dist/](file:///d:/TanKhanh/Lecture/2025-2026/Second%20Semester/Software%20Engineering/IUROADMAP/IUROADMAP/apps/web/dist).

---

## Workspace Integration
This package imports internal shared logic from:
*   `@iuroadmap/store`: Global Redux store config.
*   `@iuroadmap/i18n`: Pre-configured English and Vietnamese translation maps.
