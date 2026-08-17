# Kubernetes Manifests

This folder contains a Kustomize-based setup with three layers:

- `base/`: shared resources for all environments
- `dev/`: development overlays
- `prod/`: production overlays

## Apply

```bash
kubectl apply -k infra/k8s/dev
kubectl apply -k infra/k8s/prod
```

## Notes

- Replace image names with your registry/repository.
- Update host in each overlay ingress patch.
- If your cluster does not have an ingress controller, install one (for example NGINX Ingress) or remove ingress resources.
