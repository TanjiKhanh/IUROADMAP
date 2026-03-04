// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MentorProfileModule } from './modules/mentor-profile/mentor-profile.module';

@Module({
  imports: [
    // Loads your .env file automatically
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    PrismaModule,
    MentorProfileModule,
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}