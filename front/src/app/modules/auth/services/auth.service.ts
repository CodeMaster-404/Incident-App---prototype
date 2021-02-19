import { ApiResponse } from './../../../core/models/api.response.model';
import { RegisterResponse } from './../models/Responses.model';
import { RefreshAccessTokenRequest } from './../models/Requests.model';
import { User } from './../../../core/models/user.model';
import { LocalStorageService } from './../../../core/services/local-storage.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { AuthenticateResponse } from '../models/Responses.model';
import { AuthenticateRequest, RegisterRequest } from '../models/Requests.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private appUrl: string;
  private apiUrl: string;
  private _user = new BehaviorSubject < User | null>(null);
  private user = this._user.asObservable();
  private _isAuthenticating = false;
  private cachedRequests: Array<HttpRequest<any>> = [];
  private _returnUrl = '';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.appUrl = environment.appUrl;
    this.apiUrl = 'api/Auth/';
  }

  public get User(): Observable<User | null> {
    return this.user;
  }

  get isAuthenticating(): boolean {
    return this._isAuthenticating;
  }

  set isAuthenticating(bool: boolean) {
    this._isAuthenticating = bool;
  }

  public isAuthenticated(): Observable<boolean> {
    console.log('isAuthenticated called');

    if (this.localStorageService.getAccessToken() !== null) {
      console.log('Access Token available');
      if (this._user.getValue() === null) {
        console.log('User profile null');
        this._isAuthenticating = true;
        return this.http.get<ApiResponse<User>>(
            this.appUrl + this.apiUrl + this.localStorageService.getId())
          .pipe(
            map( response => {
              this._user.next(response.payload.data);
              return true;
            }),
            catchError( error => {
              return of(false);
            })
          );
      } else {
        console.log('User profile isn\'t null');
        return of(true);
      }

    }
    console.log('Access Token not available');

    return of(false);
  }

  public authenticate(authenticateRequest: AuthenticateRequest): Observable<ApiResponse<AuthenticateResponse>> {
    return this.http.post<ApiResponse<AuthenticateResponse>>(
        this.appUrl + this.apiUrl + 'authenticate', JSON.stringify(authenticateRequest),  {  headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8'
        })})
        .pipe(
          tap(
            res => {
              console.log(res);
              this.localStorageService
                .persistAuthorization(res.payload.data.accessToken, res.payload.data.refreshToken, res.payload.data.id);
            },
            error => this.handleError
          )
        );

  }

  public register(registerRequest: RegisterRequest): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
        this.appUrl + this.apiUrl + 'register', JSON.stringify(registerRequest), {  headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8'
        })})
      .pipe(
        tap(
          data => {
            console.log(data);
          },
          error => this.handleError
        )
      );
  }

  public refreshAccessToken(): Observable<ApiResponse<AuthenticateResponse>> {
    const refreshAccessTokenRequest: RefreshAccessTokenRequest =
    { id: this.localStorageService.getId() , refreshToken: this.localStorageService.getRefreshToken() };
    console.log('Trying to get new access token');
    return this.http.post<ApiResponse<AuthenticateResponse>>(
      this.appUrl + this.apiUrl + 'refresh', JSON.stringify(refreshAccessTokenRequest),   {  headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })});
  }

  public async getNewAccessToken() {
    const refreshAccessTokenRequest: RefreshAccessTokenRequest =
    { id: this.localStorageService.getId() , refreshToken: this.localStorageService.getRefreshToken() };
    console.log('Trying to get new access token');

    await this.http.post<ApiResponse<AuthenticateResponse>>(
        this.appUrl + this.apiUrl + 'refresh', JSON.stringify(refreshAccessTokenRequest),   {  headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8'
        })})
        .toPromise()
        .then(res => {
          console.log('Got the new access token using refresh token');
          console.log(res);
          this.localStorageService.persistAuthorization(res.payload.data.accessToken, res.payload.data.refreshToken, res.payload.data.id);
          this._isAuthenticating = false;

          this.retryFailedRequests();


          if (!this._isAuthenticating) {
            this.router.navigate([this._returnUrl]);
          }
        })
        .catch(this.handleError);




  }


  public logout(): void {
    this.router.navigate(['/auth/login']);
    this._user.next(null);
    this.localStorageService.clearStorage();
  }

  get returnUrl(): string {
    return this._returnUrl;
  }

  set returnUrl(name: string) {
    this._returnUrl = name;
  }

  public collectFailedRequest(failedRequest: HttpRequest<any>): void {
    console.log('Collecting failed requests');

    this.cachedRequests.push(failedRequest);
  }

  public retryFailedRequests(): void {
    console.log('Retrying failed requests');
    console.log('This is the length: ' + this.cachedRequests.length);
    this.cachedRequests.forEach(req => {
      console.log(req);

      this.http.request(req).subscribe(
        next => {
          console.log('This is the response for the failed request');
          console.log(next);
        }, error => {
          console.log('This is the error for the failed request');
          console.log(error);
        }
      );

      // this.http.request(req).pipe(
      //   tap(
      //     res => {
      //       console.log('This is the response for the failed request');
      //       console.log(res);
      //     },
      //     error => {
      //       console.log('This is the error for the failed request');
      //       console.log(error);
      //     }
      //   )
      // );
    });
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    }
    // else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong.
    //   console.error(
    //     `Backend returned code ${error.status}, ` +
    //     `body was: ${error.error}`);
    // }

    // Return an observable with a user-facing error message.
    return of(error);
  }

}
