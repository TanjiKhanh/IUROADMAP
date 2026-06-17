# Docker Compose Production Deployment Guide

## Overview
This guide explains how to deploy IUROADMAP using Docker Compose for production environments.

## Prerequisites
- Docker 20.10+
- Docker Compose 2.0+
- 4GB+ RAM available
- 10GB+ disk space

## Quick Start

### 1. Clone & Setup
```bash
git clone <your-repo>
cd IUROADMAP
```

### 2. Configure Environment
Create a `.env` file in the root directory or use the provided `.env.production`:

```bash
# Copy and customize the example
cp .env.production .env
```

**Important**: Edit `.env` with your actual secrets:
- `DB_PASSWORD` - PostgreSQL password
- `REDIS_PASSWORD` - Redis password
- `JWT_SECRET` - JWT signing secret (generate a strong one!)
- `VITE_API_BASE_URL` - Your API gateway URL

### 3. Build & Start Services
```bash
# Build all Docker images
docker compose build

# Start all services in background
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f
```

### 4. Verify Services
```bash
# Check API Gateway health
curl http://localhost:8080/health

# Check Frontend
open http://localhost:5173

# Check Auth Service
curl http://localhost:3000/health
```

## Service Architecture

```
┌─────────────────────────────────────────────────┐
│              User/Browser                        │
└────────────────────┬────────────────────────────┘
                     │
                     ↓
        ┌────────────────────────┐
        │  API Gateway (8080)    │
        └────────┬───────┬───────┘
                 │       │
        ┌────────┘       └─────────┐
        ↓                          ↓
   ┌─────────────┐      ┌────────────────┐
   │Auth Service │      │Other Services  │
   │  (3000)     │      │(3001,4001...) │
   └──────┬──────┘      └────────┬────────┘
          │                      │
          └──────────┬───────────┘
                     ↓
            ┌────────────────────┐
            │   PostgreSQL       │
            │  (gupjob_auth,     │
            │   gupjob_admin...) │
            └────────────────────┘
```

## Available Ports

| Service | Port | URL |
|---------|------|-----|
| API Gateway | 8080 | http://localhost:8080 |
| Auth Service | 3000 | http://localhost:3000 |
| Admin Service | 3001 | http://localhost:3001 |
| Mentor Service | 4001 | http://localhost:4001 |
| User Service | 3002 | http://localhost:3002 |
| Frontend | 5173 | http://localhost:5173 |
| PostgreSQL | 5432 | postgresql://localhost:5432 |
| Redis | 6379 | redis://localhost:6379 |

## Database Setup

The PostgreSQL container automatically:
1. Creates 4 databases: `gupjob_auth`, `gupjob_admin`, `gupjob_mentor`, `gupjob_user`
2. Runs schema migrations from `infra/*.sql`
3. Seeds initial data:
   - Users (students, mentors, admins)
   - Refresh tokens
   - Mentor profiles
   - User profiles

**Default Test Credentials** (from seed data):
- Student: `student1@example.com` / `password123`
- Mentor: `mentor1@example.com` / `password123`
- Admin: `admin@example.com` / `password123`

## Common Commands

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# Stop and remove volumes (⚠️ deletes database!)
docker compose down -v

# View logs for specific service
docker compose logs auth-service -f

# Rebuild specific service
docker compose build auth-service

# Run command in container
docker compose exec auth-service npm run prisma:migrate

# Execute database query
docker compose exec postgres psql -U gupjob -d gupjob_auth -c "SELECT * FROM \"User\";"

# Reset database (⚠️ deletes all data!)
docker compose down -v && docker compose up -d
```

## Scaling Services

To run multiple instances of a service:

```bash
# Scale admin service to 3 instances
docker compose up -d --scale admin-service=3
```

## Networking

All services communicate via the `iuroadmap-network` bridge network:
- Service-to-service: `http://<service-name>:<port>`
- Example: Auth service calls Mentor service at `http://mentor-service:4001`

## Health Checks

Each service has health checks configured:
```bash
# View health status
docker compose ps

# Manual health check
curl http://localhost:3000/health
curl http://localhost:8080/health
```

## Persistent Data

Volumes are automatically managed:
- `postgres_data`: Database files
- `redis_data`: Cache files

To backup:
```bash
docker run --rm -v iuroadmap_postgres_data:/data -v /backup:/backup postgres:15-alpine tar czf /backup/postgres.tar.gz -C / data
```

## Production Considerations

### Security
1. **Change default credentials in `.env`**
   ```bash
   # Generate strong passwords
   openssl rand -base64 32  # For DB_PASSWORD
   openssl rand -base64 32  # For JWT_SECRET
   ```

2. **Never commit `.env` to Git**
   ```bash
   echo ".env" >> .gitignore
   ```

3. **Use HTTPS/TLS**
   - Enable Nginx reverse proxy with `--profile proxy`
   - Configure SSL certificates in `infra/certs/`

### Performance
1. **Resource Limits** (edit docker-compose.yml):
   ```yaml
   services:
     postgres:
       deploy:
         resources:
           limits:
             cpus: '2'
             memory: 2G
   ```

2. **Logging**
   ```yaml
   logging:
     driver: "json-file"
     options:
       max-size: "10m"
       max-file: "3"
   ```

### Monitoring
- Implement application monitoring (e.g., Prometheus)
- Set up log aggregation (e.g., ELK Stack)
- Configure alerts for service failures

## Deployment with Nginx Reverse Proxy

To enable Nginx:

```bash
# Start with Nginx
docker compose --profile proxy up -d

# Access via http://localhost instead of http://localhost:8080
```

Nginx automatically:
- Routes `/api/*` to API Gateway
- Routes `/` to Frontend
- Handles CORS headers
- (Optional) Terminates SSL

## Troubleshooting

### Services not starting?
```bash
# Check logs
docker compose logs --tail 50

# Specific service
docker compose logs auth-service
```

### Database connection failed?
```bash
# Verify PostgreSQL is ready
docker compose exec postgres pg_isready -U gupjob

# Check database exists
docker compose exec postgres psql -U gupjob -l
```

### Port already in use?
```bash
# Map to different port in docker-compose.yml or .env
# Or find and kill the process:
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows
```

### Need to reinitialize database?
```bash
# ⚠️ This deletes all data!
docker compose down -v
docker compose build
docker compose up -d
```

## Deployment to Cloud Providers

### Docker Hub (for your friend)
```bash
# Login to Docker Hub
docker login

# Tag and push services
docker tag iuroadmap-auth-service yourusername/iuroadmap-auth:1.0.0
docker push yourusername/iuroadmap-auth:1.0.0

# Update docker-compose.yml to use remote images
# Change: build: ./services/auth
# To: image: yourusername/iuroadmap-auth:1.0.0
```

### Deploy to Production Server
```bash
# SSH to server
ssh user@server.com

# Clone repo
git clone <repo-url>
cd IUROADMAP

# Configure env
nano .env  # Set production values

# Start services
docker compose up -d

# Monitor
docker compose logs -f
```

## Support & Documentation

- API Documentation: `/api/docs` (Swagger)
- Architecture: See `docs/architecture.md`
- Database Schema: See `docs/DB_MANAGEMENT.md`
- Convention Guide: See `docs/CONVENTION.md`

---

**Need help?** Check the main [README.md](../README.md) or project documentation.
