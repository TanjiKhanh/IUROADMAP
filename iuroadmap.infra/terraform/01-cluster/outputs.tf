locals {
  ssh_target = "${var.server.user}@${var.server.host}"
  ssh_key    = pathexpand(var.ssh_private_key_path)
}

output "kubeconfig_fetch_command" {
  description = "Copies the admin kubeconfig to iuroadmap.infra/terraform/kubeconfig.yaml (git-ignored). Run it from this folder."
  value       = "scp -i \"${local.ssh_key}\" -P ${var.server.port} ${local.ssh_target}:.kube/config ../kubeconfig.yaml"
}

output "ssh_tunnel_command" {
  description = "Forwards localhost:6443 to the Kubernetes API. Keep it open in a second terminal while you use kubectl or stage 2."
  value       = "ssh -i \"${local.ssh_key}\" -p ${var.server.port} -N -L 6443:127.0.0.1:6443 ${local.ssh_target}"
}

output "server_host" {
  description = "Point the DNS A records of your domains at this address."
  value       = var.server.host
}

output "nodes" {
  value = concat([var.server.host], [for a in var.agents : a.host])
}
