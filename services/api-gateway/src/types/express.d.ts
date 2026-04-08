// gateway/src/types/express.d.ts

import { UserPayload } from '../common/decorators/current-user.decorator';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}