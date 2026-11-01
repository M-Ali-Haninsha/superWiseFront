import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { AUTH_ROLE } from './http';

/**
 * Adds the role's token to requests marked with asRole(), and ends the session
 * when the API says the token is no longer valid or the account is blocked.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const role = req.context.get(AUTH_ROLE);
  if (!role) return next(req);

  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getToken(role);
  const authorized = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authorized).pipe(
    catchError((error: unknown) => {
      const message = error instanceof HttpErrorResponse ? (error.error as { message?: string })?.message : undefined;
      const sessionEnded =
        error instanceof HttpErrorResponse &&
        (error.status === 401 || (error.status === 403 && message === 'Your account has been blocked'));

      if (sessionEnded) {
        auth.logout(role);
        void Swal.fire({
          icon: 'error',
          title: error.status === 401 ? 'Session expired' : 'Account blocked',
          text:
            error.status === 401
              ? 'Your session has expired. Please log in again.'
              : 'Your account has been blocked. Please contact support.',
          confirmButtonColor: '#3085d6',
        }).then(() => router.navigate([auth.loginRoute(role)]));
      }
      return throwError(() => error);
    }),
  );
};
