import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, retryWhen } from 'rxjs/operators';

const DEFAULT_MAX_RETRIES = 5;
const DEFAULT_BACKOFF = 1000;

// tslint:disable-next-line: typedef
export function retryWithBackoff(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES,
                                 backoffMs = DEFAULT_BACKOFF) {
  let retries = maxRetry;

  return (src: Observable<any>) =>
    src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
        mergeMap(error => {
          console.log(error);

          if (error.status === 401) {

            if (error.headers.has('Token-Expired')) {
              if (error.headers.get('Token-Expired')) {
                if (retries-- > 0) {
                  if (retries === 3 || retries === 1) {
                    return throwError('error from retryWithBackoff observable: exit early');
                  }
                  const backoffTime = delayMs + (maxRetry - retries) * backoffMs;
                  return of(error).pipe(delay(backoffTime));
                }
                return throwError('error from retryWithBackoff observable');
              }
            }

          }

          return throwError('This is the error after ');
        })
      )
    ));
}
