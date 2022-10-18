import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private selectedMenu = new BehaviorSubject<string>('');
  constructor() { }

  setMenu(option: string) {
    return this.selectedMenu.next(option);
  }

  get getMenu() {
    return this.selectedMenu.asObservable();
  }
}
