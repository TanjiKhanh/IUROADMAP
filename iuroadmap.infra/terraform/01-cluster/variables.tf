variable "server" {
  description = "VPS that runs the k3s server (control plane + workloads). Any provider works: Terraform only needs SSH."
  type = object({
    host       = string                   # public IP (the firewall rules need an IP, not a DNS name)
    user       = optional(string, "root") # root, or a user with passwordless sudo
    port       = optional(number, 22)
    private_ip = optional(string) # private-network IP, when agents join over a private network
  })
}

variable "agents" {
  description = "Extra VPSes that join as k3s agents (worker nodes). Leave empty for a single-node cluster."
  type = list(object({
    host       = string
    user       = optional(string, "root")
    port       = optional(number, 22)
    private_ip = optional(string)
  }))
  default = []
}

variable "ssh_private_key_path" {
  description = "Private key Terraform uses to SSH into every node (its public key must be in ~/.ssh/authorized_keys)."
  type        = string
  default     = "~/.ssh/id_ed25519"
}

variable "k3s_channel" {
  description = "k3s release channel (stable, latest, or a minor such as v1.33). Ignored when k3s_version is set."
  type        = string
  default     = "stable"
}

variable "k3s_version" {
  description = "Exact k3s version (e.g. v1.33.4+k3s1). Empty = newest of k3s_channel."
  type        = string
  default     = ""
}

variable "configure_firewall" {
  description = "Configure ufw on every node: allow SSH, 80, 443, cluster traffic; keep the Kubernetes API (6443) private."
  type        = bool
  default     = true
}

variable "api_allowed_cidrs" {
  description = "CIDRs allowed to reach the Kubernetes API on 6443 directly. Empty = API reachable only through an SSH tunnel (recommended)."
  type        = list(string)
  default     = []
}
