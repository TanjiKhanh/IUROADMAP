import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

// Load .env file immediately
dotenv.config();

async function bootstrap() {
  const logger = new Logger('APIGateway');

  const app = await NestFactory.create(AppModule, { bodyParser: false });

  // 1. Enable CORS
  // This is critical because your Frontend (Port 3001/5173) sends requests to Gateway (Port 8080)
  app.enableCors({
    origin: true, // Allow all origins (or specify your frontend URL)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Allow cookies if you use them
  });

  // 2. Start the Gateway
  const PORT = process.env.PORT || 8080;
  await app.listen(PORT , "0.0.0.0");

  logger.log(`🚀 API Gateway running on: http://localhost:${PORT}`);
  logger.log(`➡️  Auth Service Proxy:    ${process.env.AUTH_SERVICE_URL}`);
  logger.log(`➡️  Admin Service Proxy:   ${process.env.ADMIN_SERVICE_URL}`);
  logger.log(`➡️  User Service Proxy:    ${process.env.USER_SERVICE_URL}`);
  logger.log(`➡️  Mentor Service Proxy:  ${process.env.MENTOR_SERVICE_URL}`);
}

bootstrap();