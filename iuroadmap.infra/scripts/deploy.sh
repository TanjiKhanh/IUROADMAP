#!/usr/bin/env bash
# Deploy one environment of IUROADMAP: kubernetes/overlays/<env> with every image at <tag>.
# Used by .github/workflows/deploy-k8s.yml and by hand (Git Bash on Windows works):
#
#   IMAGE_PREFIX=ghcr.io/<github-owner>/iuroadmap ./iuroadmap.infra/scripts/deploy.sh <dev|prod> <tag>
#
# Env:
#   IMAGE_PREFIX  registry path; images are <IMAGE_PREFIX>-<service>:<tag>  (required)
#   KUBECONFIG    kubeconfig to use (CI: ci-deployer; by hand: the admin one, through the SSH tunnel)
#   DRY_RUN=1     print the rendered manifests instead of applying them
set -euo pipefail

usage() { echo "usage: IMAGE_PREFIX=ghcr.io/<owner>/iuroadmap $0 <dev|prod> <tag>" >&2; exit 1; }

ENVIRONMENT="${1:-}"
TAG="${2:-}"
[ -n "$ENVIRONMENT" ] && [ -n "$TAG" ] || usage
[ -n "${IMAGE_PREFIX:-}" ] || usage
case "$ENVIRONMENT" in dev | prod) ;; *) usage ;; esac

NAMESPACE="iuroadmap-$ENVIRONMENT"
K8S_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../kubernetes" && pwd)"
RELEASE_DIR="$K8S_DIR/.release/$ENVIRONMENT"
SERVICES=(auth api-gateway roadmap-service mentor-service user-service web)

# A throwaway kustomization (git-ignored) = the overlay + the image of this release
mkdir -p "$RELEASE_DIR"
{
  echo "apiVersion: kustomize.config.k8s.io/v1beta1"
  echo "kind: Kustomization"
  echo "resources:"
  echo "  - ../../overlays/$ENVIRONMENT"
  echo "images:"
  for s in "${SERVICES[@]}"; do
    echo "  - name: iuroadmap/$s"
    echo "    newName: $IMAGE_PREFIX-$s"
    echo "    newTag: \"$TAG\""
  done
} > "$RELEASE_DIR/kustomization.yaml"

if [ "${DRY_RUN:-0}" = "1" ]; then
  kubectl kustomize "$RELEASE_DIR"
  exit 0
fi

echo "==> Deploying $ENVIRONMENT ($NAMESPACE) with tag $TAG"
kubectl apply -k "$RELEASE_DIR"

# PostgreSQL first (the services' migrate step waits for it), then every service
if kubectl -n "$NAMESPACE" get statefulset postgres > /dev/null 2>&1; then
  kubectl -n "$NAMESPACE" rollout status statefulset/postgres --timeout=5m
fi
failed=0
for s in "${SERVICES[@]}"; do
  if ! kubectl -n "$NAMESPACE" rollout status "deployment/$s" --timeout=10m; then
    failed=1
    echo "!! $s did not become ready. Last events and logs:" >&2
    kubectl -n "$NAMESPACE" get pods -l "app.kubernetes.io/name=$s" -o wide >&2 || true
    kubectl -n "$NAMESPACE" logs "deployment/$s" --all-containers --tail=80 >&2 || true
  fi
done

if [ "$failed" = "1" ]; then
  echo "Deploy failed. Roll back with: kubectl -n $NAMESPACE rollout undo deployment/<service>" >&2
  exit 1
fi
echo "==> $ENVIRONMENT is running $TAG"
