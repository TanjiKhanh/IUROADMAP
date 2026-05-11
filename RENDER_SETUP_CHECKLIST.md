# Render Deployment - Quick Setup Checklist

## What I Created For You:

1. **render.yaml** - Infrastructure as Code for all backend services
2. **azure-pipelines-cd-render.yml** - Main CD pipeline (recommended)
3. **azure-pipelines-cd-render-docker.yml** - Alternative Docker-based pipeline
4. **docs/RENDER_DEPLOYMENT.md** - Complete setup guide

---

## Quick Setup (5 Steps):

### ✅ Step 1: Create Render Account
- [ ] Go to https://render.com
- [ ] Sign up and verify email
- [ ] Navigate to Dashboard

### ✅ Step 2: Get API Key
- [ ] In Render Dashboard → Account Settings
- [ ] Create API Token
- [ ] Copy the token

### ✅ Step 3: Setup Azure DevOps
- [ ] Go to Pipelines → Library
- [ ] Create Variable Group: `render-secrets`
- [ ] Add variable: `RENDER_API_KEY` = [your token] (mark as secret)
- [ ] Link variable group to pipeline

### ✅ Step 4: Create Render Services (Choose One)

**Option A - Manual (Recommended First Time):**
```
1. Create PostgreSQL database
2. Create Redis cache
3. Create 5 web services (auth, admin, user, mentor, gateway)
4. Add environment variables to each
```

**Option B - Infrastructure as Code:**
```
# Push render.yaml to repo
# Render can auto-create from it
```

### ✅ Step 5: Run Pipeline
```bash
git add render.yaml azure-pipelines-cd-render.yml
git commit -m "Add Render deployment"
git push origin main
```

---

## Which Pipeline to Use?

### **azure-pipelines-cd-render.yml** (Recommended)
- ✅ Simpler setup
- ✅ Direct API deployment
- ✅ Faster pipeline execution
- ✅ Good for most cases

### **azure-pipelines-cd-render-docker.yml** (Alternative)
- ✅ Explicit Docker builds
- ✅ Better for Docker registry management
- ✅ Useful if you have custom registry setup
- ✅ More control over image versions

---

## Environment Variables You Need

### Per-Service Variables:
```
NODE_ENV=production
PORT=[service-specific port]
DATABASE_URL=postgresql://gupjob:PASSWORD@hostname:5432/gupjob_prod
REDIS_URL=redis://:PASSWORD@hostname:6379
```

### API Gateway Specific:
```
AUTH_SERVICE_URL=https://auth-service-xxxxx.onrender.com
ADMIN_SERVICE_URL=https://admin-service-xxxxx.onrender.com
USER_SERVICE_URL=https://user-service-xxxxx.onrender.com
MENTOR_SERVICE_URL=https://mentor-service-xxxxx.onrender.com
```

### Other Services (if connecting to auth):
```
AUTH_SERVICE_URL=https://auth-service-xxxxx.onrender.com
```

---

## Troubleshooting

### Build fails in pipeline?
→ Check package.json files are valid
→ Verify npm ci works locally

### Services deploy but can't communicate?
→ Use full URLs like: `https://service-name-xxxxx.onrender.com`
→ Check DATABASE_URL format

### RENDER_API_KEY not found?
→ Verify variable group is named exactly: `render-secrets`
→ Check it's linked to the pipeline
→ Refresh pipeline cache

### Dockerfile issues?
→ Use Node 18-bullseye-slim base image
→ Ensure dist/ folder is built before copying

---

## Testing Before Production

1. **Test locally first:**
   ```bash
   npm run build
   npm run start:prod
   ```

2. **Test pipeline on feature branch:**
   ```bash
   git checkout -b feature/test-render
   git push origin feature/test-render
   # Trigger manual pipeline run
   ```

3. **Monitor in Render Dashboard:**
   - Watch logs during deployment
   - Check health endpoints work
   - Verify database connections

---

## Post-Deployment

### Run Migrations:
```bash
# In Render Dashboard → Shell tab
npx prisma migrate deploy
```

### Monitor Services:
- CPU/Memory: Render Dashboard → Metrics
- Logs: Render Dashboard → Logs
- Errors: Check application error logs

### Set Up Alerts:
- Configure in Render Dashboard
- Get notified on deployment failures

---

## File Structure After Setup:

```
.
├── render.yaml                           # ← Infrastructure config
├── azure-pipelines-cd-render.yml         # ← Use this
├── azure-pipelines-cd-render-docker.yml  # ← Or this (alternative)
├── docs/
│   └── RENDER_DEPLOYMENT.md              # ← Full guide
└── services/
    ├── auth/
    ├── admin-service/
    ├── api-gateway/
    ├── mentor-service/
    └── user-service/
```

---

## Need Help?

Check the complete guide: `docs/RENDER_DEPLOYMENT.md`

Resources:
- Render Docs: https://render.com/docs
- Azure DevOps: https://docs.microsoft.com/en-us/azure/devops/pipelines
