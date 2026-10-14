variable "name" {
  description = "Environment name (dev, prod)."
  type        = string
}

variable "namespace" {
  description = "Namespace the environment's workloads run in (kubernetes/overlays/<env> uses the same name)."
  type        = string
}

variable "in_cluster_postgres" {
  description = "true: database URLs point at the in-cluster PostgreSQL (kubernetes/components/postgres)."
  type        = bool
  default     = true
}

variable "quota" {
  type = object({
    requests_cpu     = string
    requests_memory  = string
    limits_memory    = string
    requests_storage = string
    pods             = number
  })
}

variable "mail" {
  type = object({
    host = string
    port = number
    user = string
    from = string
  })
}

variable "mail_password" {
  type      = string
  default   = ""
  sensitive = true
}

variable "google_client_id" {
  type    = string
  default = ""
}

variable "external_database_urls" {
  description = "Used when in_cluster_postgres = false. Keys: auth, auth_direct (optional), roadmap, mentor, user."
  type        = map(string)
  default     = {}
  sensitive   = true
}

variable "registry_server" {
  type = string
}

variable "registry_username" {
  type = string
}

variable "registry_password" {
  type      = string
  sensitive = true
}
