import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  private _main = new BehaviorSubject<boolean>(true);
  private main = this._main.asObservable();
  constructor() { }

  public get Main(): Observable<boolean> {
    return this.main;
  }

  public loading(): void {
    this._main.next(true);
  }

  public stopLoading(): void {
    this._main.next(false);
  }
}
