// gateway/src/config/service-urls.config.ts

export const ServiceUrls = {
  ADMIN_SERVICE: process.env.ADMIN_SERVICE_URL || 'http://localhost:4100:',
  USER_SERVICE: process.env.USER_SERVICE_URL || 'http://localhost:4000',
  MENTOR_SERVICE: process.env.MENTOR_SERVICE_URL || 'http://localhost:4001',
  AUTH_SERVICE: process.env.AUTH_SERVICE_URL || 'http://localhost:3000',
};