output "namespaces" {
  value = { for env, m in module.environment : env => m.namespace }
}

output "ci_kubeconfig" {
  description = "Kubeconfig of the ci-deployer ServiceAccount: store it as the GitHub secret K8S_CI_KUBECONFIG (terraform output -raw ci_kubeconfig)."
  sensitive   = true
  value = yamlencode({
    apiVersion = "v1"
    kind       = "Config"
    clusters = [{
      name = "iuroadmap"
      cluster = {
        server                     = var.ci_api_server
        certificate-authority-data = base64encode(kubernetes_secret_v1.ci_deployer_token.data["ca.crt"])
      }
    }]
    users = [{
      name = "ci-deployer"
      user = { token = kubernetes_secret_v1.ci_deployer_token.data["token"] }
    }]
    contexts = [{
      name    = "iuroadmap-ci"
      context = { cluster = "iuroadmap", user = "ci-deployer" }
    }]
    current-context = "iuroadmap-ci"
  })
}
