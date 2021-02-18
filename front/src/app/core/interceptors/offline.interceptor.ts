import { OnlineService } from './../services/online.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retryWhen, switchMap } from 'rxjs/operators';

@Injectable()
export class OfflineInterceptor implements HttpInterceptor {

  constructor(
    private onlineService: OnlineService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retryWhen(errors => {
        if (this.onlineService.isOnline) {
          return errors.pipe(switchMap(err => throwError(err)));
        }

        return this.onlineService.onlineChanges;
      })
    );
  }

}
