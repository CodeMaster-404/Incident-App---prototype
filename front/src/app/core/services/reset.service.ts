import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { ApiResponse } from './../models/api.response.model';
//import { resetConfirm } from './../models/requests.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { resetConfirm } from '../models/user.model';
//import { resetConfirm, ResetpassRequest } from 'src/app/modules/auth/models/Requests.model';


@Injectable({
  providedIn: 'root'
})
export class ResetService {
  resetConfirm(request: any) {
    throw new Error('Method not implemented.');
  }



  private appUrl: string;
  private apiUrl: string;
  handleError: void;
 
  constructor(
    private http: HttpClient
  ) {
 
    this.appUrl = environment.appUrl;
    this.apiUrl = 'api/Auth/';

  }



  public confirm(request: resetConfirm): Observable<resetConfirm> {
    return this.http.post<resetConfirm>(
      this.appUrl + this.apiUrl  + 'password-reset', JSON.stringify(request), {  headers: new HttpHeaders({
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



  // public confirm(request: resetConfirm): Observable<resetConfirm> {
  //   return this.http.post<resetConfirm>(
  //     this.appUrl + this.apiUrl  + request.userId + '/' + request.code, null, {  headers: new HttpHeaders({
  //       'Content-Type': 'application/json; charset=utf-8'
  //     })})
  //     .pipe(
  //       tap( res => {
  //         console.log(res);
  //       }, error => {
  //         console.log(error);
  //       })
  //     );
  // }


  // public PasswordMat(restpassrequest:ResetpassRequest): Observable<ResetpassRequest> {
  //   return this.http.post<ResetpassRequest>(
  //       this.appUrl + this.apiUrl + 'password-reset', JSON.stringify(restpassrequest), {  headers: new HttpHeaders({
  //         'Content-Type': 'application/json; charset=utf-8'
  //       })})
  //     .pipe(
  //       tap(
  //         data => {
  //           console.log(data);
  //         },
  //         error => this.handleError
  //       )
  //     )
  // }
}
