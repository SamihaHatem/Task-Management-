import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { retry, throwError, timer } from 'rxjs';

export const retryInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  return next(req).pipe(
    retry({
      count: 2,
      delay: (error, retryCount) => {
        if (
          error instanceof HttpErrorResponse &&
          (error.status === 0 || error.status >= 500)
        ) {
          return timer(retryCount * 1000);
        }

        return throwError(() => error);
      },
    }),
  );
};
