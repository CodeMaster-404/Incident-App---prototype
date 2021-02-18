import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Incident, Incidents } from 'src/app/core/models/incident.model';
import { environment } from 'src/environments/environment';
import { UserPassword, Users } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentsServicesService {

  private appUrl: string;
  private apiUrl: string;
  private myUpdateApiUrl: string;
  private myUserApiUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  private _incidents = new BehaviorSubject<Incident[] | null>(null);
  incidents = this._incidents.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.appUrl = environment.appUrl;
    this.apiUrl = 'api/Incidents/';
    this.myUpdateApiUrl = 'api/UpdateProfile';
    this.myUserApiUrl = 'api/Users';
   }

   //get all  incidents
   getIncidents(id: any): Observable<Incidents[]>
    {
      return this.http.get<Incidents[]>(this.appUrl+this.apiUrl+ 'user/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
    }
  public getIncidentss(): Observable<Incidents[]>{
    return this.http.get<Incidents[]>(this.appUrl + this.apiUrl + 'user/102', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  

   //get incident by id 
   getIncident(id: number): Observable<Incidents> {
    const url = `${this.apiUrl}/${id}`;
      return this.http.get<Incidents>(this.appUrl + this.apiUrl + id)
      .pipe(
        tap(_ => console.log(`fetched Incident id=${id}`)),
        //catchError(this.errorHandler<Incident>(`getIncident id=${id}`))
        //retry(1),
        catchError(this.errorHandler)
      );
  }
   //Save/Log an Incident
   saveIncident (incident: Incidents): Observable<Incidents> {
    return this.http.post<Incidents>(this.appUrl +this.apiUrl, JSON.stringify(incident), this.httpOptions).pipe(
      tap((incidents: Incidents) => console.log(`added Incident w/ id=${incidents.id}`))
    );
  }
  // update password
  updatePassword(id: any, user: UserPassword): Observable<UserPassword>{
    return this.http.post<UserPassword>(this.myUpdateApiUrl + '/update-password' + '/' + id, JSON.stringify(user), this.httpOptions).pipe(
      // tslint:disable-next-line: variable-name
      tap(data => console.log(`Password Updated for User w/ id=${id}`),
        error => {
          console.log(error);
        })
    );
  }
  //update user
  updateUser(id: any, incident: Users): Observable<Users> {
    // const url = `${this.myApiUrl}/${id}`;
    return this.http.put<Users>(this.appUrl +this.myUserApiUrl + '/' + id, JSON.stringify(incident), this.httpOptions)
    .pipe(
      tap(next => {
        console.log('User that got updated: ' + id);
      }),
      retry(1),
      catchError(this.errorHandler)
    );
  }

  //get users
  getUsers(id: any): Observable<Users> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Users>(this.appUrl + 'api/UpdateProfile/update-profile/' + id)
      .pipe(
        tap(_ => console.log(`fetched User id=${id}`)),
 
        catchError(this.errorHandler)
      );
  }
 

  //to update an incident
  updateIncident(id: number, incident: Incidents): Observable<Incidents> {
    //const url = `${this.myApiUrl}/${id}`;
    return this.http.put<Incidents>(this.appUrl + this.apiUrl + id, JSON.stringify(incident), this.httpOptions)
    .pipe(
      tap(next => {
        console.log('Incident that got updated: ' + id);
      }),
      retry(1),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
