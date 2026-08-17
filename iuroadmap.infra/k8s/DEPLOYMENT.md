# Kubernetes Deployment Guide

## Quick Start

Deploy dev environment:
```bash
kubectl apply -k infra/k8s/dev
```

Deploy prod environment:
```bash
kubectl apply -k infra/k8s/prod
```

## Structure

```
infra/k8s/
├── base/                    # Shared base resources
│   ├── kustomization.yaml   # Base kustomization
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── api-gateway.yaml
│   ├── auth-service.yaml
│   ├── admin-service.yaml
│   ├── user-service.yaml
│   ├── mentor-service.yaml
│   └── ingress.yaml
├── dev/                     # Development overlay
│   ├── kustomization.yaml   # Dev patches & image tags
│   └── configmap-dev.yaml
├── prod/                    # Production overlay
│   ├── kustomization.yaml   # Prod patches & image tags
│   ├── hpa.yaml            # Autoscaling policies
│   └── configmap-prod.yaml
└── README.md
```

## Key Differences

### Base
- 1 replica per service
- 256Mi memory requests, 512Mi limits
- 100m CPU requests, 500m limits
- ConfigMap with basic config

### Dev
- 1 replica (no autoscaling)
- **128Mi memory requests, 256Mi limits** (smaller)
- **50m CPU requests, 200m limits** (tighter)
- **Image tags: `latest-dev`** (local builds)
- **Debug logging enabled** (LOG_LEVEL=debug, DEBUG=true)
- **Domain: `api.dev.local`** (local testing)
- No ingress TLS

### Prod
- **Multiple replicas per service** (auth: 3, user: 3, admin: 2, mentor: 2, gateway: 2)
- **512Mi memory requests, 1Gi limits** (strict)
- **250m CPU requests, 1000m limits** (reserved)
- **Image tags: `v1.0.0`** (release versions)
- **Horizontal Pod Autoscaler** (scales 2-10 pods based on CPU/memory)
- **Domain: `api.iuroadmap.com`** (production)
- TLS enabled (cert-manager integration)

## Prerequisites

1. NGINX Ingress Controller:
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.0/deploy/static/provider/cloud/deploy.yaml
```

2. (Optional) Cert-manager for TLS:
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
```

## Configuration

### Image Registry
Update image names in base and overlay kustomizations:
```yaml
images:
  - name: gupjob/auth-service
    newTag: v1.0.0
```

### Domain Names
- Dev: `api.dev.local` (add to /etc/hosts for local testing)
- Prod: `api.iuroadmap.com` (configure real DNS)

### Resource Limits
Edit `base/*/service.yaml` or overlay patches to adjust memory/CPU based on load testing.

### Autoscaling Thresholds
Edit `prod/hpa.yaml` to adjust CPU/memory targets or min/max replicas.

## Verification

Check deployment status:
```bash
kubectl get deployments -n iuroadmap
kubectl get pods -n iuroadmap
kubectl get ingress -n iuroadmap
```

Check HPA status (prod only):
```bash
kubectl get hpa -n iuroadmap
```

View logs:
```bash
kubectl logs -n iuroadmap -l app=auth-service
```

## Cleanup

Remove entire environment:
```bash
kubectl delete ns iuroadmap
```

Or use Kustomize:
```bash
kubectl delete -k infra/k8s/dev
kubectl delete -k infra/k8s/prod
```
