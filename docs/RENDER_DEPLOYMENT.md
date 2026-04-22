# Render Deployment Guide

## Overview
This guide explains how to deploy your backend services to Render.com using Azure DevOps CI/CD pipeline.

## Prerequisites
- [ ] Render account (https://render.com)
- [ ] Render API key
- [ ] Azure DevOps project
- [ ] PostgreSQL database on Render
- [ ] Redis instance on Render

---

## Step 1: Set Up Render Services Manually (First Time Only)

### 1.1 Create PostgreSQL Database
1. Go to https://dashboard.render.com
2. Click **New +** → **PostgreSQL**
3. Configure:
   - **Name**: `gupjob-postgres`
   - **Database**: `gupjob_prod`
   - **User**: `gupjob`
   - **Region**: Choose closest to your users
   - **Plan**: Standard (minimum for production)
4. Save the connection string (DATABASE_URL)

### 1.2 Create Redis Instance
1. Click **New +** → **Redis**
2. Configure:
   - **Name**: `gupjob-redis`
   - **Region**: Same as PostgreSQL
   - **Plan**: Standard
3. Save the connection string (REDIS_URL)

### 1.3 Create Web Services for Backend
For each service, create manually or use `render.yaml`:

**Using render.yaml (Recommended):**
```bash
# Push render.yaml to your repo and Render will auto-create services
# Or manually create each service as below
```

**Manual Creation:**
For each service (auth-service, admin-service, user-service, mentor-service, api-gateway):

1. Click **New +** → **Web Service**
2. Connect GitHub repository
3. Configure:
   - **Name**: Service name (e.g., `auth-service`)
   - **Runtime**: Node
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: Standard
4. Add Environment Variables (see Step 2)
5. Deploy

---

## Step 2: Configure Environment Variables in Render

### 2.1 Database Connection
1. In each web service, go to **Environment**
2. Add variables:

```
DATABASE_URL=postgresql://gupjob:PASSWORD@hostname:5432/gupjob_prod
REDIS_URL=redis://:PASSWORD@hostname:6379
NODE_ENV=production
```

### 2.2 Service-to-Service Communication
For **API Gateway**:
```
AUTH_SERVICE_URL=https://auth-service-xxxxx.onrender.com
ADMIN_SERVICE_URL=https://admin-service-xxxxx.onrender.com
USER_SERVICE_URL=https://user-service-xxxxx.onrender.com
MENTOR_SERVICE_URL=https://mentor-service-xxxxx.onrender.com
```

For each service connecting to Auth:
```
AUTH_SERVICE_URL=https://auth-service-xxxxx.onrender.com
```

### 2.3 Application Secrets
Add these per service as needed:
```
JWT_SECRET=your-secret-key
API_KEY=your-api-key
[Any other secrets from your environment]
```

---

## Step 3: Configure Azure DevOps Pipeline

### 3.1 Get Render API Key
1. Go to Render Dashboard → **Account Settings**
2. Under **API Tokens**, click **Create Token**
3. Name it: `Azure DevOps CI/CD`
4. Copy the token

### 3.2 Create Variable Group in Azure DevOps
1. Go to **Pipelines** → **Library**
2. Click **+ Variable group**
3. Name: `render-secrets`
4. Add variables:
   - **RENDER_API_KEY**: Paste your API token (mark as secret)
5. Click **Save**

### 3.3 Link Variable Group to Pipeline
1. Go to **Pipelines**
2. Click on your pipeline
3. Go to **Edit** → **Variables**
4. Click **Variable groups**
5. Select `render-secrets`
6. Click **Save**

### 3.4 Configure Pipeline Trigger
The pipeline file `azure-pipelines-cd-render.yml` automatically triggers on:
- Push to `main` or `release/*` branches
- Changes to `services/`, `libs/`, `render.yaml`, or the pipeline file itself

---

## Step 4: Run the Pipeline

### 4.1 Trigger Deployment
```bash
# Push to main branch
git add .
git commit -m "Deploy to Render"
git push origin main
```

### 4.2 Monitor Pipeline
1. Go to Azure DevOps → **Pipelines**
2. Select `azure-pipelines-cd-render`
3. Watch the build progress

### 4.3 Monitor Render Deployment
1. Go to https://dashboard.render.com
2. Click on each service
3. View **Logs** and **Deployments** tabs

---

## Step 5: Database Initialization (First Deployment)

After services are deployed, run migrations:

```bash
# Option 1: Using Render Shell
1. Go to service in Render Dashboard
2. Click **Shell** tab
3. Run: npx prisma migrate deploy

# Option 2: Using Render API
curl -X POST \
  https://api.render.com/v1/services/auth-service/env \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "RUN_MIGRATIONS",
    "value": "true"
  }'
```

---

## Troubleshooting

### Build Fails
- Check Node version in pipeline (currently 20.x)
- Verify all dependencies in `package.json`
- Check build logs in Azure DevOps

### Services Can't Connect
- Verify internal URLs in environment variables
- Check PostgreSQL/Redis credentials
- Test connectivity using Shell in Render Dashboard

### Performance Issues
- Upgrade Render plan from Standard
- Enable Render's CDN
- Optimize database queries

### Logs
- **Azure DevOps**: Pipeline Logs
- **Render**: Service Logs in Dashboard
- **Database**: PostgreSQL logs in Render

---

## Monitoring & Maintenance

### Health Checks
Configure health check endpoints:
- Default: `/health`
- Modify in `render.yaml` or service settings

### Auto-Restart
Services auto-restart on failure. Configure restart policy:
- **On failure**: Enabled by default
- **Max restarts**: Configure in Render Dashboard

### Database Backups
- Render auto-backs up PostgreSQL daily
- Access backups in **Database** → **Backups**

### Scaling
- Monitor CPU/Memory in Render Dashboard
- Upgrade plan when needed
- Consider load balancing for high traffic

---

## Common Issues & Solutions

### Issue: "RENDER_API_KEY not found"
**Solution**: 
- Verify variable group `render-secrets` exists
- Check it's linked to the pipeline
- Confirm the variable name is exactly `RENDER_API_KEY`

### Issue: Services deploy but can't communicate
**Solution**:
- Use full Render service URLs in environment variables
- Format: `https://service-name-xxxxx.onrender.com`
- Update these URLs after each new deployment

### Issue: Migrations fail on deployment
**Solution**:
- Run migrations manually via Render Shell
- Or create a migration service in render.yaml
- Ensure database user has permissions

### Issue: Docker build fails
**Solution**:
- Verify Dockerfiles use correct base images
- Check Node version in Dockerfile matches pipeline
- Verify all required files are copied in Dockerfile

---

## Next Steps

1. Test the pipeline with a feature branch
2. Set up monitoring (Render Dashboard alerts)
3. Configure auto-scaling if needed
4. Set up backup strategy
5. Document your deployment process for the team

---

## Resources

- [Render Documentation](https://render.com/docs)
- [Render API Reference](https://api-docs.render.com)
- [Azure DevOps Pipelines](https://docs.microsoft.com/en-us/azure/devops/pipelines)
- [NestJS Deployment](https://docs.nestjs.com/deployment)
