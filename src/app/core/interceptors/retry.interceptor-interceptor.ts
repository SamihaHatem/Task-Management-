import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, retry, tap, throwError, timer } from 'rxjs';

interface CacheEntry {
  response: HttpResponse<unknown>;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 30_000;

export const retryInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    cache.clear();
    return next(req);
  }

  const cachedEntry = cache.get(req.urlWithParams);

  if (cachedEntry && cachedEntry.expiresAt > Date.now()) {
    return of(cachedEntry.response.clone());
  }

  if (cachedEntry) {
    cache.delete(req.urlWithParams);
  }

  return next(req).pipe(
    retry({
      count: 2,
      delay: (error, retryCount) => {
        if (error instanceof HttpErrorResponse && (error.status === 0 || error.status >= 500)) {
          return timer(retryCount * 1000);
        }

        return throwError(() => error);
      },
    }),
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(req.urlWithParams, {
          response: event.clone(),
          expiresAt: Date.now() + CACHE_DURATION,
        });
      }
    }),
  );
};
