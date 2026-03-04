# IUROADMAP — AI-Powered Career Roadmap Platform

**IUROADMAP** is a comprehensive career guidance and mentorship platform that empowers students and professionals to master technical skills through interactive visual roadmaps, progress tracking, and AI-assisted mentorship. Built with a modern microservices architecture combining React (Vite) frontend with a multi-service NestJS backend, Docker, and PostgreSQL.

> 🚀 Interactive visual roadmaps, real-time mentorship, comprehensive progress tracking, and AI-powered career guidance — all in one scalable platform.

---

## Table of Contents

- [Key Features](#key-features)
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development Setup](#local-development-setup)
  - [Environment Configuration](#environment-configuration)
  - [Database Setup](#database-setup)
  - [Running All Services](#running-all-services)
- [Services Guide](#services-guide)
- [Testing](#testing)
- [Database & Migrations](#database--migrations)
- [API Conventions](#api-conventions)
- [Deployment](#deployment)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Maintainer](#maintainer)

---

## Key Features

### For Learners
- 📊 **Interactive Visual Roadmaps** — React Flow-based graph visualization of learning paths
- 📚 **Resource Drawer** — Markdown content, external links, and video resources
- ✅ **Progress Tracking** — Track nodes (Available → In Progress → Completed)
- 📝 **Personalized Notes** — Save notes and resources per roadmap
- 🎯 **Guided Learning** — Step-by-step progression through skills

### For Mentors
- 💬 **Mentorship Connections** — Connect with learners for 1-on-1 guidance
- 📋 **Profile Management** — Showcase expertise, skills, and experience
- 🏆 **Endorsements** — Build credibility through learner feedback
- 📈 **Career Guidance** — Provide personalized learning recommendations

### For Admins
- 🎨 **Roadmap Designer** — Drag-and-drop interface to create/edit learning paths
- 🔧 **Content Management** — Manage courses, resources, and learning materials
- 👥 **User Management** — Approve mentors, manage learner accounts
- 📊 **Analytics** — Track learner engagement and progress metrics

### Platform
- 🔐 **JWT Authentication** — Secure service-to-service and user authentication
- ⚡ **Microservices Architecture** — Independent, scalable services
- 🗄️ **PostgreSQL + Prisma** — Type-safe ORM with migrations
- 🐳 **Docker & Kubernetes** — Production-ready containerization
- 🧪 **Comprehensive Testing** — Unit, integration, and E2E tests

---

## Project Overview

IUROADMAP is built as a **microservices monorepo** with clear separation of concerns:

```
Learners                    Mentors                 Admins
   ↓                           ↓                       ↓
   └───────────── API Gateway ───────────┬───────────┘
                       ↓
        ┌──────────────┼──────────────┬────────────────┐
        ↓              ↓              ↓                ↓
    Auth Service  Admin Service  Mentor Service  User Service
        ↓              ↓              ↓                ↓
        └──────────────┼──────────────┴────────────────┘
                       ↓
                 PostgreSQL Database
```

---

## Architecture

### Microservices Approach
- **API Gateway** (`api-gateway`): Single entry point, request routing, rate limiting
- **Auth Service** (`auth`): User authentication, JWT generation, password reset
- **Admin Service** (`admin-service`): Roadmap/course management, content ownership
- **Mentor Service** (`mentor-service`): Mentor profiles, skills, availability
- **User Service** (`user-service`): Learner data, enrollments, progress tracking
- **Mentorship Service** (`mentorship-service`): Connection management, messaging

### Data Flow
1. **Frontend** → **API Gateway** (single HTTP entry point)
2. **API Gateway** routes to appropriate **microservice**
3. **Services** communicate via **HTTP/gRPC** or **event messaging** (optional)
4. **Services** persist to **shared PostgreSQL** database (Prisma ORM)
5. **Services** cache frequently-accessed data (Redis optional)

### Benefits
- ✅ Independent deployment and scaling
- ✅ Language/framework agility (all NestJS currently)
- ✅ Clear ownership boundaries
- ✅ Fault isolation

---

## Tech Stack

### Frontend
- **React 18** (Vite for build)
- **React Flow** — Graph visualization
- **React Router v6** — Client-side routing
- **TypeScript** — Type safety
- **CSS Modules + Styled Components** — Component styling
- **Axios** — HTTP client

### Backend Services
- **NestJS 10** — Node.js framework (all services)
- **TypeScript** — Strict type checking
- **Prisma 5** — ORM with migrations
- **PostgreSQL** — Primary database
- **Redis** (optional) — Caching layer
- **JWT** — Authentication tokens
- **Class Validator** — DTO validation

### Infrastructure
- **Docker** — Containerization
- **Docker Compose** — Local orchestration
- **Kubernetes** — Production orchestration
- **Terraform** (optional) — Infrastructure as Code
- **Nginx** — Reverse proxy (production)

### Development & Testing
- **Jest** — Unit & E2E testing framework
- **Supertest** — HTTP assertion library
- **ts-jest** — TypeScript support for Jest
- **ESLint** — Code linting
- **Prettier** — Code formatting

---

## Repository Structure

```
IUROADMAP (monorepo root)
├── frontend/                    # React Vite SPA
│   ├── src/
│   │   ├── auth/               # Authentication context & guards
│   │   ├── components/         # React components (layouts, UI, roadmap)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Route pages (admin, learner, mentor, public)
│   │   ├── routes/             # Route definitions
│   │   ├── services/           # API client services
│   │   ├── styles/             # Global & component styles
│   │   ├── types/              # TypeScript type definitions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── services/                    # Backend microservices
│   ├── api-gateway/            # API Gateway (request routing)
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── auth/                   # Authentication Service
│   │   ├── src/
│   │   │   ├── controllers/    # Route handlers
│   │   │   ├── services/       # Business logic
│   │   │   ├── dto/            # Data transfer objects
│   │   │   ├── guards/         # Auth guards (JWT)
│   │   │   ├── prisma/         # Database client
│   │   │   └── __tests__/      # Test suites
│   │   ├── package.json
│   │   ├── jest.config.js
│   │   └── prisma/
│   │       ├── schema.prisma
│   │       └── migrations/
│   │
│   ├── admin-service/          # Admin & Roadmap Management
│   │   ├── src/
│   │   ├── package.json
│   │   └── prisma/
│   │
│   ├── mentor-service/         # Mentor Profiles
│   │   ├── src/
│   │   │   └── modules/mentor-profile/
│   │   │       ├── controllers/
│   │   │       ├── services/
│   │   │       ├── repositories/
│   │   │       ├── dto/
│   │   │       └── __tests__/   # Comprehensive unit & E2E tests
│   │   ├── package.json
│   │   ├── jest.config.js
│   │   └── prisma/
│   │
│   ├── mentorship-service/     # Mentorship Connections
│   │   ├── src/
│   │   ├── package.json
│   │   └── prisma/
│   │
│   └── user-service/           # User & Progress Tracking
│       ├── src/
│       ├── package.json
│       └── prisma/
│
├── libs/                        # Shared Libraries
│   └── shared-db/              # Shared database & Prisma setup
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       └── src/
│
├── packages/                    # Shared Packages
│   ├── contracts/              # API contracts (OpenAPI specs)
│   ├── shared/                 # Shared utilities & types
│   └── package.json
│
├── infra/                       # Infrastructure Code
│   ├── docker/                 # Dockerfiles & Docker config
│   ├── docker-compose.yml      # Local development compose
│   ├── helm/                   # Kubernetes Helm charts
│   ├── k8s/                    # Kubernetes manifests
│   └── terraform/              # Terraform IaC
│
├── scripts/                     # Development scripts
│   ├── bootstrap.sh            # Install all dependencies
│   ├── dev-start.sh            # Start all services
│   ├── setup-local.sh          # Local setup script
│   └── seed/                   # Database seed scripts
│
├── tests/                       # Shared test suites
│   ├── contract-tests/         # API contract tests (Postman)
│   ├── e2e/                    # End-to-end tests
│   └── unit/                   # Unit test examples
│
├── docs/                        # Documentation
│   ├── architecture.md         # System design
│   ├── api-design.md           # API guidelines
│   ├── azure-devops-ci.md      # CI/CD setup
│   ├── FORGOT_PASSWORD_REVIEW.md
│   └── adrs/                   # Architecture Decision Records
│       └── 0001-monolith-vs-microservices.md
│
├── docker-compose.yml          # Production compose (alternative)
├── package.json                # Root workspace config
├── CONVENTION.md               # Code conventions
├── LOCAL_DEV_SETUP.md          # Detailed local setup
├── README.md                   # This file
├── azure-pipelines.yml         # CI/CD pipeline
├── run-all.ps1                 # PowerShell startup script
├── start-all.bat               # Batch startup script
└── .gitignore

```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or `pnpm`/`yarn`)
- **PostgreSQL** 14+ (local or Docker)
- **Redis** (optional, for caching)
- **Docker & Docker Compose** (for containerized setup)
- **Git**

**Check versions:**
```bash
node --version   # v18.x.x or higher
npm --version    # 9.x.x or higher
psql --version   # psql (PostgreSQL) 14+
```

### Local Development Setup

#### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/yourusername/IUROADMAP.git
cd IUROADMAP

# Install root workspace dependencies
npm install

# Install all service dependencies
npm install --workspaces

# Or use the bootstrap script
bash scripts/bootstrap.sh
```

#### 2. Environment Configuration

Create `.env` files for each service. Use `.env.example` files as templates:

**Root `.env`** (if needed):
```bash
NODE_ENV=development
```

**services/auth/.env**:
```env
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/gupjob
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=15m
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRE=30d
PORT=4000
MENTOR_SERVICE_API_KEY=internal-api-key

# Email settings (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**services/mentor-service/.env**:
```env
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/gupjob
JWT_SECRET=your-secret-key
PORT=4200
```

**frontend/.env**:
```env
VITE_API_URL=http://localhost:3000
VITE_AUTH_SERVICE_URL=http://localhost:4000
VITE_ADMIN_SERVICE_URL=http://localhost:4100
VITE_MENTOR_SERVICE_URL=http://localhost:4200
```

**Full configuration guide:** See [LOCAL_DEV_SETUP.md](LOCAL_DEV_SETUP.md)

#### 3. Database Setup

```bash
# Navigate to shared database directory
cd libs/shared-db

# Generate Prisma client
npx prisma generate

# Run all migrations
npx prisma migrate deploy

# (Optional) Seed test data
npx prisma db seed

# (Optional) Open Prisma Studio (GUI)
npx prisma studio
```

#### 4. Start All Services

**Option A: Using NPM workspaces**
```bash
# Terminal 1: Start all services in watch mode
npm run dev --workspaces

# Terminal 2: Start frontend
cd frontend && npm run dev
```

**Option B: Using provided scripts**
```bash
# Windows (PowerShell)
.\run-all.ps1

# Windows (Batch)
start-all.bat

# Linux/Mac
bash scripts/dev-start.sh
```

**Option C: Using Docker Compose**
```bash
# Start all services with Docker
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

#### 5. Verify Setup

- **Frontend:** http://localhost:5173
- **API Gateway:** http://localhost:3000
- **Auth Service:** http://localhost:4000
- **Admin Service:** http://localhost:4100
- **Mentor Service:** http://localhost:4200
- **User Service:** http://localhost:4300
- **Prisma Studio:** http://localhost:5555 (if running)

---

## Services Guide

### API Gateway (Port 3000)
**Purpose:** Single entry point for all client requests. Routes to appropriate backend services.

```bash
cd services/api-gateway
npm install
npm run dev
```

**Key Routes:** (routes to other services)
- `/auth/*` → Auth Service (4000)
- `/admin/*` → Admin Service (4100)
- `/mentor/*` → Mentor Service (4200)
- `/user/*` → User Service (4300)

### Auth Service (Port 4000)
**Purpose:** JWT authentication, user registration, login, password reset.

```bash
cd services/auth
npm install
npm run dev
```

**Features:**
- User registration (learner/mentor)
- Login with JWT tokens
- Refresh token rotation
- Password reset flow
- Internal API for mentor profile creation

**Tests:** `npm test` (Unit + E2E tests)

### Admin Service (Port 4100)
**Purpose:** Roadmap and course management for admins.

```bash
cd services/admin-service
npm install
npm run dev
```

**Features:**
- Create/edit/delete roadmaps
- Manage learning nodes
- Publish content
- Versioning & history

### Mentor Service (Port 4200)
**Purpose:** Mentor profile management and expertise showcase.

```bash
cd services/mentor-service
npm install
npm run dev
```

**Features:**
- Create & update mentor profiles
- Skill management
- Availability settings
- Mentor discovery

**Tests:** `npm test` (61 tests: 26+ unit, 27+ E2E, 8+ controller) ✅ All passing

### User Service (Port 4300)
**Purpose:** User enrollments, progress tracking, and learner data.

```bash
cd services/user-service
npm install
npm run dev
```

**Features:**
- Learner enrollments
- Progress tracking
- Notes & resources
- Learning statistics

### Frontend (Port 5173)
**Purpose:** React SPA for learners, mentors, and admins.

```bash
cd frontend
npm install
npm run dev
```

**Features:**
- Interactive roadmap viewer
- Dashboard (learner, mentor, admin)
- Authentication flows
- Profile management

---

## Testing

### Unit & E2E Tests

**Auth Service** (11 tests, all ✅ passing):
```bash
cd services/auth
npm test
# Output: 12 tests passed
```

**Mentor Service** (61 tests, all ✅ passing):
```bash
cd services/mentor-service
npm test
# Output: 61 tests passed (26 unit + 27 E2E + 8 controller)
```

**Test Coverage:**
- ✅ Authentication & authorization
- ✅ CRUD operations
- ✅ Input validation
- ✅ Role-based access control
- ✅ Error handling
- ✅ Edge cases & concurrent requests
- ✅ Database interactions

**Run all tests:**
```bash
npm run test --workspaces
```

**Watch mode (development):**
```bash
npm run test:watch --workspaces
```

**Coverage report:**
```bash
npm run test:cov --workspaces
```

---

## Database & Migrations

### Prisma Setup

The project uses **Prisma 5** for type-safe database access.

**Generate Prisma Client:**
```bash
npx prisma generate
```

**Create a new migration:**
```bash
npx prisma migrate dev --name add_new_field
```

**Apply pending migrations:**
```bash
npx prisma migrate deploy
```

**Reset database (⚠️ deletes all data):**
```bash
npx prisma migrate reset
```

**View database (GUI):**
```bash
npx prisma studio
```

### Database Schema
Main entities:
- **User** — Authentication & profile
- **RefreshToken** — Token management
- **MentorProfile** — Mentor expertise & availability
- **Roadmap** — Learning path (admin)
- **RoadmapNode** — Individual learning items
- **RoadmapEdge** — Node connections
- **UserRoadmap** — Learner enrollment snapshot
- **UserRoadmapNode** — Progress per node

**See full schema:** [libs/shared-db/prisma/schema.prisma](libs/shared-db/prisma/schema.prisma)

---

## API Conventions

### Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." http://localhost:3000/api/profile
```

### Response Format

**Success (2xx):**
```json
{
  "data": { ... },
  "message": "Operation successful"
}
```

**Error (4xx/5xx):**
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### Common Endpoints

**Authentication:**
- `POST /auth/register/learner` — Register learner
- `POST /auth/register/mentor` — Register mentor
- `POST /auth/login` — Login
- `POST /auth/refresh` — Refresh token
- `POST /auth/logout` — Logout
- `POST /auth/forgot-password` — Request reset
- `POST /auth/reset-password` — Reset password

**Mentor Profiles:**
- `GET /mentor/profiles/me` — Get current mentor profile
- `PUT /mentor/profiles/me` — Update profile
- `GET /mentor/profiles` — List all (admin only)
- `DELETE /mentor/profiles/:id` — Delete (admin only)

**Examples:** See [docs/api-design.md](docs/api-design.md)

---

## Deployment

### Docker Deployment

**Build all images:**
```bash
docker-compose build
```

**Run in production:**
```bash
docker-compose -f docker-compose.yml up -d
```

**Logs:**
```bash
docker-compose logs -f
```

### Environment-Specific Setup

1. **Development**: Use `docker-compose.yml` (local dev)
2. **Staging**: Update `DATABASE_URL`, `REDIS_URL`, deploy to staging server
3. **Production**: Use Kubernetes or managed platforms (Azure, AWS)

### Azure Deployment (Optional)

See [docs/azure-devops-ci.md](docs/azure-devops-ci.md) for CI/CD pipeline setup.

**Key steps:**
1. Set up Azure Container Registry
2. Configure Azure Pipeline
3. Deploy to Azure App Service or AKS
4. Configure managed PostgreSQL & Redis

---

## Development Workflow

### Code Conventions

See [CONVENTION.md](CONVENTION.md) for:
- Naming conventions
- File structure
- Error handling patterns
- API response formats

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/add-new-feature

# Commit with descriptive messages
git commit -m "feat: add mentor profile endpoint"

# Push to remote
git push origin feature/add-new-feature

# Open Pull Request on GitHub
```

### Before Committing

```bash
# Run tests
npm test --workspaces

# Lint code
npm run lint --workspaces

# Format code
npm run format --workspaces
```

---

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Find process on port (e.g., 3000)
lsof -i :3000          # Mac/Linux
netstat -ano | grep :3000  # Windows

# Kill process
kill -9 <PID>
# Or change port in .env
```

**Database connection error:**
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1;"

# Verify DATABASE_URL in .env
# Format: postgresql://user:password@host:port/database
```

**Prisma migration conflict:**
```bash
# Resolve by resetting (caution: deletes data)
npx prisma migrate reset

# Or manually fix in prisma/migrations/
```

**Port 3000 occupied by API Gateway:**
```bash
# Change in services/api-gateway/.env
PORT=3001
```

**Node modules issues:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear npm cache if needed
npm cache clean --force
```

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## Maintainer

**Developed by:** Tan Khanh (Nguyen)  
**Role:** Software Engineer  
**Contact:** [Your Email / GitHub Profile](https://github.com/yourusername)  

**Contributors:**
- Course Instructor: Software Engineering 2025-2026
- Team Members (if any)

---

## Additional Resources

- **Architecture Decision Record:** [docs/adrs/0001-monolith-vs-microservices.md](docs/adrs/0001-monolith-vs-microservices.md)
- **API Design Guide:** [docs/api-design.md](docs/api-design.md)
- **Local Setup Guide:** [LOCAL_DEV_SETUP.md](LOCAL_DEV_SETUP.md)
- **Code Conventions:** [CONVENTION.md](CONVENTION.md)
- **CI/CD Pipeline:** [docs/azure-devops-ci.md](docs/azure-devops-ci.md)

---

**Happy coding! 🚀**
