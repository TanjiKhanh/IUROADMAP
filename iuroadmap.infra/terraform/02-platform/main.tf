# Stage 2: everything inside the cluster that is not the app itself.
#   - cert-manager + Let's Encrypt ClusterIssuers (TLS for the Ingress, HTTP-01 through Traefik)
#   - one namespace per environment with its secrets, quota and registry pull secret (modules/app-environment)
#   - a CI ServiceAccount that can only deploy into those namespaces (ci-deployer.tf)
# The workloads themselves are Kustomize manifests in ../../kubernetes, applied by scripts/deploy.sh.

resource "helm_release" "cert_manager" {
  name             = "cert-manager"
  repository       = "https://charts.jetstack.io"
  chart            = "cert-manager"
  version          = var.cert_manager_version
  namespace        = "cert-manager"
  create_namespace = true
  wait             = true
  wait_for_jobs    = true
  timeout          = 600

  values = [yamlencode({
    crds = { enabled = true }
  })]
}

# Local chart: ClusterIssuer is a cert-manager CRD, which does not exist before the release above
resource "helm_release" "cluster_issuers" {
  name      = "cluster-issuers"
  chart     = "${path.module}/charts/cluster-issuers"
  namespace = "cert-manager"

  values = [yamlencode({
    email            = var.acme_email
    ingressClassName = "traefik"
  })]

  depends_on = [helm_release.cert_manager]
}

module "environment" {
  source   = "../modules/app-environment"
  for_each = var.environments

  name                = each.key
  namespace           = "iuroadmap-${each.key}"
  in_cluster_postgres = each.value.in_cluster_postgres
  quota               = each.value.quota
  mail                = each.value.mail
  google_client_id    = each.value.google_client_id

  mail_password          = try(var.environment_secrets[each.key].mail_password, "")
  external_database_urls = try(var.environment_secrets[each.key].external_database_urls, {})

  registry_server   = var.registry_server
  registry_username = var.registry_username
  registry_password = var.registry_password
}
