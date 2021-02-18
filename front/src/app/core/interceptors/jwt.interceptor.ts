import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';
import { filter, tap, take, switchMap, finalize } from 'rxjs/operators';
import { ErrorResponse } from '../models/responses.model';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private auth: AuthService,
    private localStorage: LocalStorageService,
    private router: Router,
    private state: RouterStateSnapshot) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
    console.log('Jwt: Intercepted');

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }

    request = this.addAuthenticationToken(request);

    console.log('Token Added or not');

    return next.handle(request)
      .pipe(
        tap(
          () => {},
          (error: HttpErrorResponse) => {

            console.log(error);

            if (error.status === 401) {
              console.log('Status is 401');


              // 401
              // 401 - 1 Wrong Credentials
              // 401 - 2 Refresh Token Expired
              // 401 - 3

              console.log('Moving to wrong credentials and refresh token expired');


              if (error.error) {
                if (error.error.error_code === 1) {
                  console.log('Wrong Creditials');

                }

                if (error.error.error_code === 2) {
                  console.log('Refresh Token expired');
                  console.log('Navigating to auth/login');
                  console.log('Return url: ' + this.router.url);



                  this.router.navigate(['/auth'], { queryParams: { returnUrl: this.auth.returnUrl }});

                  // this.router.navigate(['/auth']);
                }

              }

              if (error.headers.has('Token-Expired')) {
                if (error.headers.get('Token-Expired')) {
                  // console.log('Token Expired');
                  // this.auth.collectFailedRequest(request);
                  // this.auth.returnUrl = this.router.url;
                  // console.log(this.router.url);
                  // this.localStorage.clearAccessToken();
                  this.auth.isAuthenticating = true;
                  // await this.auth.getNewAccessToken();
                  // this.auth.retryFailedRequests();
                  // console.log('Navigating to: ' + this.router.url);
                  // this.router.navigate([this.router.url]);

                  if (this.refreshTokenInProgress) {
                    return this.refreshTokenSubject.pipe(
                      filter(result => result != null),
                      take(1),
                      switchMap( () => next.handle(this.addAuthenticationToken(request)))
                    );
                  } else {
                    this.refreshTokenInProgress = true;

                    this.refreshTokenSubject.next(null);

                    return this.auth.refreshAccessToken().pipe(
                      switchMap(  res => {
                        console.log('Got the new access token using refresh token');
                        console.log(res);
                        this.localStorage.persistAuthorization(
                          res.payload.data.accessToken, res.payload.data.refreshToken, res.payload.data.id);
                        this.refreshTokenSubject.next(true);
                        return next.handle(this.addAuthenticationToken(request));
                      }),
                      finalize( () => {
                        this.refreshTokenInProgress = false;
                        this.auth.isAuthenticating = false;
                      })
                    ).subscribe();
                  }

                }
              }


            }

            return throwError(error);
          })

      );

  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    console.log('Token: Intercepted');

    const token = this.localStorage.getAccessToken();
    if (token !== null) {
      console.log('Token: Token isnt null');
      console.log('Token: Token: ' + token );
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    console.log('Token: Sending request');

    return request;
  }

}
