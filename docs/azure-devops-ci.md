# Azure DevOps Continuous Integration (CI)

This document explains how to set up a CI pipeline for the **gupjob** monorepo (specifically the `user-service`, but the same principles apply to other services) on Azure DevOps.

The pipeline will perform the following steps:

1. Checkout code from repository
2. Install Node.js and other tooling
3. Install dependencies for the service being built
4. Run linting/formatting (optional)
5. Execute unit and integration tests using Jest
6. Build/compile the service (TypeScript to JavaScript)
7. Publish build artifacts or container images

A sample `azure-pipelines.yml` is provided below; modify paths/commands as needed.

---

## Sample `azure-pipelines.yml`

```yaml
trigger:
  branches:
    include:
      - main
      - master
      - develop

pr:
  branches:
    include:
      - '*'

pool:
  vmImage: 'ubuntu-latest'

variables:
  # Node version used across services
  nodeVersion: '18.x'

stages:
  - stage: Build
    displayName: 'Install & Test'
    jobs:
      - job: UserService
        displayName: 'User Service'
        workspace:
          clean: all
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: '$(nodeVersion)'
            displayName: 'Use Node.js $(nodeVersion)'

          - script: |
              cd services/user-service
              npm ci
            displayName: 'Install dependencies (user-service)'

          - script: |
              cd services/user-service
              npm run lint || echo "lint step skipped"
            displayName: 'Run linter (optional)'
            continueOnError: true

          - script: |
              cd services/user-service
              npx jest --passWithNoTests --runInBand
            displayName: 'Run Jest unit & e2e tests'

          - script: |
              cd services/user-service
              npm run build
            displayName: 'Compile TypeScript'

          # publish build output if needed
          - publish: 'services/user-service/dist'
            artifact: 'user-service-dist'

  # Additional stages (e.g. publish container, deploy) can be added here
```

> **NOTE:** adjust the `cd` paths if your pipeline operates from a different root or if you're building multiple services in parallel.

---

## Setting up the pipeline in Azure DevOps

1. Navigate to your Azure DevOps **Project**.
2. Select **Pipelines** → **New pipeline**.
3. Choose your repository (GitHub, Azure Repos, etc.).
4. When prompted for a configuration, select **Existing Azure Pipelines YAML file** and point to the above `azure-pipelines.yml` file in the repo (e.g. at project root or `services/user-service/azure-pipelines.yml`).
5. Save and run the pipeline. The first run will install Node and execute the steps defined.
6. Review test results and build artifacts under the run summary.

You can extend the YAML with other tasks such as publishing Docker images, running security scans, or deploying to environments.

---

### Tips

* Use pipeline variables or variable groups to store secrets (JWT keys, database URLs) and reference them with `$(VARIABLE_NAME)`.
* Cache `~/.npm` to speed up repeated builds.
* If your repo contains multiple services, consider using separate jobs (or stages) per service, or a matrix job.

---

By following the above instructions you will have a functional CI pipeline on Azure DevOps that runs tests and builds your Node/TypeScript services automatically on each commit or pull request.