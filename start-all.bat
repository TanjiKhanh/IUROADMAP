@echo off
echo Booting up GUPJOB Microservices...

:: 1. Start API Gateway
start "API Gateway" cmd /k "cd services\api-gateway && npm run start:dev"

:: 2. Start Auth Service
start "Auth Service" cmd /k "cd services\auth && npm run start:dev"

:: 3. Start Admin Service
start "Admin Service" cmd /k "cd services\admin-service && npm run start:dev"

:: 4. Start Mentor Service
start "Mentor Service" cmd /k "cd services\mentor-service && npm run dev"

:: 5. Start User Service
start "User Service" cmd /k "cd services\user-service && npm run start:dev"

echo All services have been launched in separate windows!