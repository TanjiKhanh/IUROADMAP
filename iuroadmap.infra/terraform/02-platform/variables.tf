variable "kubeconfig_path" {
  description = "Admin kubeconfig fetched after stage 1."
  type        = string
  default     = "../kubeconfig.yaml"
}

variable "kubeconfig_context" {
  description = "Context inside the kubeconfig (k3s names it \"default\"). null = current context."
  type        = string
  default     = null
}

variable "acme_email" {
  description = "Email for the Let's Encrypt account (certificate expiry notices)."
  type        = string
}

variable "cert_manager_version" {
  description = "cert-manager Helm chart version (https://cert-manager.io/docs/releases/)."
  type        = string
  default     = "v1.18.2"
}

variable "registry_server" {
  description = "Container registry the cluster pulls the app images from."
  type        = string
  default     = "ghcr.io"
}

variable "registry_username" {
  description = "Registry user (your GitHub username for GHCR). Empty = images are public, no pull secret."
  type        = string
  default     = ""
}

variable "registry_password" {
  description = "Registry token (GitHub classic PAT with read:packages for GHCR)."
  type        = string
  default     = ""
  sensitive   = true
}

variable "ci_api_server" {
  description = "API address written into the CI kubeconfig. Default: the SSH tunnel the deploy workflow opens."
  type        = string
  default     = "https://127.0.0.1:6443"
}

variable "environments" {
  description = "One entry per app environment; each gets the namespace iuroadmap-<key> with its own secrets and database."
  type = map(object({
    # false = use external databases (environment_secrets.<env>.external_database_urls), e.g. Supabase
    in_cluster_postgres = optional(bool, true)

    quota = optional(object({
      requests_cpu     = optional(string, "2")
      requests_memory  = optional(string, "4Gi")
      limits_memory    = optional(string, "8Gi")
      requests_storage = optional(string, "50Gi")
      pods             = optional(number, 40)
    }), {})

    mail = optional(object({
      host = optional(string, "")
      port = optional(number, 587)
      user = optional(string, "")
      from = optional(string, "")
    }), {})

    google_client_id = optional(string, "")
  }))

  default = {
    dev  = {}
    prod = {}
  }
}

variable "environment_secrets" {
  description = "Secret settings per environment (same keys as environments)."
  type = map(object({
    mail_password = optional(string, "")
    # Only with in_cluster_postgres = false. Keys: auth, auth_direct, roadmap, mentor, user
    external_database_urls = optional(map(string), {})
  }))
  default   = {}
  sensitive = true
}
