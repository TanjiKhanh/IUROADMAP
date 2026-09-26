import { Module } from '@nestjs/common';
import { CourseOfferingsController } from './controllers/course-offerings.controller';
import { OfferingTopicsController } from './controllers/offering-topics.controller';
import { CourseOfferingsService } from './services/course-offerings.service';
import { OfferingTopicsService } from './services/offering-topics.service';

@Module({
  controllers: [CourseOfferingsController, OfferingTopicsController],
  providers: [CourseOfferingsService, OfferingTopicsService],
  exports: [CourseOfferingsService, OfferingTopicsService],
})
export class CourseOfferingModule {}
