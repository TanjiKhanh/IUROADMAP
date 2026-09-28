# Deploy backend: dev trên Render, production trên Railway

| Stage | Nhánh | Nền tảng | Pipeline | Cấu hình nền tảng |
|---|---|---|---|---|
| **dev** | `dev` | Render (gói free) | [`backend-dev.yml`](../../.github/workflows/backend-dev.yml) | [`render.yaml`](../../render.yaml) (Blueprint) |
| **production** | `main` | Railway | [`backend-prod.yml`](../../.github/workflows/backend-prod.yml) | `iuroadmap.services/<service>/railway.json` |

Cả hai đều gọi [`backend-ci.yml`](../../.github/workflows/backend-ci.yml) trước khi deploy.

| Sự kiện | Việc pipeline làm |
|---|---|
| Pull request vào `dev` hoặc `main` | Build production + unit test cho các service có thay đổi. Không deploy. |
| Push lên `dev` | CI. Nếu **mọi** service trong lần chạy đều pass → gọi deploy hook của Render cho từng service. |
| Push lên `main` | CI. Nếu tất cả pass → `railway up` từng service, rồi smoke test `/health` của gateway (khi đã đặt `PROD_GATEWAY_URL`). |
| Chạy tay (tab Actions → *Run workflow*) | Như push, với danh sách service tự chọn (`all` hoặc `auth,api-gateway`). |

Đổi `iuroadmap.services/shared`, `package.json`, `package-lock.json` hoặc một workflow `backend-*.yml` sẽ build và deploy **cả 5 service**.

## Cách build (chung cho Render và Railway)

Mỗi service có `Dockerfile` với build context là **root repo**, vì service dùng `@iuroadmap/shared` qua npm workspaces:

1. `npm ci --workspace=iuroadmap.services/<service> --include-workspace-root`: chỉ cài service đó, `shared` và công cụ build ở root, không cài web.
2. `npx prisma generate` rồi `npm run build:prod`: tsc compile service cùng `shared` (`tsconfig.build.json`), `tsc-alias` đổi import `@iuroadmap/shared` thành đường dẫn tương đối, rồi copy Prisma client vào `dist/`.
3. Chạy bằng `node dist/<service>/src/main.js` (script `start:prod`).

Migration (`prisma migrate deploy`):
- **Railway:** bước pre-deploy trong `railway.json`.
- **Render free:** không có bước pre-deploy, nên `dockerCommand` trong `render.yaml` chạy migration ngay trước khi start.

Build thử ở máy (cần Docker): `docker build -f iuroadmap.services/auth/Dockerfile -t iuroadmap-auth .`

## Database: Supabase, 2 project

Cả 4 service có Prisma đều dùng PostgreSQL trên Supabase. Gói free cho 2 project, nên dùng **một project cho dev và một cho production**: dữ liệu test không bao giờ chạm dữ liệu thật. Project free bị tạm dừng sau khoảng 1 tuần không hoạt động; bật lại trong dashboard Supabase.

## A. Dev trên Render (làm một lần)

1. Render → **New → Blueprint** → chọn repo, nhánh `dev`. Render đọc `render.yaml` và tạo 5 web service `iuroadmap-<service>-dev` cùng env group `iuroadmap-dev-shared`. Group này tự sinh `JWT_SECRET` và các API key nội bộ.
2. Nhập các giá trị Render hỏi (`sync: false`):
   - `*_DATABASE_URL`, `AUTH_DIRECT_URL`: connection string của **Supabase project dev**.
   - `*_SERVICE_URL`: public URL của service tương ứng, ví dụ `AUTH_SERVICE_URL=https://iuroadmap-auth-dev.onrender.com`. Nếu tên đã có người dùng, Render sẽ thêm hậu tố; sau lần tạo đầu, kiểm tra URL thật trong dashboard rồi sửa lại cho đúng.
   - `CORS_ORIGIN`: URL web dev. `MAIL_*`, `GOOGLE_CLIENT_ID`: như `.env` ở máy.
3. Ở mỗi service → **Settings → Deploy Hook** → copy URL.
4. GitHub repo → **Settings → Environments** → tạo environment **`dev`** → thêm 5 secret:

   | Secret | Service Render |
   |---|---|
   | `RENDER_DEPLOY_HOOK_AUTH` | `iuroadmap-auth-dev` |
   | `RENDER_DEPLOY_HOOK_API_GATEWAY` | `iuroadmap-api-gateway-dev` |
   | `RENDER_DEPLOY_HOOK_ROADMAP_SERVICE` | `iuroadmap-roadmap-service-dev` |
   | `RENDER_DEPLOY_HOOK_MENTOR_SERVICE` | `iuroadmap-mentor-service-dev` |
   | `RENDER_DEPLOY_HOOK_USER_SERVICE` | `iuroadmap-user-service-dev` |

5. Đẩy nhánh `dev` lên GitHub: `git push -u origin dev`.

Giới hạn của gói free:
- Service ngủ sau khoảng 15 phút không có request. Request đầu tiên mất tới khoảng 1 phút, và gateway gọi service khác nên có thể phải chờ vài service cùng thức dậy.
- Số giờ chạy miễn phí mỗi tháng được chia cho mọi service.
- Không có shell. Muốn seed thì chạy seed ở máy, trỏ `*_DATABASE_URL` tới Supabase project dev.

## B. Production trên Railway (làm một lần)

1. Tạo project, dùng environment **`production`**.
2. Tạo 5 service **đặt tên đúng bằng tên thư mục**: `auth`, `api-gateway`, `roadmap-service`, `mentor-service`, `user-service`. Tạo dạng *Empty Service*, **không** nối GitHub repo, vì code được đẩy lên từ pipeline bằng `railway up`.
3. Ở mỗi service → **Settings → Config-as-code**, đặt đường dẫn file: `/iuroadmap.services/<service>/railway.json`.
4. Chỉ `api-gateway` có public domain (target port `8080`). Các service khác chỉ nói chuyện qua private network `*.railway.internal`.
5. Railway → Project → **Settings → Tokens** → tạo **Project token** cho environment `production`.
6. GitHub → **Settings → Environments** → tạo environment **`production`** → secret **`RAILWAY_TOKEN`**. Nên bật *Required reviewers* để phải duyệt trước mỗi lần deploy production.
7. (Tuỳ chọn) **Settings → Variables** → repository variable `PROD_GATEWAY_URL` = public URL của gateway, để bật smoke test.

### Biến môi trường trên Railway (environment `production`)

Mọi service: `NODE_ENV=production`, `JWT_SECRET` (giống nhau ở tất cả service), `HOST=::` (private network của Railway cần service lắng nghe IPv6; gateway đã mặc định lắng nghe cả hai), `MENTOR_SERVICE_API_KEY`, `ROADMAP_SERVICE_API_KEY`.

| Service | `PORT` | Biến riêng |
|---|---|---|
| `auth` | `3000` | `AUTH_DATABASE_URL`, `AUTH_DIRECT_URL`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`, `MAIL_FROM`, `GOOGLE_CLIENT_ID`, `MENTOR_SERVICE_URL`, `ROADMAP_SERVICE_URL` |
| `api-gateway` | `8080` | `AUTH_SERVICE_URL`, `USER_SERVICE_URL`, `MENTOR_SERVICE_URL`, `ROADMAP_SERVICE_URL`, `CORS_ORIGIN` |
| `roadmap-service` | `4100` | `ROADMAP_DATABASE_URL`, `MENTOR_SERVICE_URL` |
| `mentor-service` | `4001` | `MENTOR_DATABASE_URL`, `ROADMAP_SERVICE_URL` |
| `user-service` | `4000` | `USER_DATABASE_URL`, `ROADMAP_SERVICE_URL`, `MENTOR_SERVICE_URL` |

`*_DATABASE_URL` trỏ tới **Supabase project production**. URL giữa các service dùng private network, ví dụ:

```
AUTH_SERVICE_URL=http://${{auth.RAILWAY_PRIVATE_DOMAIN}}:${{auth.PORT}}
ROADMAP_SERVICE_URL=http://${{roadmap-service.RAILWAY_PRIVATE_DOMAIN}}:${{roadmap-service.PORT}}
```

### SSH key của workspace Railway

Key đăng ký ở **Workspace SSH Keys** dùng để vào container production đang chạy (`railway ssh`). Pipeline **không cần** key này: deploy dùng `RAILWAY_TOKEN`. Chỉ đăng ký **public key**; private key giữ trên máy.

Seed lần đầu qua SSH:

```bash
cd /app/iuroadmap.services/auth && npx prisma db seed                        # role, permission, admin
cd /app/iuroadmap.services/roadmap-service && npx ts-node prisma/seed.ts     # dữ liệu roadmap
```
