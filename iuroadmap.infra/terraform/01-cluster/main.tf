# Stage 1: turn plain VPSes into a k3s cluster over SSH.
# k3s ships what the app needs: Traefik (ingress on 80/443), ServiceLB, local-path storage, metrics-server (HPA),
# and a NetworkPolicy controller. Stage 2 (../02-platform) configures the cluster itself.

locals {
  ssh_private_key = file(pathexpand(var.ssh_private_key_path))

  # Address the agents use to reach the server
  server_address = coalesce(var.server.private_ip, var.server.host)

  # Every node address: nodes accept each other's traffic through the firewall
  node_addresses = distinct(compact(concat(
    [var.server.host, var.server.private_ip],
    flatten([for a in var.agents : [a.host, a.private_ip]]),
  )))

  install = {
    k3s_channel = var.k3s_channel
    k3s_version = var.k3s_version
  }

  server_script = templatefile("${path.module}/templates/install-server.sh.tftpl", merge(local.install, {
    token            = random_password.k3s_token.result
    tls_sans         = distinct(compact([var.server.host, var.server.private_ip]))
    node_ip          = var.server.private_ip == null ? "" : var.server.private_ip
    node_external_ip = var.server.host
    kube_user        = var.server.user
    firewall         = local.firewall[var.server.host]
  }))

  agent_scripts = {
    for a in var.agents : a.host => templatefile("${path.module}/templates/install-agent.sh.tftpl", merge(local.install, {
      token            = random_password.k3s_token.result
      server_address   = local.server_address
      node_ip          = a.private_ip == null ? "" : a.private_ip
      node_external_ip = a.host
      firewall         = local.firewall[a.host]
    }))
  }

  firewall = {
    for n in concat([var.server], var.agents) : n.host => var.configure_firewall ? templatefile("${path.module}/templates/firewall.sh.tftpl", {
      ssh_port          = n.port
      node_addresses    = local.node_addresses
      api_allowed_cidrs = var.api_allowed_cidrs
    }) : "echo 'Firewall: skipped (configure_firewall = false)'"
  }
}

# Shared secret the agents present to join the server
resource "random_password" "k3s_token" {
  length  = 48
  special = false
}

resource "terraform_data" "server" {
  # Re-run the (idempotent) installer whenever its rendered script changes
  triggers_replace = sha256(local.server_script)

  connection {
    type        = "ssh"
    host        = var.server.host
    user        = var.server.user
    port        = var.server.port
    private_key = local.ssh_private_key
  }

  provisioner "file" {
    content     = local.server_script
    destination = "/tmp/iuroadmap-k3s-server.sh"
  }

  provisioner "remote-exec" {
    inline = [
      "if [ \"$(id -u)\" -eq 0 ]; then sh /tmp/iuroadmap-k3s-server.sh; else sudo -n sh /tmp/iuroadmap-k3s-server.sh; fi",
    ]
  }
}

resource "terraform_data" "agent" {
  for_each = { for a in var.agents : a.host => a }

  triggers_replace = sha256(local.agent_scripts[each.key])

  connection {
    type        = "ssh"
    host        = each.value.host
    user        = each.value.user
    port        = each.value.port
    private_key = local.ssh_private_key
  }

  provisioner "file" {
    content     = local.agent_scripts[each.key]
    destination = "/tmp/iuroadmap-k3s-agent.sh"
  }

  provisioner "remote-exec" {
    inline = [
      "if [ \"$(id -u)\" -eq 0 ]; then sh /tmp/iuroadmap-k3s-agent.sh; else sudo -n sh /tmp/iuroadmap-k3s-agent.sh; fi",
    ]
  }

  depends_on = [terraform_data.server]
}
