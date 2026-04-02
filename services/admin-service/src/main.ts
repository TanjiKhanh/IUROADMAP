import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // 1. Enable Global Validation
  // This ensures your DTO decorators (@IsString, @IsNotEmpty) actually work
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips out properties not in the DTO
      transform: true, // Automatically transforms payloads to DTO instances
      forbidNonWhitelisted: true, // Throws error if extra fields are sent
    }),
  );

  // 2. Enable CORS (Cross-Origin Resource Sharing)
  // Essential if your Frontend is on a different port (e.g., localhost:3000 vs 4100)
  app.enableCors();

  // 3. Start Server
  const port = process.env.PORT || 4100; // Default to 4100 for Admin Service
  await app.listen(port , "0.0.0.0");
  
  logger.log(`🚀 Admin Service is running on port ${port}`);
}
bootstrap();