// gateway/src/utils/logger.ts

import { Logger } from '@nestjs/common';

export class AppLogger extends Logger {
  debug(message: string, context?: string) {
    if (process.env.NODE_ENV !== 'production') {
      super.debug(message, context);
    }
  }

  log(message: string, context?: string) {
    super.log(`[${new Date().toISOString()}] ${message}`, context);
  }

  error(message: string, trace?: string, context?: string) {
    super.error(`[${new Date().toISOString()}] ${message}`, trace, context);
  }

  warn(message: string, context?: string) {
    super.warn(`[${new Date().toISOString()}] ${message}`, context);
  }
}