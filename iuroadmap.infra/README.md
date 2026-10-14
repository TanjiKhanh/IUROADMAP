# IUROADMAP on a VPS: Kubernetes (k3s) + Terraform

This guide deploys the whole platform (5 backend services, web app, PostgreSQL) to one or more VPSes, with a **dev** and a **prod** environment on the same cluster:

- **Terraform** turns the VPS into a k3s cluster (stage 1). It then sets up TLS, the environments, their secrets and a CI account (stage 2).
- **Kustomize** describes the app. Each service is its own unit with a Deployment, Service, ConfigMap, Secret, NetworkPolicy, HPA and PDB, plus a database of its own.
- **GitHub Actions** builds the images to GHCR and deploys them on every push (`dev` → dev, `main` → prod).

The previous Render/Railway setup ([deploy/README.md](deploy/README.md)) keeps working until you switch over (step 8).

---

## Architecture

```
                        Internet  (DNS A records → VPS IP)
                            │ 80 / 443
┌───────────────────────────▼──────────────────────────────────────────────────────┐
│ VPS · k3s                                                                        │
│  Traefik (ingress, HTTP→HTTPS)   cert-manager (Let's Encrypt)   metrics-server    │
│                                                                                  │
│  namespace iuroadmap-prod  (iuroadmap-dev: same layout, smaller)                 │
│   https://<domain>/        → web  (nginx, React build)                           │
│   https://<domain>/api/*   → api-gateway ──┬─→ auth ─────────────┐               │
│   https://<domain>/health  → api-gateway   ├─→ roadmap-service ──┤               │
│                                            ├─→ mentor-service ───┼─→ postgres    │
│                                            └─→ user-service ─────┘   1 DB/service│
│                                                                      nightly dump│
│  Only web and api-gateway are reachable from Traefik. NetworkPolicies limit every │
│  service to its real callers; the Kubernetes API (6443) is not public.            │
└──────────────────────────────────────────────────────────────────────────────────┘
```

| Service | Port | Called by | Secret (Terraform) | Database | Prod replicas (HPA) |
|---|---|---|---|---|---|
| `web` | 8080 | Traefik | — | — | 2–3 |
| `api-gateway` | 8080 | Traefik | `api-gateway-secrets` | — | 2–4 |
| `auth` | 3000 | gateway | `auth-secrets` | `iuroadmap_auth` | 2–4 |
| `roadmap-service` | 4100 | gateway, auth, mentor, user | `roadmap-service-secrets` | `iuroadmap_roadmap` | 2–4 |
| `mentor-service` | 4001 | gateway, auth, roadmap, user | `mentor-service-secrets` | `iuroadmap_mentor` | 1–2 |
| `user-service` | 4000 | gateway | `user-service-secrets` | `iuroadmap_user` | 1–2 |
| `postgres` | 5432 | the 4 services above, backup job | `postgres-secrets` | — | 1 (StatefulSet) |

Every backend pod first runs `prisma migrate deploy` in an init container, then starts. Dev runs one replica of everything with smaller reservations.

## Folder layout

```
iuroadmap.infra/
├── terraform/
│   ├── 01-cluster/              Stage 1: VPS → k3s over SSH (firewall, server, optional worker nodes)
│   ├── 02-platform/             Stage 2: cert-manager + Let's Encrypt, namespaces, secrets, quotas, CI account
│   │   └── charts/cluster-issuers/
│   └── modules/app-environment/ One environment: namespace, quota, generated secrets, pull secret
├── kubernetes/
│   ├── base/<service>/          One folder per service: Deployment, Service, ConfigMap
│   ├── base/                    Ingress, HTTPS redirect, NetworkPolicies
│   ├── components/postgres/     PostgreSQL + per-service databases + nightly backup
│   └── overlays/dev, prod/      Namespace, domain, sizes; prod adds HPA + PDB
├── scripts/deploy.sh            Renders an overlay with the image tag and applies it (CI and by hand)
└── deploy/README.md             Previous Render / Railway setup
```

Related files outside this folder: [.github/workflows/deploy-k8s.yml](../.github/workflows/deploy-k8s.yml) (CD), [.github/workflows/infra-ci.yml](../.github/workflows/infra-ci.yml) (validates infra PRs), and the Dockerfiles in each `iuroadmap.services/<service>/` and in [iuroadmap.webapp/apps/web/](../iuroadmap.webapp/apps/web/Dockerfile).

---

## 0. What you need

**VPS**
- Ubuntu 22.04/24.04 or Debian 12, with a public IPv4 address and root (or passwordless sudo) over SSH.
- Size for **dev + prod on one VPS**: 4 vCPU, 8 GB RAM, 80 GB SSD. Prod only: 2 vCPU, 4 GB RAM minimum.
- Ports 22, 80 and 443 open in the provider's firewall, if it has one.

**Domain**: two DNS names pointing to the VPS, for example `iuroadmap.example.com` (prod) and `dev.iuroadmap.example.com` (dev). Let's Encrypt needs them to resolve before it can issue certificates. Without a domain, `<VPS-IP>.sslip.io` resolves to the VPS and works for a test.

**On your machine**
| Tool | Windows | macOS / Linux |
|---|---|---|
| Terraform ≥ 1.5 | `winget install Hashicorp.Terraform` | `brew install terraform` |
| kubectl | `winget install Kubernetes.kubectl` | `brew install kubectl` |
| ssh / scp | built in (OpenSSH) | built in |
| bash (for `deploy.sh`) | Git Bash | built in |

---

## 1. Prepare SSH access and DNS

1. Create a key for Terraform and install it on the VPS:
   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/iuroadmap -C iuroadmap-admin
   # Linux/macOS
   ssh-copy-id -i ~/.ssh/iuroadmap.pub root@<VPS-IP>
   # Windows PowerShell
   type $env:USERPROFILE\.ssh\iuroadmap.pub | ssh root@<VPS-IP> "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
   ```
2. Check that it works: `ssh -i ~/.ssh/iuroadmap root@<VPS-IP>`.
3. At your DNS provider, create **A records**: `iuroadmap.example.com` → `<VPS-IP>` and `dev.iuroadmap.example.com` → `<VPS-IP>`.

## 2. Stage 1: create the cluster

```bash
cd iuroadmap.infra/terraform/01-cluster
cp terraform.tfvars.example terraform.tfvars   # set server.host = <VPS-IP>, ssh_private_key_path = "~/.ssh/iuroadmap"
terraform init
terraform apply
```

This configures ufw (only 22/80/443 public), installs k3s and waits until the node is Ready. Re-running `apply` is safe: the installer runs again only when its settings change.

Get the kubeconfig and open the API tunnel (stay in `01-cluster`):

```bash
terraform output -raw kubeconfig_fetch_command   # copy the printed command and run it → ../kubeconfig.yaml
terraform output -raw ssh_tunnel_command         # run it in a SECOND terminal and leave it open
```

Then point kubectl at the cluster:

```bash
# bash / Git Bash
export KUBECONFIG="$(pwd)/../kubeconfig.yaml"
# PowerShell
$env:KUBECONFIG = "$(Resolve-Path ..\kubeconfig.yaml)"

kubectl get nodes        # STATUS = Ready
```

The kubeconfig talks to `https://127.0.0.1:6443`. That address only works while the SSH tunnel is open, because port 6443 is closed to the internet.

**More nodes later:** add them to `agents` in `terraform.tfvars` and run `terraform apply` again. They join the cluster, and k3s spreads the pods across them.

## 3. Stage 2: platform (TLS, environments, secrets)

1. **Registry access.** The images go to GHCR under your GitHub account, and packages of a private repo are private. Create a **classic PAT** with only `read:packages` (GitHub → Settings → Developer settings → Personal access tokens). The cluster uses it to pull. If you make the packages public, leave `registry_username` empty.
2. Configure and apply (with the tunnel still open):
   ```bash
   cd ../02-platform
   cp terraform.tfvars.example terraform.tfvars   # acme_email, registry_*, SMTP and Google client ID per environment
   terraform init
   terraform apply
   ```
3. Check:
   ```bash
   kubectl get clusterissuer               # letsencrypt-prod, letsencrypt-staging: READY True
   kubectl get ns | grep iuroadmap         # iuroadmap-dev, iuroadmap-prod, iuroadmap-system
   kubectl -n iuroadmap-prod get secrets   # auth-secrets, api-gateway-secrets, …, postgres-secrets, ghcr-pull
   ```

Terraform generates `JWT_SECRET`, the two internal API keys and every database password, then stores them as Kubernetes Secrets. Each service only receives the keys it uses. You never type these values, and they live in `terraform.tfstate`, which is git-ignored. **Keep that file safe** (see [Security](#security)).

## 4. Set your domains

The domain appears **3 times** in each overlay, every place marked `# DOMAIN`:
- [kubernetes/overlays/prod/kustomization.yaml](kubernetes/overlays/prod/kustomization.yaml): `iuroadmap.example.com`
- [kubernetes/overlays/dev/kustomization.yaml](kubernetes/overlays/dev/kustomization.yaml): `dev.iuroadmap.example.com`

Commit the change. Optionally, preview what will be applied:
```bash
DRY_RUN=1 IMAGE_PREFIX=ghcr.io/<github-owner>/iuroadmap bash iuroadmap.infra/scripts/deploy.sh dev test | less
```

## 5. Connect GitHub Actions

The deploy job reaches the cluster API through an SSH tunnel. Give it a **tunnel-only user** on the VPS whose key cannot open a shell and can only forward to port 6443:

```bash
# On your machine: key pair for GitHub Actions (no passphrase)
ssh-keygen -t ed25519 -N "" -f ci_deploy_key -C github-actions

# On the VPS (as root)
useradd --create-home --shell /usr/sbin/nologin k8s-tunnel
install -d -m 700 -o k8s-tunnel -g k8s-tunnel /home/k8s-tunnel/.ssh
echo 'restrict,port-forwarding,permitopen="127.0.0.1:6443" <contents of ci_deploy_key.pub>' > /home/k8s-tunnel/.ssh/authorized_keys
chown k8s-tunnel:k8s-tunnel /home/k8s-tunnel/.ssh/authorized_keys && chmod 600 /home/k8s-tunnel/.ssh/authorized_keys
```

In GitHub, go to **Settings → Environments** and create **`k8s-dev`** and **`k8s-prod`**. Enable *Required reviewers* on `k8s-prod`. Add these **secrets** to both:

| Secret | Value |
|---|---|
| `VPS_HOST` | `<VPS-IP>` |
| `VPS_SSH_USER` | `k8s-tunnel` |
| `VPS_SSH_PORT` | optional, default `22` |
| `VPS_SSH_PRIVATE_KEY` | contents of `ci_deploy_key` (then delete the local file) |
| `VPS_SSH_KNOWN_HOSTS` | output of `ssh-keyscan -p 22 <VPS-IP>` |
| `K8S_CI_KUBECONFIG` | output of `terraform output -raw ci_kubeconfig` (in `02-platform`) |

Then add these **variables**:

| Variable | Where | Value |
|---|---|---|
| `APP_HOST` | environment `k8s-dev` / `k8s-prod` | `dev.iuroadmap.example.com` / `iuroadmap.example.com` (enables the smoke test) |
| `VITE_GOOGLE_CLIENT_ID` | repository | Google OAuth client ID baked into the web build. Add both domains to its authorized JavaScript origins |
| `K8S_DEPLOY_ENABLED` | repository | leave unset until step 8 |

`K8S_CI_KUBECONFIG` belongs to the `ci-deployer` ServiceAccount. It can manage the app inside `iuroadmap-dev` and `iuroadmap-prod` only: no Secrets, no namespaces, nothing cluster-wide.

## 6. First deploy

GitHub → **Actions → "Deploy (Kubernetes on VPS)" → Run workflow**, then pick `dev`. The pipeline:
1. Runs Backend CI (build + unit tests).
2. Builds and pushes the 6 images as `ghcr.io/<owner>/iuroadmap-<service>:<commit>`.
3. Opens the tunnel and runs [scripts/deploy.sh](scripts/deploy.sh), which applies the overlay with that tag and waits for PostgreSQL and every service to roll out. It prints the logs of any service that fails.
4. Calls `https://$APP_HOST/health`.

Watch it from your machine:
```bash
kubectl -n iuroadmap-dev get pods -w
kubectl -n iuroadmap-dev get ingress,certificate    # certificate READY True after ~1 minute
```

Then open `https://dev.iuroadmap.example.com`. Repeat the run with `prod` when dev works.

**Deploying by hand** (images for that tag must already exist in GHCR):
```bash
IMAGE_PREFIX=ghcr.io/<github-owner-lowercase>/iuroadmap bash iuroadmap.infra/scripts/deploy.sh dev <commit-sha-12>
```

## 7. Seed the databases (once per environment)

```bash
# Roles, permissions and the first admin account
kubectl -n iuroadmap-dev exec deploy/auth -c auth -- \
  env SEED_ADMIN_EMAIL=admin@example.com SEED_ADMIN_PASSWORD='change-me-now' npx prisma db seed

# Roadmap data
kubectl -n iuroadmap-dev exec deploy/roadmap-service -c roadmap-service -- npx ts-node prisma/seed.ts
```

## 8. Switch from Render/Railway to the cluster

1. Set the repository variable **`K8S_DEPLOY_ENABLED` = `true`**. From then on, a push to `dev` deploys to dev, and a merge into `main` deploys to prod after approval.
2. Disable the old pipelines in the Actions tab ("Backend CD (dev → Render)", "Backend CD (production → Railway)"), or delete `backend-dev.yml` / `backend-prod.yml`. `backend-ci.yml` stays: the new pipeline uses it.
3. If you have real data in Supabase, move it before announcing the new URL (see [Move data from Supabase](#move-data-from-supabase)).

---

## Operations

### Everyday commands
```bash
NS=iuroadmap-prod
kubectl -n $NS get pods,hpa                          # what runs, how many replicas
kubectl -n $NS logs deploy/roadmap-service -f        # follow a service
kubectl -n $NS logs <pod> -c migrate                 # migration output of a pod
kubectl -n $NS rollout restart deployment/auth       # restart (e.g. after a secret change)
kubectl -n $NS rollout undo deployment/auth          # back to the previous version
kubectl top pods -n $NS                              # CPU / memory use
```
To roll everything back to an older release, run `deploy.sh` with that release's tag. The tag is the first 12 characters of the commit SHA.

### Change configuration
| What | Where | Then |
|---|---|---|
| Non-secret setting (URLs, ports, CORS) | `kubernetes/base/<service>/kustomization.yaml` or the overlay | deploy (the ConfigMap name changes, so pods restart on their own) |
| SMTP, Google client ID, registry token, quota | `terraform/02-platform/terraform.tfvars` | `terraform apply`, then `kubectl -n <ns> rollout restart deployment` |
| Replicas / autoscaling | `kubernetes/overlays/prod/hpa.yaml` | deploy |
| CPU / memory per service | `kubernetes/base/<service>/deployment.yaml` | deploy |
| Rotate the JWT secret (logs everyone out) | `terraform apply -replace='module.environment["prod"].random_password.jwt'` | restart the deployments |

Database passwords are written into PostgreSQL only when its volume is first created. Don't regenerate them without running `ALTER ROLE ... PASSWORD` too.

### Database access
```bash
NS=iuroadmap-dev
kubectl -n $NS get secret postgres-secrets -o jsonpath='{.data.POSTGRES_PASSWORD}' | base64 -d; echo
kubectl -n $NS port-forward svc/postgres 5433:5432
# then connect any client to localhost:5433 (user postgres), e.g. Prisma Studio with
# ROADMAP_DATABASE_URL=postgresql://postgres:<password>@localhost:5433/iuroadmap_roadmap
```

### Backups
- `postgres-backup` (CronJob) runs `pg_dump` of the 4 databases every night at 02:00 (Asia/Ho_Chi_Minh) and keeps 7 days on the `postgres-backups` volume.
- Run one now: `kubectl -n iuroadmap-prod create job --from=cronjob/postgres-backup backup-$(date +%s)`
- **The volume is on the same disk as the database. Copy the dumps off the server** regularly. They live under `/var/lib/rancher/k3s/storage/*_iuroadmap-prod_postgres-backups/` on the node:
  ```bash
  scp -r root@<VPS-IP>:'/var/lib/rancher/k3s/storage/*_iuroadmap-prod_postgres-backups/*' ./backups/
  ```
- Restore one database (stop its service first):
  ```bash
  kubectl -n iuroadmap-prod scale deployment/roadmap-service --replicas=0
  kubectl -n iuroadmap-prod exec -i statefulset/postgres -- \
    pg_restore -U postgres --clean --if-exists --no-owner --role=roadmap_svc -d iuroadmap_roadmap < iuroadmap_roadmap.dump
  kubectl -n iuroadmap-prod scale deployment/roadmap-service --replicas=1   # the HPA takes over again
  ```

### Move data from Supabase
For each service: dump the schema it used from Supabase (usually `public`), then restore it as shown above. Restore into the matching database with `--role=<service>_svc` so the service user owns the tables.
```bash
pg_dump --format=custom --no-owner --no-acl --schema=public "<SUPABASE_URL_OF_THE_SERVICE>" > iuroadmap_auth.dump
```
To keep Supabase instead of the in-cluster database, set `in_cluster_postgres = false` and `external_database_urls` in stage 2. Then remove `components: [../../components/postgres]` from the overlay.

### Upgrade k3s / add nodes
- Upgrade: set `k3s_version` (or keep `k3s_channel = "stable"`) in `01-cluster/terraform.tfvars` and run `terraform apply`. The installer upgrades in place.
- Add a node: append it to `agents` and run `terraform apply`. Then raise `maxReplicas` in `overlays/prod/hpa.yaml`.

### Tear down
`terraform destroy` in `02-platform` removes the namespaces, which **deletes the databases**. Destroying `01-cluster` does not uninstall k3s: run `/usr/local/bin/k3s-uninstall.sh` on each node.

---

## Troubleshooting

| Symptom | Check / fix |
|---|---|
| `connection refused 127.0.0.1:6443` (kubectl, Terraform) | The SSH tunnel is not open: `terraform output -raw ssh_tunnel_command` in `01-cluster`. |
| Stage 2 fails on `cluster-issuers` with a webhook error | cert-manager was still starting. Run `terraform apply` again. |
| Certificate stays `READY False` | `kubectl -n <ns> describe certificate iuroadmap-tls` and `kubectl get challenges -A`. DNS must point at the VPS and port 80 must be reachable. Too many attempts hit Let's Encrypt rate limits: switch the Ingress annotation to `letsencrypt-staging` while testing. |
| `ImagePullBackOff` | `ghcr-pull` secret missing or token expired (stage 2 `registry_*`). The image path must be lowercase: `ghcr.io/<owner>/iuroadmap-<service>`. |
| `Init:CrashLoopBackOff` | The migration failed: `kubectl -n <ns> logs <pod> -c migrate`. On first start, PostgreSQL may still be initialising, and the pod retries on its own. |
| `exceeded quota` in events | Raise `quota` for that environment in stage 2 and apply. |
| A service times out calling another | NetworkPolicy: add the caller to the target's policy in [kubernetes/base/network-policies.yaml](kubernetes/base/network-policies.yaml). |
| Deploy job: `Permission denied (publickey)` | `VPS_SSH_USER` / `VPS_SSH_PRIVATE_KEY` / `authorized_keys` of `k8s-tunnel` do not match. |
| Deploy job: `Forbidden` | The CI ServiceAccount lacks a permission for a new resource kind: add it in [terraform/02-platform/ci-deployer.tf](terraform/02-platform/ci-deployer.tf). |

## Security

- `terraform.tfstate` (both stages) contains the k3s token and every generated secret. It is git-ignored. Back it up somewhere private, or move it to a remote backend (S3-compatible bucket, Terraform Cloud) when several people run Terraform.
- The Kubernetes API is never public. People reach it through SSH; CI reaches it through a tunnel-only user plus a namespaced ServiceAccount.
- k3s encrypts Secrets at rest (`secrets-encryption`). Pods run as non-root with all capabilities dropped (except the PostgreSQL entrypoint), and namespaces enforce the `baseline` Pod Security level.
- NetworkPolicies isolate the services; PostgreSQL only accepts the services that own a database.

## Known limitations

- **`auth` has no Prisma migration files.** Only `migration_lock.toml` is committed; its schema was applied with `prisma db push`. So that a fresh database works, the auth init container runs `prisma db push` after `migrate deploy` while no migration exists. `db push` refuses changes that drop data. The proper fix is a baseline migration:
  ```bash
  cd iuroadmap.services/auth
  mkdir -p prisma/migrations/20261014000000_baseline
  npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/20261014000000_baseline/migration.sql
  # every database that already has the tables (Supabase dev/prod, existing cluster environments):
  npx prisma migrate resolve --applied 20261014000000_baseline
  ```
  After that, the `db push` fallback stops running on its own.
- One VPS is one point of failure, and the database sits on its local disk. Off-site backups are what protect the data.
