import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token = new BehaviorSubject<string>('');
  constructor() { }

  setToken(option: string) {
    return this.token.next(option);
  }

  get getToken() {
    return this.token.asObservable();
  }
}
