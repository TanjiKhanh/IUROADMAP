# IUROADMAP Docker Compose Production Setup

This guide explains the Docker Compose setup for production deployment.

## 📋 What's Included

The production Docker Compose setup includes:

### Services
- **PostgreSQL (Port 5432)** - Multi-database setup with automatic initialization
- **Redis (Port 6379)** - In-memory cache for sessions and performance
- **Auth Service (Port 3000)** - JWT authentication and user management
- **Admin Service (Port 3001)** - Roadmap and content management
- **Mentor Service (Port 4001)** - Mentor profile and expertise management
- **User Service (Port 3002)** - User profile and roadmap tracking
- **API Gateway (Port 8080)** - Route aggregation and request handling
- **Frontend (Port 5173)** - React/Vite web application
- **Nginx (Port 80/443)** - Reverse proxy and SSL termination (optional)

### Databases
The setup creates 4 separate PostgreSQL databases for service isolation:
- `gupjob_auth` - User accounts and authentication
- `gupjob_admin` - Departments, courses, and roadmaps
- `gupjob_mentor` - Mentor profiles and skills
- `gupjob_user` - User profiles and learning progress

## 🚀 Quick Start

### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+
- 4GB+ RAM
- 10GB+ disk space

### Step 1: Configure Environment

```bash
# Create .env file from production template
cp .env.production .env

# Edit .env with your values
# IMPORTANT: Change these for production
# - DB_PASSWORD
# - REDIS_PASSWORD
# - JWT_SECRET
# - VITE_API_BASE_URL
```

### Step 2: Start Services

**Windows:**
```bash
# Double-click docker-start.bat for interactive menu
# OR
docker compose up -d
```

**Linux/macOS:**
```bash
# Make script executable
chmod +x docker-start.sh

# Run interactive menu
./docker-start.sh

# OR manually start
docker compose up -d
```

### Step 3: Verify Deployment

```bash
# Check all services are running
docker compose ps

# View logs
docker compose logs -f

# Test API Gateway
curl http://localhost:8080/health

# Open frontend
open http://localhost:5173
```

## 📁 File Structure

```
infra/
├── init.ensure.databases.sql      # Create databases (idempotent)
├── init.all.databases.sql         # Create schemas and tables
├── seed.auth.sql                  # Auth user and token data
├── seed.admin.sql                 # Departments and roadmaps
├── seed.mentor.sql                # Mentor profiles
├── seed.user.sql                  # User profiles
└── k8s/                           # Kubernetes manifests (optional)

Root files:
├── docker-compose.yml             # Main compose definition
├── .env.production                # Production config template
├── DOCKER_DEPLOYMENT.md           # Detailed deployment guide
├── docker-start.bat               # Windows helper script
└── docker-start.sh                # Linux/macOS helper script
```

## 🔌 Database Initialization Flow

When PostgreSQL starts, it automatically executes scripts in `/docker-entrypoint-initdb.d/`:

1. **01-init.ensure.databases.sql** - Create databases if they don't exist
2. **02-init.all.databases.sql** - Create all tables and schemas
3. **03-seed.auth.sql** - Load test users and tokens
4. **04-seed.admin.sql** - Load departments and roadmaps
5. **05-seed.mentor.sql** - Load mentor data
6. **06-seed.user.sql** - Load user data

All scripts are **idempotent** - they can run multiple times without errors.

## 🧪 Default Test Credentials

After first startup, use these to test:

```
Email              | Password    | Role
-------------------|-------------|--------
student1@...com    | password123 | STUDENT
mentor1@...com     | password123 | MENTOR
admin@...com       | password123 | ADMIN
```

## 🔄 Common Operations

### View Database Contents
```bash
# Connect to PostgreSQL
docker compose exec postgres psql -U gupjob -d gupjob_auth

# List all users
SELECT id, email, role, status FROM "User";

# Exit psql
\q
```

### Backup Database
```bash
# Create backup
docker compose exec postgres pg_dump -U gupjob gupjob_auth > backup.sql

# Or backup all databases
docker compose exec postgres pg_dumpall -U gupjob > full_backup.sql
```

### Restore Database
```bash
# Restore from backup
docker compose exec -T postgres psql -U gupjob gupjob_auth < backup.sql
```

### Reset Everything (⚠️ Deletes all data)
```bash
# Remove all volumes and containers
docker compose down -v

# Rebuild and restart
docker compose build
docker compose up -d
```

### Scale Services
```bash
# Run 3 instances of admin-service
docker compose up -d --scale admin-service=3

# Scale back to 1
docker compose up -d --scale admin-service=1
```

## 🔐 Production Security

### Change Secrets
```bash
# Generate secure random values
openssl rand -base64 32  # For DB_PASSWORD
openssl rand -base64 48  # For JWT_SECRET

# Update .env
nano .env

# Restart services
docker compose down
docker compose up -d
```

### Enable HTTPS with Nginx
```bash
# Copy SSL certificates to infra/certs/
# - infra/certs/server.crt
# - infra/certs/server.key

# Start with Nginx enabled
docker compose --profile proxy up -d
```

### Network Security
- Services communicate via internal Docker network
- Only expose API Gateway (8080) and Frontend (5173) to public
- Use firewall to restrict port access
- Regular security updates: `docker pull` latest images

## 📊 Monitoring & Logs

### View Service Logs
```bash
# All services
docker compose logs

# Specific service
docker compose logs auth-service

# Follow logs in real-time
docker compose logs -f api-gateway

# Last 50 lines
docker compose logs --tail 50
```

### Health Checks
```bash
# View health status
docker compose ps

# Sample output:
# NAME                    STATUS
# iuroadmap-postgres      Up 2 min (healthy)
# iuroadmap-redis         Up 2 min (healthy)
# iuroadmap-auth-service  Up 2 min (healthy)
```

### Check Service Connectivity
```bash
# Test from inside a container
docker compose exec auth-service curl http://redis:6379

# Or use docker exec
docker exec iuroadmap-auth-service npm test
```

## 🐳 Docker Hub Integration

To share with your friend:

### 1. Build and Tag Images
```bash
docker build -t yourusername/iuroadmap-auth:1.0.0 ./services/auth
docker build -t yourusername/iuroadmap-admin:1.0.0 ./services/admin-service
# ... tag all services
```

### 2. Push to Docker Hub
```bash
docker login
docker push yourusername/iuroadmap-auth:1.0.0
# ... push all services
```

### 3. Create docker-compose.prod.yml
```yaml
# Instead of building locally:
services:
  auth-service:
    image: yourusername/iuroadmap-auth:1.0.0
    # ... rest of config
```

### 4. Share with Friend
```bash
# They can then run:
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

## 🛠️ Troubleshooting

### Services not starting?
```bash
# Check logs for errors
docker compose logs --tail 100

# Restart services
docker compose restart

# Check Docker daemon
docker ps
```

### Database won't initialize?
```bash
# Check PostgreSQL logs
docker compose logs postgres

# Verify database created
docker compose exec postgres psql -U gupjob -l

# Reinitialize
docker compose down -v
docker compose up -d
```

### Port conflicts?
```bash
# Check if port is in use
netstat -an | grep 5432  # macOS/Linux
netstat -ano | findstr 5432  # Windows

# Change port in docker-compose.yml:
# ports:
#   - "5433:5432"  # Use 5433 instead
```

### Out of disk space?
```bash
# Clean up unused Docker resources
docker system prune -a

# Remove compose volumes
docker compose down -v
```

## 📚 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Users/Clients                        │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP/HTTPS
                         ↓
         ┌───────────────────────────────┐
         │    Nginx (Port 80/443)        │ (optional)
         │  (Reverse Proxy + SSL)        │
         └────────────┬──────────────────┘
                      │
                      ↓
     ┌────────────────────────────────────┐
     │   API Gateway (Port 8080)          │
     │   - Routes requests                │
     │   - Aggregates services            │
     └─┬──────────┬──────────┬────────┬───┘
       │          │          │        │
       ↓          ↓          ↓        ↓
    ┌────────┐ ┌────────┐ ┌──────┐ ┌────────┐
    │ Auth   │ │ Admin  │ │      │ │ User   │
    │Service │ │Service │ │ Mentor│ │Service │
    │(3000)  │ │(3001)  │ │Svc   │ │(3002)  │
    │        │ │        │ │(4001)│ │        │
    └───┬────┘ └───┬────┘ └──┬───┘ └───┬────┘
        │          │         │         │
        └──────────┼─────────┼─────────┘
                   │         │
              ┌────┴────┬────┴──┐
              ↓         ↓       ↓
          ┌──────────┐      ┌───────┐
          │PostgreSQL│      │ Redis │
          │(4 DBs)   │      │(6379) │
          └──────────┘      └───────┘

Data Flow:
- Client → Nginx → API Gateway → Services → PostgreSQL/Redis
- Services communicate internally via Docker network
```

## 📖 Additional Resources

- Main README: [../README.md](../README.md)
- Architecture Docs: [../docs/architecture.md](../docs/architecture.md)
- Database Guide: [../docs/DB_MANAGEMENT.md](../docs/DB_MANAGEMENT.md)
- Deployment Guide: [../DOCKER_DEPLOYMENT.md](../DOCKER_DEPLOYMENT.md)

## ✅ Checklist for Production

- [ ] Change all default passwords in `.env`
- [ ] Set strong `JWT_SECRET` (use `openssl rand`)
- [ ] Configure `VITE_API_BASE_URL` for your domain
- [ ] Enable HTTPS with Nginx and SSL certificates
- [ ] Set up automated backups of PostgreSQL
- [ ] Configure monitoring and alerting
- [ ] Set up log aggregation (ELK Stack, etc.)
- [ ] Test disaster recovery (restore from backup)
- [ ] Document your deployment process
- [ ] Set up health check monitoring
- [ ] Configure resource limits and auto-scaling
- [ ] Regular security updates and patches

---

**Questions?** Check [DOCKER_DEPLOYMENT.md](../DOCKER_DEPLOYMENT.md) for detailed instructions.
