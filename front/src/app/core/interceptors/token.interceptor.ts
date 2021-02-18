import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './../services/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private localStorage: LocalStorageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Token: Intercepted");
    
    const token = this.localStorage.getAccessToken();
    if (token !== null) {
      console.log("Token: Token isnt null");
      console.log("Token: Token: " + token );
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.localStorage.getAccessToken()}`
        }
      });
    }

    console.log("Token: Sending request");
    return next.handle(request);
  }

}
