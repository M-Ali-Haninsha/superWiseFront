import { HttpContext, HttpContextToken, HttpErrorResponse } from '@angular/common/http';
import { Role } from '../models/api.models';

/** Which logged-in role's token a request should carry, if any. */
export const AUTH_ROLE = new HttpContextToken<Role | null>(() => null);

/** Request options that make the interceptor attach the given role's token. */
export function asRole(role: Role): { context: HttpContext } {
  return { context: new HttpContext().set(AUTH_ROLE, role) };
}

/** The API's error message, or a fallback for network/unknown errors. */
export function errorMessage(err: unknown, fallback = 'Something went wrong, please try again'): string {
  if (err instanceof HttpErrorResponse) {
    const body = err.error as { message?: unknown } | null;
    if (body && typeof body.message === 'string') return body.message;
    if (err.status === 0) return 'Cannot reach the server, please check your connection';
  }
  return fallback;
}
