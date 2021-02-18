import { Observable } from 'rxjs';
import { ApiResponse } from './../models/api.response.model';
import { ConfirmEmailRequest } from './../models/requests.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailService {

  private appUrl: string;
  private apiUrl: string;

  constructor(
    private http: HttpClient
  ) {

    this.appUrl = environment.appUrl;
    this.apiUrl = 'api/Auth/confirm-email/';

  }

  public confirm(request: ConfirmEmailRequest): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      this.appUrl + this.apiUrl + request.id + '/' + request.code, null, {  headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })})
      .pipe(
        tap( res => {
          console.log(res);
        }, error => {
          console.log(error);
        })
      );
  }
}
