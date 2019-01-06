import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public getItem(key: string): string {
    return window.sessionStorage.getItem(key);
  }

  public setItem(key: string, value: string): void {
     window.sessionStorage.setItem(key, value);
  }

}
