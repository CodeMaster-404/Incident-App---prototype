import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  public getAccessToken(): string | null {
    if (this.isLocalStorageSupported) {
      const token = this.localStorage.getItem('aT');
      if (!token) {
        return null;
      } else {
        return JSON.parse(token);
      }
    }
    return null;
  }

  public getRefreshToken(): string | null {
    if (this.isLocalStorageSupported) {
      const token = this.localStorage.getItem('rT');
      if (!token) {
        return null;
      } else {
        return JSON.parse(token);
      }
    }
    return null;
  }

  public getId(): string | null {
    if (this.isLocalStorageSupported) {
      const token = this.localStorage.getItem('id');
      if (!token) {
        return null;
      } else {
        return JSON.parse(token);
      }
    }
    return null;
  }

  public persistAuthorization(accessToken: string, refreshToken: string, id: string): void {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem('aT', JSON.stringify(accessToken));
      this.localStorage.setItem('rT', JSON.stringify(refreshToken));
      this.localStorage.setItem('id', JSON.stringify(id));
    }
  }

  public clearAccessToken(): void {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem('aT');
    }
  }

  public clearStorage(): void {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem('aT');
      this.localStorage.removeItem('rT');
      this.localStorage.removeItem('id');
    }
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
