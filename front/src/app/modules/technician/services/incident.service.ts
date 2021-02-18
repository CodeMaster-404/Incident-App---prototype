import { AuthService } from './../../auth/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Incident } from 'src/app/core/models/incident.model';
import { retryWithBackoff } from 'src/app/core/retry-with-backoff.operator';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/core/models/api.response.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private appUrl: string;
  private apiUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  private _incidents = new BehaviorSubject<Incident[] | null>(null);
  incidents = this._incidents.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.appUrl = environment.appUrl;
    this.apiUrl = 'api/technician/';
   }

  public getIncidents(): Observable<ApiResponse<Incident[]>>{
    let userId = '';
    this.authService.User.pipe(take(1), map(data => {
      if (data) {
        userId = data?.id;
      }
    })).subscribe();

    return this.http.get<ApiResponse<Incident[]>>(
      this.appUrl + this.apiUrl + 'incidents/' + userId, this.httpOptions)
      .pipe(
        retryWithBackoff(1000),
        tap( data => {
          console.log('This is the response now');
        }, error => {
          console.log('This is the error, can it be repeated');
        }),
      );
  }

  public acceptRejectIncident(incident: Incident, acceptReject: boolean, reason: string): Observable<any> {
    return this.http.put<ApiResponse<string>>(
      this.appUrl + this.apiUrl + 'acceptreject/' + incident.incident_ID + '/' + acceptReject + '/' + reason,
      JSON.stringify(incident), this.httpOptions)
      .pipe(
        retryWithBackoff(1000),
        tap( data => {
          console.log('This is the response now');
        }, error => {
          console.log('This is the error, can it be repeated');
        }),
      );
  }

  public closeIncident(incident: Incident): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(
      this.appUrl + this.apiUrl + 'close/' + incident.incident_ID,
      JSON.stringify(incident), this.httpOptions)
      .pipe(
        retryWithBackoff(1000),
        tap( data => {
          console.log('This is the response now');
        }, error => {
          console.log('This is the error, can it be repeated');
        }),
      );
  }

  // tslint:disable-next-line: typedef
  errorHandler(error: { error: any; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }






}
