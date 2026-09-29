import { Transform } from 'class-transformer';
import { normalizeEmail } from '../utils/email.util';

/** Trims and lowercases an email field before it is validated (BR-AUTH-01) */
export const NormalizeEmail = (): PropertyDecorator =>
  Transform(({ value }) => (typeof value === 'string' ? normalizeEmail(value) : value));
