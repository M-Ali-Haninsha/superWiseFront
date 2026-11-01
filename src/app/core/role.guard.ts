import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../models/api.models';
import { AuthService } from './auth.service';

/** Lets the route through only when the given role is logged in. */
export function roleGuard(role: Role, redirectTo?: string): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    return auth.isLoggedIn(role) || inject(Router).parseUrl(redirectTo ?? auth.loginRoute(role));
  };
}
