# One app environment: namespace, quota, generated secrets, one Secret per service, registry pull secret.
# Secret names are referenced by kubernetes/base/<service>/deployment.yaml and kubernetes/components/postgres.

terraform {
  required_providers {
    kubernetes = { source = "hashicorp/kubernetes" }
    random     = { source = "hashicorp/random" }
  }
}

locals {
  # Database per service. Must match kubernetes/components/postgres/initdb/01-service-databases.sh
  databases = {
    auth    = { name = "iuroadmap_auth", user = "auth_svc" }
    roadmap = { name = "iuroadmap_roadmap", user = "roadmap_svc" }
    mentor  = { name = "iuroadmap_mentor", user = "mentor_svc" }
    user    = { name = "iuroadmap_user", user = "user_svc" }
  }

  in_cluster_database_urls = {
    for k, db in local.databases :
    k => "postgresql://${db.user}:${random_password.database[k].result}@postgres:5432/${db.name}?schema=public"
  }

  database_urls   = var.in_cluster_postgres ? local.in_cluster_database_urls : var.external_database_urls
  auth_direct_url = lookup(local.database_urls, "auth_direct", local.database_urls["auth"])

  # Every service validates user JWTs with the same secret (shared JwtGuard)
  jwt = { JWT_SECRET = random_password.jwt.result }

  # x-api-key of the internal/* endpoints: the owner checks it, the callers send it (shared mentor/roadmap clients)
  internal_api_keys = {
    MENTOR_SERVICE_API_KEY  = random_password.internal_api_key["mentor"].result
    ROADMAP_SERVICE_API_KEY = random_password.internal_api_key["roadmap"].result
  }

  # Each service only gets the secrets it uses
  service_secrets = {
    "auth" = merge(local.jwt, local.internal_api_keys, {
      AUTH_DATABASE_URL = local.database_urls["auth"]
      AUTH_DIRECT_URL   = local.auth_direct_url
      MAIL_HOST         = var.mail.host
      MAIL_PORT         = tostring(var.mail.port)
      MAIL_USER         = var.mail.user
      MAIL_PASS         = var.mail_password
      MAIL_FROM         = var.mail.from
      GOOGLE_CLIENT_ID  = var.google_client_id
    })
    "api-gateway" = local.jwt
    "roadmap-service" = merge(local.jwt, local.internal_api_keys, {
      ROADMAP_DATABASE_URL = local.database_urls["roadmap"]
    })
    "mentor-service" = merge(local.jwt, local.internal_api_keys, {
      MENTOR_DATABASE_URL = local.database_urls["mentor"]
    })
    "user-service" = merge(local.jwt, local.internal_api_keys, {
      USER_DATABASE_URL = local.database_urls["user"]
    })
  }
}

# ---------------------------------------------------------------- namespace + guard rails

resource "kubernetes_namespace_v1" "this" {
  metadata {
    name = var.namespace
    labels = {
      "app.kubernetes.io/part-of"          = "iuroadmap"
      "iuroadmap/environment"              = var.name
      "pod-security.kubernetes.io/enforce" = "baseline"
    }
  }
}

# Caps what the environment can take from the nodes, so dev can never starve prod
resource "kubernetes_resource_quota_v1" "this" {
  metadata {
    name      = "iuroadmap-quota"
    namespace = kubernetes_namespace_v1.this.metadata[0].name
  }
  spec {
    hard = {
      "requests.cpu"           = var.quota.requests_cpu
      "requests.memory"        = var.quota.requests_memory
      "limits.memory"          = var.quota.limits_memory
      "requests.storage"       = var.quota.requests_storage
      "persistentvolumeclaims" = "5"
      "pods"                   = tostring(var.quota.pods)
    }
  }
}

# Defaults for containers that set no resources (e.g. cert-manager's HTTP-01 solver), required by the quota
resource "kubernetes_limit_range_v1" "this" {
  metadata {
    name      = "iuroadmap-defaults"
    namespace = kubernetes_namespace_v1.this.metadata[0].name
  }
  spec {
    limit {
      type            = "Container"
      default_request = { cpu = "25m", memory = "64Mi" }
      default         = { memory = "256Mi" }
    }
  }
}

# ---------------------------------------------------------------- generated secrets (kept in Terraform state)

resource "random_password" "jwt" {
  length  = 64
  special = false
}

resource "random_password" "internal_api_key" {
  for_each = toset(["mentor", "roadmap"])
  length   = 48
  special  = false
}

# Alphanumeric only: they are embedded in connection URLs
resource "random_password" "postgres_superuser" {
  length  = 32
  special = false
}

resource "random_password" "database" {
  for_each = local.databases
  length   = 32
  special  = false
}

# ---------------------------------------------------------------- Kubernetes Secrets

resource "kubernetes_secret_v1" "service" {
  # Static keys: for_each must not depend on sensitive values
  for_each = toset(["auth", "api-gateway", "roadmap-service", "mentor-service", "user-service"])

  metadata {
    name      = "${each.key}-secrets"
    namespace = kubernetes_namespace_v1.this.metadata[0].name
    labels    = { "app.kubernetes.io/name" = each.key }
  }
  data = local.service_secrets[each.key]
}

# Read by the PostgreSQL StatefulSet: superuser + the password of each service's database user.
# The init script only runs on an empty data volume: changing these later needs ALTER ROLE as well.
resource "kubernetes_secret_v1" "postgres" {
  count = var.in_cluster_postgres ? 1 : 0

  metadata {
    name      = "postgres-secrets"
    namespace = kubernetes_namespace_v1.this.metadata[0].name
    labels    = { "app.kubernetes.io/name" = "postgres" }
  }
  data = {
    POSTGRES_USER       = "postgres"
    POSTGRES_PASSWORD   = random_password.postgres_superuser.result
    AUTH_DB_PASSWORD    = random_password.database["auth"].result
    ROADMAP_DB_PASSWORD = random_password.database["roadmap"].result
    MENTOR_DB_PASSWORD  = random_password.database["mentor"].result
    USER_DB_PASSWORD    = random_password.database["user"].result
  }
}

# imagePullSecrets: ghcr-pull in every Deployment. Without credentials the images must be public.
resource "kubernetes_secret_v1" "registry" {
  count = var.registry_username != "" ? 1 : 0

  metadata {
    name      = "ghcr-pull"
    namespace = kubernetes_namespace_v1.this.metadata[0].name
  }
  type = "kubernetes.io/dockerconfigjson"
  data = {
    ".dockerconfigjson" = jsonencode({
      auths = {
        (var.registry_server) = {
          username = var.registry_username
          password = var.registry_password
          auth     = base64encode("${var.registry_username}:${var.registry_password}")
        }
      }
    })
  }
}
