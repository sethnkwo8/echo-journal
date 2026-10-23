// frontend/src/lib/auth/errors.ts

export const SESSION_EXPIRED_MESSAGE = "SESSION_EXPIRED";

export class SessionExpiredError extends Error {
  constructor(message = SESSION_EXPIRED_MESSAGE) {
    super(message);
    this.name = "SessionExpiredError";
  }
}

export function isSessionExpiredError(error: unknown): boolean {
  if (error instanceof SessionExpiredError) return true;
  if (error instanceof Error && error.message === SESSION_EXPIRED_MESSAGE) {
    return true;
  }
  return false;
}