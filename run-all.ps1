param(
  [switch]$Detach
)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir
Write-Host "Starting GUPJOB full stack via Docker Compose..."
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Error "Docker not found in PATH. Please install Docker Desktop and try again."
  exit 1
}
try {
  docker compose down --volumes --remove-orphans
} catch {
  Write-Host "No existing compose stack to stop or remove. Continuing..."
}
if ($Detach) {
  docker compose up --build --detach --remove-orphans
} else {
  docker compose up --build --remove-orphans
}
