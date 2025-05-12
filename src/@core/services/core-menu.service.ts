import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreMenuService {
  private menus: { [key: string]: any } = {};
  private _currentMenuKey: string = '';
  private currentMenuSubject = new BehaviorSubject<any[]>([]);

  get currentMenu$() {
    return this.currentMenuSubject.asObservable();
  }

  register(key: string, menu: any): void {
    this.menus[key] = menu;
  }

  setCurrentMenu(key: string): void {
    this._currentMenuKey = key;
    this.currentMenuSubject.next(this.getMenu(key));
  }

  getMenu(key: string): any {
    return this.menus[key];
  }

  getCurrentMenu(): any {
    return this.getMenu(this._currentMenuKey);
  }
}
