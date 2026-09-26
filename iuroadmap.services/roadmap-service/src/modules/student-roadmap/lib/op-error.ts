/** Validation error raised by the pure overlay logic; the service maps it to an HTTP error. */
export class OpError extends Error {
  constructor(
    readonly status: 400 | 404 | 409,
    readonly code: string,
    message: string,
    readonly extra?: Record<string, unknown>,
  ) {
    super(message);
  }
}
