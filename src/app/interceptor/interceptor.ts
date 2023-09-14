import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userType = req.headers.get('usertype');
    const item = userType ? sessionStorage.getItem(userType) : '';
    const token = item ? JSON.parse(item).token : null;

    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          const errorResponse = error.error;
          if (errorResponse.message === 'session has expired') {
            const userType = req.headers.get('usertype');

            if (userType === 'adminValue') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your  session has expired. You will be redirected to the login page.',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  sessionStorage.removeItem('adminValue');
                  this.router.navigate(['/admin']);
                }
              });
            } else if (userType === 'workerValue') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your  session has expired. You will be redirected to the login page.',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  sessionStorage.removeItem('workerValue');
                  this.router.navigate(['/workerLogin']);
                }
              });
            } else if (userType === 'userValue') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your  session has expired. You will be redirected to the login page.',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  sessionStorage.removeItem('userValue');
                  this.router.navigate(['/userLogin']);
                }
              });
            }
          } else {
          }
        }

        return throwError(error);
      })
    );
  }
}
