// gateway/src/config/service-urls.config.ts

export const ServiceUrls = {
  ROADMAP_SERVICE: process.env.ROADMAP_SERVICE_URL || 'http://127.0.0.1:4100',
  USER_SERVICE: process.env.USER_SERVICE_URL || 'http://127.0.0.1:4000',
  MENTOR_SERVICE: process.env.MENTOR_SERVICE_URL || 'http://127.0.0.1:4001',
  AUTH_SERVICE: process.env.AUTH_SERVICE_URL || 'http://127.0.0.1:3000',
};