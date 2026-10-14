# ServiceAccount used by .github/workflows/deploy-k8s.yml. It can manage the app's resources inside the
# environment namespaces and nothing else: no Secrets (Terraform owns them), no namespaces, no cluster objects.

locals {
  write_verbs = ["get", "list", "watch", "create", "update", "patch", "delete"]
  read_verbs  = ["get", "list", "watch"]
}

resource "kubernetes_namespace_v1" "system" {
  metadata {
    name   = "iuroadmap-system"
    labels = { "app.kubernetes.io/part-of" = "iuroadmap" }
  }
}

resource "kubernetes_service_account_v1" "ci_deployer" {
  metadata {
    name      = "ci-deployer"
    namespace = kubernetes_namespace_v1.system.metadata[0].name
  }
}

resource "kubernetes_cluster_role_v1" "deployer" {
  metadata {
    name = "iuroadmap-deployer"
  }

  rule {
    api_groups = [""]
    resources  = ["configmaps", "services", "persistentvolumeclaims"]
    verbs      = local.write_verbs
  }
  rule {
    api_groups = [""]
    resources  = ["pods", "pods/log", "events", "endpoints"]
    verbs      = local.read_verbs
  }
  rule {
    api_groups = ["apps"]
    resources  = ["deployments", "statefulsets"]
    verbs      = local.write_verbs
  }
  rule {
    api_groups = ["apps"]
    resources  = ["replicasets", "controllerrevisions"]
    verbs      = local.read_verbs
  }
  rule {
    api_groups = ["batch"]
    resources  = ["cronjobs", "jobs"]
    verbs      = local.write_verbs
  }
  rule {
    api_groups = ["networking.k8s.io"]
    resources  = ["ingresses", "networkpolicies"]
    verbs      = local.write_verbs
  }
  rule {
    api_groups = ["autoscaling"]
    resources  = ["horizontalpodautoscalers"]
    verbs      = local.write_verbs
  }
  rule {
    api_groups = ["policy"]
    resources  = ["poddisruptionbudgets"]
    verbs      = local.write_verbs
  }
  rule {
    api_groups = ["traefik.io"]
    resources  = ["middlewares"]
    verbs      = local.write_verbs
  }
  rule {
    api_groups = ["cert-manager.io"]
    resources  = ["certificates"]
    verbs      = local.read_verbs
  }
}

resource "kubernetes_role_binding_v1" "ci_deployer" {
  for_each = var.environments

  metadata {
    name      = "ci-deployer"
    namespace = module.environment[each.key].namespace
  }
  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = kubernetes_cluster_role_v1.deployer.metadata[0].name
  }
  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account_v1.ci_deployer.metadata[0].name
    namespace = kubernetes_namespace_v1.system.metadata[0].name
  }
}

# Long-lived token for the ServiceAccount (rotate: terraform apply -replace=kubernetes_secret_v1.ci_deployer_token)
resource "kubernetes_secret_v1" "ci_deployer_token" {
  metadata {
    name      = "ci-deployer-token"
    namespace = kubernetes_namespace_v1.system.metadata[0].name
    annotations = {
      "kubernetes.io/service-account.name" = kubernetes_service_account_v1.ci_deployer.metadata[0].name
    }
  }
  type                           = "kubernetes.io/service-account-token"
  wait_for_service_account_token = true
}
