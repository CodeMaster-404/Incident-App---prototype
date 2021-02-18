import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../modules/auth/services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthCanLoadGuard implements CanLoad {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
      console.log('AuthCanLoadGuard');
      return this.authService.isAuthenticated().pipe(
        take(1),
        map( authState => {
          if (authState) {
            return true;
          } else {
            this.router.navigate(['auth/login']);
            return false;
          }
        })
      );
    }
}
