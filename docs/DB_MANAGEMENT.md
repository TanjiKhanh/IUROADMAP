# Database Management Guide (Production)

Without Adminer UI, manage PostgreSQL via Docker commands and tools.

## Prerequisites

```bash
# Ensure containers are running
docker compose ps

# Expected output:
# gupjob-postgres  postgres:15-alpine  ... Healthy
# gupjob-redis     redis:7-alpine      ... Healthy
```

---

## 1. Connect to PostgreSQL Shell (psql)

### Interactive connection
```bash
docker exec -it gupjob-postgres psql -U gupjob -d postgres
```

### Examples inside psql
```sql
-- List all databases
\l

-- Connect to a specific database
\c gupjob_auth

-- List all tables in current database
\dt

-- Describe a table
\d "User"

-- Show all connections
SELECT * FROM pg_stat_activity;

-- Exit
\q
```

---

## 2. Run SQL Commands Directly

### Execute a single command
```bash
docker exec gupjob-postgres psql -U gupjob -d gupjob_auth -c "SELECT COUNT(*) FROM \"User\";"
```

### Execute SQL from a file
```bash
docker exec gupjob-postgres psql -U gupjob -d gupjob_auth -f /path/to/query.sql
```

### Run init script on all databases
```bash
docker exec gupjob-postgres psql -U gupjob -d postgres -f /docker-entrypoint-initdb.d/init.all.databases.sql
```

---

## 3. Prisma Database Migrations (Production)

### Check migration status
```bash
docker exec api-gateway npm run prisma:migrate
docker exec auth-service npm run prisma:migrate
docker exec admin-service npm run prisma:migrate
docker exec user-service npm run prisma:migrate
docker exec mentor-service npm run prisma:migrate
```

### Generate Prisma client after schema changes
```bash
docker exec api-gateway npx prisma generate
docker exec auth-service npx prisma generate
docker exec admin-service npx prisma generate
docker exec user-service npx prisma generate
docker exec mentor-service npx prisma generate
```

### View Prisma schema
```bash
docker exec auth-service cat prisma/schema.prisma
```

---

## 4. Database Backup & Restore

### Backup all databases
```bash
docker exec gupjob-postgres pg_dump -U gupjob postgres > backup_all_$(date +%Y%m%d_%H%M%S).sql
```

### Backup specific database
```bash
docker exec gupjob-postgres pg_dump -U gupjob -d gupjob_auth > backup_auth_$(date +%Y%m%d_%H%M%S).sql
docker exec gupjob-postgres pg_dump -U gupjob -d gupjob_admin > backup_admin_$(date +%Y%m%d_%H%M%S).sql
docker exec gupjob-postgres pg_dump -U gupjob -d gupjob_user > backup_user_$(date +%Y%m%d_%H%M%S).sql
docker exec gupjob-postgres pg_dump -U gupjob -d gupjob_mentor > backup_mentor_$(date +%Y%m%d_%H%M%S).sql
```

### Restore from backup
```bash
# Copy backup to container
docker cp backup_auth_20260330_125000.sql gupjob-postgres:/tmp/

# Restore
docker exec gupjob-postgres psql -U gupjob -d gupjob_auth -f /tmp/backup_auth_20260330_125000.sql
```

---

## 5. Database User & Permissions

### List all users
```bash
docker exec gupjob-postgres psql -U gupjob -d postgres -c "SELECT * FROM pg_user;"
```

### Create new user
```bash
docker exec gupjob-postgres psql -U gupjob -d postgres -c "CREATE USER newuser WITH PASSWORD 'securepassword';"
```

### Grant permissions
```bash
docker exec gupjob-postgres psql -U gupjob -d gupjob_auth -c "GRANT ALL PRIVILEGES ON DATABASE gupjob_auth TO newuser;"
```

---

## 6. Query Examples for Production Monitoring

### Count users by role
```bash
docker exec gupjob-postgres psql -U gupjob -d gupjob_auth -c "SELECT role, COUNT(*) FROM \"User\" GROUP BY role;"
```

### Check active connections
```bash
docker exec gupjob-postgres psql -U gupjob -d postgres -c "SELECT datname, usename, state, count(*) FROM pg_stat_activity GROUP BY datname, usename, state;"
```

### Show database sizes
```bash
docker exec gupjob-postgres psql -U gupjob -d postgres -c "SELECT datname, pg_size_pretty(pg_database_size(datname)) as size FROM pg_database ORDER BY pg_database_size(datname) DESC;"
```

### Check table sizes
```bash
docker exec gupjob-postgres psql -U gupjob -d gupjob_auth -c "SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size FROM pg_tables ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"
```

---

## 7. Seed Database (Development/Testing)

### Apply seed SQL
```bash
docker exec gupjob-postgres psql -U gupjob -d gupjob_auth -f /docker-entrypoint-initdb.d/seed.auth.sql
docker exec gupjob-postgres psql -U gupjob -d gupjob_admin -f /docker-entrypoint-initdb.d/seed.admin.sql
docker exec gupjob-postgres psql -U gupjob -d gupjob_mentor -f /docker-entrypoint-initdb.d/seed.mentor.sql
docker exec gupjob-postgres psql -U gupjob -d gupjob_user -f /docker-entrypoint-initdb.d/seed.user.sql
```

---

## 8. PostgreSQL System Commands

### Check PostgreSQL logs
```bash
docker logs gupjob-postgres
docker logs gupjob-postgres --tail 100  # Last 100 lines
```

### Restart PostgreSQL
```bash
docker restart gupjob-postgres
```

### Check PostgreSQL version
```bash
docker exec gupjob-postgres psql --version
```

### Vacuum & analyze (maintenance)
```bash
docker exec gupjob-postgres psql -U gupjob -d gupjob_auth -c "VACUUM ANALYZE;"
```

---

## 9. Connect from Host Machine

### Install psql client (local)
```bash
# Windows: Install PostgreSQL tools
# Then use:
psql -h 127.0.0.1 -U gupjob -d gupjob_auth -p 5432

# macOS: brew install postgresql
# Linux: apt-get install postgresql-client
```

---

## 10. Environment Variables

All databases use credentials from `.env.production`:

```bash
POSTGRES_USER=gupjob
POSTGRES_PASSWORD=gupjob_pass
POSTGRES_DB=postgres  # Default DB

# Service-specific URLs (set in docker-compose.yml)
gupjob_auth:    postgresql://gupjob:gupjob_pass@postgres:5432/gupjob_auth
gupjob_admin:   postgresql://gupjob:gupjob_pass@postgres:5432/gupjob_admin
gupjob_user:    postgresql://gupjob:gupjob_pass@postgres:5432/gupjob_user
gupjob_mentor:  postgresql://gupjob:gupjob_pass@postgres:5432/gupjob_mentor
```

---

## 11. Quick Reference Cheatsheet

| Task | Command |
|------|---------|
| Connect to psql | `docker exec -it gupjob-postgres psql -U gupjob -d gupjob_auth` |
| List databases | `docker exec gupjob-postgres psql -U gupjob -d postgres -c "\l"` |
| Count users | `docker exec gupjob-postgres psql -U gupjob -d gupjob_auth -c "SELECT COUNT(*) FROM \"User\";"` |
| Backup database | `docker exec gupjob-postgres pg_dump -U gupjob -d gupjob_auth > backup.sql` |
| Restore database | `docker exec gupjob-postgres psql -U gupjob -d gupjob_auth -f backup.sql` |
| Check logs | `docker logs gupjob-postgres --tail 100` |
| Restart DB | `docker restart gupjob-postgres` |
| Run migration | `docker exec auth-service npm run prisma:migrate` |

---

## 12. Production Best Practices

1. **Regular Backups**: Schedule daily backups
   ```bash
   # Create backup cron job
   0 2 * * * docker exec gupjob-postgres pg_dump -U gupjob postgres > /backups/backup_$(date +\%Y\%m\%d).sql
   ```

2. **Monitor Connections**: Check active connections regularly
   ```bash
   docker exec gupjob-postgres psql -U gupjob -d postgres -c "SELECT count(*) FROM pg_stat_activity;"
   ```

3. **Test Restores**: Periodically test backup restoration
   ```bash
   # Test restore to temporary database
   docker exec gupjob-postgres psql -U gupjob -c "CREATE DATABASE gupjob_auth_test;"
   docker exec gupjob-postgres psql -U gupjob -d gupjob_auth_test -f backup.sql
   ```

4. **Vacuum Regularly**: Reclaim disk space
   ```bash
   docker exec gupjob-postgres psql -U gupjob -d gupjob_auth -c "VACUUM ANALYZE;"
   ```

5. **Monitor Disk Usage**: Check available space
   ```bash
   docker exec gupjob-postgres df -h /var/lib/postgresql/data
   ```

---

## Troubleshooting

### Permission denied error
```bash
# Run as postgres superuser
docker exec -u postgres gupjob-postgres psql -d gupjob_auth
```

### Connection refused
```bash
# Check if container is running
docker compose ps gupjob-postgres

# Restart if needed
docker restart gupjob-postgres
```

### Migration failed
```bash
# Check service logs
docker logs auth-service --tail 200

# Manually run migration
docker exec auth-service npx prisma migrate deploy
```

---

**For more info:**
- PostgreSQL Docs: https://www.postgresql.org/docs/15/
- Prisma Docs: https://www.prisma.io/docs/
