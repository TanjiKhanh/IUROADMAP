// gateway/src/types/express.d.ts

import { UserPayload } from '@iuroadmap/shared';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}