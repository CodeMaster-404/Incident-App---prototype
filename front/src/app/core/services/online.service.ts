import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {

  private onlineChanges$ = fromEvent(window, 'online').pipe(mapTo(true));

  constructor() { }

  get isOnline(): boolean {
    return navigator.onLine;
  }

  get onlineChanges(): Observable<boolean> {
    return this.onlineChanges$;
  }

}
